import Head from 'next/head'
import {GetServerSideProps} from 'next';

import { CompletedChallenges } from "../components/completedChallenges";
import { ChallengesProvider } from '../contexts/challengesContext'

import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experienceBar";
import { Profile } from "../components/profile";
import { ChallengeBox } from "../components/challengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/countdownContext';
import { MenuLateral } from '../components/menuLateral';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  name: string;
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    name={props.name}
    >
      <div className={styles.container}>
        <nav>
          <MenuLateral/>
        </nav>
        <div>
          <Head>
            <title>Início | move.it</title>
          </Head>
          
          <ExperienceBar />
          
          <CountdownProvider>
            <section>
              <div>
                <Profile/>
                <CompletedChallenges/>
                <Countdown/>
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async(ctx) => {
  //tudo que for buscar dados externos

  const { level, currentExperience, challengesCompleted, name } = ctx.req.cookies;

  return { 
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      name
    }
  }
}

