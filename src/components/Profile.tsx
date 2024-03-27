import { useContext } from 'react'
import { ChallengesContext } from '../contexts/challengesContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const {level, userName} = useContext(ChallengesContext);

    return(
        <div className={styles.profileContainer}>
            <div>
                <strong>{userName}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}