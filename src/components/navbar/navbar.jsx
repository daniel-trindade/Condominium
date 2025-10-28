import logo from '../../assets/logo_branco.svg'
import user_icon from '../../assets/user-icon.png'
import styles from './navbar.module.css'

function Navbar() {

  return (
    <>
      <nav className={styles.nav}>
        <a href="/">
            <img src={logo} alt="Logo" className={styles.logo}/>
            <h1>Condomínium</h1>
        </a>
        

        <ul className={styles.menu}>
            <li><a href="#">Cadastros</a></li>
            <li><a href="#">Consultas</a></li>
            <li><a href="#">Suporte</a></li>
        </ul>

        <div className={styles.userMenu}>

          <div className={styles.userName}>
            <p>Daniel Trindade</p>
            <a href="#">Sair</a>
          </div>

          <img src={user_icon} alt="User Icon" className={styles.userIcon} />

        </div>

      </nav>
    </>
  )
}

export default Navbar