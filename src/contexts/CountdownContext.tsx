import {createContext, ReactNode, useContext, useState, useEffect} from 'react';
import { ChallengesContext } from './challengesContext';

interface CountdownContextData{
    minutes: number, 
    seconds: number,
    hasFinished: boolean,
    isActive: boolean, 
    progressed: number,
    startCountdown: () => void,
    resetCountdown: () => void,
}


interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children} : CountdownProviderProps ){
    const {startNewChallenge} = useContext(ChallengesContext)

    const timeTotal = 0.1 * 60;
    
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const [progressed, setProgressed] = useState(0);

    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setProgressed(0);
        setIsActive(true);    
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setProgressed(0);
        setHasFinished(false);
        setTime(0.1 * 60);
    }

    useEffect(() => { //toda vez que o valor de active ou time  mudar, ele vai executar esta funcao
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setProgressed(100 - ((time * 100) / timeTotal))
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0){
            setProgressed(100)
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge()
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value = {{
            minutes, 
            seconds,
            hasFinished,
            isActive,
            progressed, 
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>

    )
}