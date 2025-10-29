import styles from './Login.module.css';
import logo from '../../assets/logo_preto.png';

function Login() {
  return (
    <div className={styles.login}>

      <div className={styles.logoArea}>
        <img src={logo} alt="Logo" />
        <h1>Condominium</h1>
      </div>

      <div className={styles.formArea}>
        <h1>Acesse seu <br /> Condominium</h1>
        <form>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              id="username" 
              name="username"
              placeholder='Usuário'
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder='Senha'
              required 
            />
          </div>
          <button type="submit" className={styles.loginButton}>Entrar</button>
          <a href="#">Esqueceu sua senha?</a>
        </form>
      </div>

    </div>
  );
}

export default Login;