import {useState, useEffect, useContext} from 'react';
import { CountdownContext } from '@contexts/countdownContext';
import styles from '@styles/components/Countdown.module.css'



export function Countdown(){
    const {seconds, minutes, hasFinished, isActive, progressed, startCountdown, resetCountdown} = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    useEffect(() =>{
        let progress = document.getElementById(styles.progress)
        progress.style.width = String(progressed+'%');
    }, [progressed]);

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
        
        { hasFinished ? (
            <button 
            disabled
            className={styles.countdownButton}
            >
                Ciclo encerrado
            </button>
        ) : (
            <>
                {isActive ? (
                    <button type="button" 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}
                    >
                        Abandonar ciclo
                    </button>
                ) : (
                    <button type="button" 
                    className={styles.countdownButton}
                    onClick={startCountdown}
                    >
                    Iniciar um ciclo
                    </button>
                )}
            </>
        )}
        <div className={styles.progressBar}>
            <div id={styles.progress}> </div>
        </div>
        </div>
    );
}