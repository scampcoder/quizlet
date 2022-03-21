import React from 'react'
import axios from 'axios'
import Question from '../components/Question'
import {nanoid} from "nanoid"

export default function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    console.log(questions)

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
            <Question className="question" key={question.id} id={question.id} header={question.question} answers={question.answers} holdIt={(event) => holdIt(question.id, question.answers, event)}/>
        )
        }
        
    })
    
    
    function holdIt(id, answers, event) {
        setQuestions(oldQs => oldQs.map(q => {
            return event.target.parentElement.id === q.id 
                ? {...q, answers: q.answers.map(a => changeAnswerHold(a, event))} : q
            })
        )
        console.log(questions)
    }
    
    function changeAnswerHold(answer, event) {
        return answer.value === event.target.innerHTML  ? 
                {...answer, isHeld: true} 
                : {...answer, isHeld: false}
    }
    
    return (
        <div className='quiz'>
            {/*<pre>{JSON.stringify(questions, null, 2)}</pre>*/}
            {questionElements}
            <button className='check-btn'>Check Answers</button>
        </div>
    )
}