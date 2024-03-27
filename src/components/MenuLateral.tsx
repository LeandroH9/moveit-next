
import styles from '../styles/components/MenuLateral.module.css'

export function MenuLateral(){
    return(
        <div className={styles.containerMenu}>
            <div>
                <img src="/logo.svg" alt="logo"/>
            </div>
            <div className={styles.Menu}>
                <button type="button">
                    <img src="/icons/botao-home.svg" alt="home"/>
                </button>
            </div>
            
        </div>
    )
}