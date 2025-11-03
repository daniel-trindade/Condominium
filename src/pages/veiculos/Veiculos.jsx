import { useState, useEffect } from 'react';

import styles from './Veiculos.module.css';
import Container from '../../components/container/Container';
import ActionButton from '../../components/action_button/ActionButton';
import add_icon from '../../assets/adicionar.png';
import consult from '../../assets/procurar.png';
import v_check from '../../assets/v_check.png';


const inicialState = {
  placa: '',
  cor: '',
  marca: '',
  modelo: '',
  ano: '',
  bloco: '',
  apartamento: '',
};

function Veiculos() {

  const [modo, setModo] = useState('');
  const [veiculo, setVeiculo] = useState(inicialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo({
      ...veiculo,
      [name]: value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(veiculo);
    setVeiculo(inicialState);
    setModo('cadastrado_sucesso');
  };

  return (
    <Container>
      <div className={styles.veiculosContainer}>
        <div className={styles.buttonsArea}>
          <ActionButton 
            icon={add_icon}
            onClick={() => {setModo('adicionar')}}
            label="Adicionar Veículo" 
          />
          <ActionButton 
            icon={consult} 
            onClick={() => {setModo('consultar')}} 
            label="Consultar Veículo" 
          />
        </div>

        <div className={styles.contentContainer}>
          {modo === 'adicionar' && (
            <div className={styles.addVeiculo}>

              <form className={styles.form} onSubmit={handleSubmit}>
                
                <div className={styles.formField}>
                  <label for="placa" >Placa:</label>
                  <input 
                    onChange={handleChange} 
                    type="text"
                    name="placa"
                    id='placa'
                    value={veiculo.placa}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="marca">Marca:</label>
                  <input
                    onChange={handleChange} 
                    type="text"
                    name="marca"
                    id='marca'
                    value={veiculo.marca}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="modelo">Modelo:</label>
                  <input
                    onChange={handleChange} 
                    type="text"
                    name="modelo"
                    id='modelo'
                    value={veiculo.modelo}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="cor">Cor:</label>
                  <input
                    onChange={handleChange} 
                    type="text"
                    name="cor"
                    id='cor'
                    value={veiculo.cor}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="ano">Ano:</label>
                  <input
                    onChange={handleChange} 
                    type="text"
                    name="ano"
                    id='ano'
                    value={veiculo.ano}
                    required
                  />
                </div>
                
                <div className={styles.fieldBlock}>

                  <div className={styles.formField}>
                    <label for="bloco">Bloco:</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="bloco"
                      id='bloco'
                      value={veiculo.bloco}
                      required
                    />
                  </div>

                  <div className={styles.formField}>
                    <label for="apartamento">Apartamento:</label>
                    <input
                      onChange={handleChange}
                      type="text"
                      name="apartamento"
                      id='apartamento'
                      value={veiculo.apartamento}
                      required
                    />
                  </div>

                </div>

                <button type="submit" className={styles.submitButton}>Cadastrar</button>

              </form>
            </div>
          )}

          {modo === 'consultar' && (
            <h1>Consulta</h1>
          )}

          {modo === 'cadastrado_sucesso' && (
            <div className={styles.successMessage}>
              <h2>Cadastro Realizado com Sucesso</h2>
              <p>O condômino foi cadastrado com sucesso.</p>
              <img src={v_check} alt="Ícone de sucesso" />
            </div>
          )}
        </div>
        
      </div>
    </Container>
  );
}

export default Veiculos;