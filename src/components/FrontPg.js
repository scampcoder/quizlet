import React from 'react'
import { Link } from 'react-router-dom'

export default function FrontPg() {
    return (
        <div>
            <h1>Quizlet</h1>
            <p>Ready to test your noggin?</p>
            <button><Link to="/quiz">Start Quiz</Link></button>
        </div>
    )
}