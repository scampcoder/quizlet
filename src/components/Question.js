import React from 'react'

export default function Question(props) {
    const answerElems = props.answers.map(answer => {
        return (
            <button className={answer.isHeld ? 'quiz-btn-clicked' : 'quiz-btn'} key={answer.value} onClick={props.holdIt}>{replaceHTMLCodes(answer.value)}</button>
        )
    })
    
    
    
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
    
    return (
        <div id={props.id}>
            <h4 className="quiz-question">{replaceHTMLCodes(props.header)}</h4>
            {answerElems}
            <hr />
        </div>
    )
}