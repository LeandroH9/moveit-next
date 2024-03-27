
import { useContext, useState } from 'react';
import styles from '@styles/components/LoginGitHub.module.css'
import Router from 'next/router'
import Cookies from 'js-cookie';

export function LoginGitHub(){
    const [name, setName] = useState('')

    function handleNavigateHome(){
        Cookies.set('name', name);
        Router.push('/home')
    }

    return(
        <div className={styles.loginContainer}>
            <div>
                <img src="/logo-full.svg" alt="logo"/>
            </div>
            <section>
                <strong>Bem-vindo</strong>
                {/* <div className={styles.gitHubInfo}>
                    <img src="/icons/logotipo-do-github.svg"/>
                    Faça login com seu Github para começar
                </div> */}
                <div>
                    <input type="text"  value={name} onChange={(value) => setName(value.target.value)} className={styles.entrarInput} placeholder="Digite seu username" >
                    </input>
                    <button type="button" className={styles.entrarButton} onClick={handleNavigateHome}>
                        <img src="/icons/seta-direita.svg" alt="entrar"/>
                    </button>
                </div>
            </section>
        </div>
    );
}