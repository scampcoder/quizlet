import React from 'react'
import axios from 'axios'
import Question from '../components/Question'
import {nanoid} from "nanoid"

export default function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    const [score, setScore] = React.useState(undefined);
    const [gameDone, setGameDone] = React.useState(false)

    React.useEffect(() => {
        getQuestions()
    }, [])
    
    async function getQuestions() {
        await axios("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            .then(res => setQuestions(res.data.results))
        setQuestions(oldQs => oldQs.map(q => {return {id: nanoid(), question: q.question, correctAnswer: q.correct_answer, answers: shuffleAnswers(q)}}));
    }
    
    function shuffleAnswers(question) {
        const randomIndex = Math.floor(Math.random() * 4);
        let newAnswers = [...question.incorrect_answers]
        newAnswers.splice(randomIndex, 0, question.correct_answer);
        return newAnswers.map(answer => {return {value: answer, isHeld: false}})
    }
    
    

    const questionElements = questions.map(question => {
        if(question.answers){
            return (
            <Question 
                key={question.id} 
                className="question" 
                id={question.id} 
                header={question.question} 
                answers={question.answers}
                correctAnswer={question.correctAnswer} 
                holdIt={(event) => holdIt(question.id, question.answers, event)}
                gameDone={gameDone}
            />
        )
        }
        
    })
    
    
    function holdIt(id, answers, event) {
        setQuestions(oldQs => oldQs.map(q => {
            return event.target.parentElement.id === q.id 
                ? {...q, answers: q.answers.map(a => changeAnswerHold(a, event))} : q
            })
        )
    }

    function replaceHTMLCodes(string) {
        let retStr = string;
        if(string.includes("&quot;")){
            retStr = string.replaceAll("&quot;", "'")
        } 
        if(string.includes("&amp;")){
            retStr = string.replaceAll("&amp;", "&")
        }
        if(string.includes("&#039;")){
            retStr = string.replaceAll("&#039;", "'")
        }
        if(string.includes("&aring;")){
            retStr = string.replaceAll("&aring;", "å")
        } 
        if(string.includes("&auml;")){
            retStr = string.replaceAll("&auml;", "ä")
        }
        if(string.includes("&ouml;")){
            retStr = string.replaceAll("&ouml;", "ö")
        }
        return retStr
    }
    
    function changeAnswerHold(answer, event) {
        return replaceHTMLCodes(answer.value) === event.target.innerHTML  ? 
                {...answer, isHeld: true} 
                : {...answer, isHeld: false}
    }
    
    function checkAnswers() {
        if(questions.every(q => q.answers.filter(a => a.isHeld).length === 1)){
            setGameDone(true);
            let fauxScore = 0;
            for(let i=0; i<questions.length; i++){
                const selectedAnswer = questions[i].answers.filter(a => a.isHeld)[0].value;
                if(selectedAnswer === questions[i].correctAnswer){
                    fauxScore++
                    console.log(fauxScore)
                }
            }
            setScore(fauxScore)
        } else {
            alert("Please select an answer for each question.")
        }
    }
    
    const checkBtn = <button className='check-btn' onClick={() => checkAnswers()}>Check Answers</button>;
    
    function resetGame() {
        setGameDone(false);
        setScore(undefined);
        getQuestions();
    }
    
    const playAgainBtn = <button className='check-btn' onClick={() => resetGame()}>Play Again</button>
    
    return (
        <div className='quiz'>
            {/*<pre>{JSON.stringify(questions, null, 2)}</pre>*/}
            {questionElements}
            {gameDone && <p className="lg-txt score">You scored {score}/5 correct answers</p>}
            {gameDone ? playAgainBtn : checkBtn}
        </div>
    )
}