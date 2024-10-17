import React, { useEffect, useState } from "react";
import './messages.css'


function Messages(){
    
    const msgArray = [
        'Ready to work? Click the button below!',
        'Like what you see? Why not hire me!',
        'Feel free to add or suggest features',
        'The lines of code belie the time it takes to write them'
    ]

    const [count, setCount] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => { 
            setFade(false);

            setTimeout(() => {
                setCount((prevCount) => prevCount < msgArray.length - 1 ? prevCount + 1 : 0);

                setTimeout(() => {
                    setFade(true);
                }, 10);

            }, 500);
           
            
        }, 5000) 
        return () => clearInterval(interval)
    },[count, msgArray])

    return(
        <>
        <div id="msg-body">
            <div id="msg-banner"><p>A message from the developer</p></div>
            <div id="msg-content"><p id="msg-text" className={fade ? 'fade-in' : 'fade-out'}>{msgArray[count]}</p></div>
        </div>
        </>
    )
}

export default Messages