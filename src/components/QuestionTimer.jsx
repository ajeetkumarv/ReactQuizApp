import { useState, useEffect } from "react";

export default function QuestionTimer( {timeout, onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onTimeout) {
                onTimeout(); // run this code once it timesout
            }
        }, timeout);

        /* cleanup */
        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout]);
    
    /* Means don't render component when remainingTime changes */
    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100); /* Execute this at every 100 milliseconds */

        /* cleanup */
        return () => {
            clearInterval(interval);
        }
    }, []); // no dependencies since we want to execute always

    return <progress id="question-time" max={timeout} value={remainingTime} />
}