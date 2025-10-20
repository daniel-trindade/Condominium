import React from 'react';
import styles from './cadastrar_carro.module.css';

function CadastrarCarro() {
  return (
    <div className={styles.cadastrarCarro}>
      <h1>Cadastro de Carro</h1>
      <p>Preencha as informações do carro que deseja cadastrar:</p>
    </div>
  );
}

export default CadastrarCarro;