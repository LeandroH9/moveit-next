import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/levelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description : string;
    amount: number;
}

interface ChallengesContextData{
    userName: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    handleChangeName: (value: string) => void;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode; //aceita qualquer coisa
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    name: string;
}



export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({ children, ...rest} : ChallengesProviderProps){
    const [userName, setUserName] = useState(rest.name);
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] =  useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] =  useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if (!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function handleChangeName(name: string){
        setUserName(name)
    }

    return(
        <ChallengesContext.Provider value={{ 
            userName,
            level, 
            currentExperience, 
            challengesCompleted, 
            activeChallenge,
            experienceToNextLevel,
            levelUp,
            startNewChallenge,
            resetChallenge,
            handleChangeName,
            completeChallenge,
            closeLevelUpModal,
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
            
        </ChallengesContext.Provider>
    );
}