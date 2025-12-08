  
import styles from './Container.module.css'

function Container({ children }) {

  return (
    <div className={styles.container}>
        <div className={styles.content}>
          {children}
        </div>
    </div>
  )
}

export default Container