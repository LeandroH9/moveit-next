
import { useContext } from 'react';
import { ChallengesContext } from '@contexts/challengesContext';
import styles from '@styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengesContext);

    return(
        <div className={styles.completedChallengesContainer}>
            <span>Desafio completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}