import { useState } from 'react';

import styles from './Condominos.module.css';
import Container from '../../components/container/Container';
import ActionButton from '../../components/action_button/ActionButton';
import consult_cond from '../../assets/consultar_condomino2.png';
import add_cond from '../../assets/adicionar_condomino.png';
import user_icon from '../../assets/user.png';



function Condominos() {

  const  [modo , setModo] = useState('');

  return (
    <Container>
      <div className={styles.condominosContainer}>
        <div className={styles.buttonsArea}>
          <ActionButton 
            icon={add_cond}
            onClick={() => {setModo('adicionar')}}
            label="Adicionar Condomínio" 
          />
          <ActionButton 
            icon={consult_cond} 
            onClick={() => {setModo('consultar')}} 
            label="Consultar Condomínio" 
          />
        </div>

        <div className={styles.contentContainer}>
          {modo === 'adicionar' && (
            <div className={styles.addCondomino}>
              <div className={styles.img}>

                <h2>Novo Cadastro</h2>
                <img src={user_icon} alt="" />
                <input type="file" name="foto" />

              </div>

              <form action="" className={styles.form}>
                
                <div className={styles.formField}>
                  <label for="nome" >Nome do Condomínio:</label>
                  <input type="text" name="nome" />
                </div>

                <div className={styles.formField}>
                  <label for="telefone">Telefone:</label>
                  <input type="text" name="telefone" />
                </div>

                <div className={styles.formField}>
                  <label for="cpf">CPF:</label>
                  <input type="text" name="cpf" />
                </div>

                <div className={styles.formField}>
                  <label for="data_nascimento">Data de Nascimento:</label>
                  <input type="text" name="data_nascimento" />
                </div>
                
                <div className={styles.fieldBlock}>

                  <div className={styles.formField}>
                    <label for="bloco" >Bloco:</label>
                    <input type="text" name="bloco" />
                  </div>

                  <div className={styles.formField}>
                    <label for="apartamento">Apartamento:</label>
                    <input type="text" name="apartamento" />
                  </div>

                </div>

              </form>
            </div>
          )}

          {modo === 'consultar' && (
            <div className={styles.formArea}>
              <h2>Consultar Condomínios</h2>
              <p>Lista de condomínios cadastrados.</p>
            </div>
          )}
        </div>
        
      </div>
    </Container>
  );
}

export default Condominos;