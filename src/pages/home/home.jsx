import styles from './home.module.css';
import Container from '../../components/container/container';

function Home() {
  return (
    <Container>
        <div className={styles.home}>
          <h1>Bem vindo Daniel</h1>
          <p>Aqui estão seus atalhos:</p>
        </div>
    </Container>
  );
}

export default Home;