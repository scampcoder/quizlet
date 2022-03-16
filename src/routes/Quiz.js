import React from 'react'
import axios from 'axios'
import Question from '../components/Question'
import {nanoid} from "nanoid"

export default function Quiz() {
    const [questions, setQuestions] = React.useState([])

    React.useEffect(() => {
        getQuestions()
    }, [])
    
    async function getQuestions() {
        await axios("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            .then(res => setQuestions(res.data.results))
        setQuestions(oldQs => oldQs.map(q => {return {...q, id: nanoid()}}));
    }
    
    
    

    const questionElements = questions.map(question => {
        return (
            <Question key={question.id} q={question}/>
        )
    })
    
    return (
        <div>
            {/*<pre>{JSON.stringify(questions, null, 2)}</pre>*/}
            {questionElements}
        </div>
    )
}