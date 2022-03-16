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
    
    const answerElements = answerOptions.map(answer => {
        return (
                <button className='quiz-btn' key={answer.id}>{answer.value}</button>
        )
    })

    return (
        <div>
            <h4 className="quiz-question">{q.question}</h4>
            {answerElements}
        </div>
    )
}