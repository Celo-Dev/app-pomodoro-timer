import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import './style.css';

export default function App() {
    const [timerConfig, setTimerConfig] = useState(25);
    const [breakTime, setBreakTime] = useState(0);

    const [status, setStatus] = useState(true);
    const [breakStatus, setBreakStatus] = useState(true);
    const [isBreak, setIsBreak] = useState(false)

    const [seconds, setSeconds] = useState(timerConfig * 60);
    const layoutMinutes = Math.floor(seconds / 60);
    const layoutSeconds = seconds % 60;

    useEffect(() => {
        if (seconds === 0) {
            const message = !isBreak ?
                `\n PAUSA PARA DESCANSO! 😴 \n Clique no Break  Time para início, tempo selecionado: ${breakTime} min` :
                `\n FIM DO DESCANSO! 🤓 \n Selecione o Pomodoro Timer para reinicio`;

            alert(message);
            setIsBreak(state => !state);
            return;
        }

        if (breakStatus) return;
 
        setTimeout(() => { setSeconds(seg => seg - 1) }, 1000)
    }, [seconds]);


    function startPomodoro() {
        setBreakStatus(false);
        setSeconds(seg => seg - 1);
    }

    function saveTime() {
        setSeconds(timerConfig * 60)
        setStatus(true);
    }

    function startBreakTime() {
        setBreakStatus(false);
        setSeconds(breakTime * 60);
    }

    function pause() {
        setBreakStatus(true);
    }

    function handleBreak(e) {
        const valueBreak = e.target.value;
        setBreakTime(valueBreak);
    }

    function handlePomodoro(e) {
        const valuePomodoro = e.target.value
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
            <a className="timer"> {layoutMinutes.toString().padStart(2, '0')}:{layoutSeconds.toString().padStart(2, '0')}</a>

            <div className="buttonArea">
                <button className="button" onClick={pause}>PAUSE</button>
                <button className="buttonStart" onClick={startPomodoro}>START</button>
                {
                    isBreak && <button className="button" onClick={startBreakTime}>BREAK TIME</button>
                }
            </div>
        </div>
    )
}



