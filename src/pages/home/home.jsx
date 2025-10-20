import React from 'react';
import styles from './home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <h1>Página Inicial</h1>
      <p>Bem-vindo à nossa página principal!</p>
    </div>
  );
}

export default Home;