import React, { useState } from "react";
import Header from "./components/Header";
import './style.css';


let timer = null
let min = 24
let sec = 60

export default function App() {

    const [timerNumber, setTimerNumber] = useState(25)

    function start() {
        timer = setInterval(() => {
            sec--;

            if (sec == 0) {
                sec = 59;
                min--;
            }

            let format = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
            setTimerNumber(format);

        }, 1000)
    }

    function pause () {
        if(timer != null){
            clearInterval(timer);
            timer = null;
        }
    }

    return (

        <div className="container">
            <Header />

            <img src={require('./assets/crono.png')} className="img" />
            <a className="timer"> {timerNumber}</a>

            <div className="buttonArea">
                <a className="button" onClick={start}>INICIAR</a>
                <a className="button" onClick={pause}>PAUSAR</a>
            </div>

        </div>

    )
}
