import React from 'react'
import {nanoid} from 'nanoid'

export default function Question({q}) {
    
    const [answerOptions, setAnswerOptions] = React.useState(getAnswers())
    
    function getAnswers() {
        const randomIndex = Math.floor(Math.random() * 4)
        let answers = [...q.incorrect_answers];
        answers.splice(randomIndex, 0, q.correct_answer);
        return answers;
    }

    React.useEffect(() => {
        setAnswerOptions(oldAs => oldAs.map(a => {return {value: a, id: nanoid()}}));
    }, [])
    console.log(answerOptions)
    
    function isHeld(id) {
        setAnswerOptions(oldAs => oldAs.map(a => {
            return a.id === id ? 
                {...a, isHeld: true} :
                {...a, isHeld: false}
        }))
    }

    

    const answerElements = answerOptions.map(answer => {
        return (
                <button className={answer.isHeld ? 'quiz-btn-clicked' : 'quiz-btn'} key={answer.id} onClick={() => isHeld(answer.id)}>{answer.value}</button>
        )
    })

    function replaceHTMLCodes(question) {
        let retStr = question;
        if(question.includes("&quot;")){
            retStr = question.replaceAll("&quot;", "'")
        } 
        if(question.includes("&amp;")){
            retStr = question.replaceAll("&amp;", "&")
        }
        return retStr
    }

    return (
        <div>
            <h4 className="quiz-question">{replaceHTMLCodes(q.question)}</h4>
            {answerElements}
            <hr />
        </div>
    )
}