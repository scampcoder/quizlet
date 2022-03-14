import React from 'react'
import { Link } from 'react-router-dom'

export default function FrontPg() {
    return (
        <div className='front-pg'>
            <h1 className='title lg-txt'>Quizlet</h1>
            <p className='sm-txt'>Ready to test your noggin?</p>
            <Link to="/quiz"><button className='start-btn'>Start Quiz</button></Link>
            <img src='./blob5.png' alt="blue blob" className='blue-blob'></img>
            <img src='./blobs.png' alt="yellow blob" className='yellow-blob'></img>
        </div>
    )
}