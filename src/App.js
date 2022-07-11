import React, { useState } from "react";
import Header from "./components/Header";
import './style.css';


let timer = null
let min = 24
let sec = 60


export default function App() {

    const [timerNumber, setTimerNumber] = useState(25);
    const [timerConfig, setTimerConfig] = useState(25);
    const [breakTime, setBreakTime] = useState(0);
    const [status, setStatus] = useState(true)

    function startPomodoro() {
        sec = 60
        timer = setInterval(() => {
            sec--;

            if (sec === 0) {
                sec = 59;
                min--;
            }

            if (min === -1) {
                min = 0;
                sec = 0;

                alert('\n' + 'PAUSA PARA DESCANSO ! 😴' + '\n' + 'Clique no Break  Time para início, tempo selecionado: ' + breakTime + ' min');
                clearInterval(timer)
                timer = null
            }

            let format = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
            setTimerNumber(format);

        }, 100)
    }


    function saveTime() {
        setTimerNumber(timerConfig);
        setStatus(true);
        min = timerConfig - 1
    }


    function startBreakTime() {
        sec = 60;
        min = breakTime - 1
        timer = setInterval(() => {
            sec--;

            if (sec === 0) {
                sec = 59;
                min--;
            }

            if (min === -1) {
                min = 0;
                sec = 0;

                alert('\n' + 'FIM DO DESCANSO ! 🤓' + '\n' + 'Selecione o Pomodoro Timer para reinicio');
                clearInterval(timer)
                timer = null
            }

            let format = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
            setTimerNumber(format);

        }, 100)
    }


    function pause() {
        if (timer != null) {
            clearInterval(timer);
            timer = null;
        }
    }

    function handleBreak(e) {
        let valueBreak = e.target.value;
        setBreakTime(valueBreak);
    }


    function handlePomodoro(e) {
        let valuePomodoro = e.target.value
        setTimerConfig(valuePomodoro);
    }

    function setConfig() {
        setStatus(false)
    }


    return (

        <div className="container">
            <Header />

            {
                status ? <button className="buttonConfig" onClick={setConfig}>Settings ⚙️</button> :

                    <div className="configArea">
                        <h2 className="titleBreak">➢ Configure o seu tempo:</h2>

                        <a className="textInput">Pomodoro Timer</a>
                        <input className="input" type='number' name='number' value={timerConfig} onChange={handlePomodoro} />

                        <a className="textInput">Break timer</a>
                        <input className="input" type='number' name='number' value={breakTime} onChange={handleBreak} />

                        <button className="buttonOk" onClick={saveTime}>Ok</button>

                    </div>
            }


            <img src={require('./assets/crono.png')} className="img" />
            <a className="timer"> {timerNumber}</a>

            <div className="buttonArea">
                <button className="button" onClick={pause}>PAUSE</button>
                <button className="buttonStart" onClick={startPomodoro}>START</button>
                <button className="button" onClick={startBreakTime}>BREAK TIME</button>
            </div>

        </div>
    )
}



