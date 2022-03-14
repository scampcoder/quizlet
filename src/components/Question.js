import React from 'react'

export default function Question({q}) {
    
    const [answerOptions, setAnswerOptions] = React.useState(getAnswers())
    
    function getAnswers() {
        const randomIndex = Math.floor(Math.random() * 4)
        let answers = [...q.incorrect_answers];
        answers.splice(randomIndex, 0, q.correct_answer);
        return answers;
    }
    
    const answerElements = answerOptions.map(answer => {
        return (
                <button>{answer}</button>
        )
    })

    return (
        <div>
            <h4>{q.question}</h4>
            {answerElements}
        </div>
    )
}