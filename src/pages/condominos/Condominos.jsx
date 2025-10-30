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
                
                <label>Nome do Condomínio:
                  <input type="text" name="nome" />
                </label>

                <label>CPF:
                  <input type="text" name="cpf" />
                </label>

                <label>Data de Nascimento:
                  <input type="text" name="data_nascimento" />
                </label>
                
                <div>
                  <label>
                    Bloco:
                    <input type="text" name="bloco" />
                  </label>
                  <label>
                    Apartamento:
                    <input type="text" name="apartamento" />
                  </label>
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