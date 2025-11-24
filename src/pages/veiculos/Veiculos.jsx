import { useState, useEffect } from 'react';

import styles from './Veiculos.module.css';
import Container from '../../components/container/Container';
import ActionButton from '../../components/action_button/ActionButton';
import consultar_veiculo from '../../assets/consultar_carro.png';

import add from '../../assets/adicionar.png';
import veiculos_icon from './../../assets/veiculos_icon.jpg';
import v_check from '../../assets/v_check.png';
  
const inicialState = {
  marca: '',
  modelo: '',
  ano: '',
  placa: '',
  cor: '',
  bloco: '',
  apartamento: '',
  foto: null
};

function Veiculos() {

  const  [modo , setModo] = useState('');
  const [modoConsulta, setModoConsulta] = useState('');
  const [veiculo, setVeiculo] = useState(inicialState);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVeiculo({
      ...veiculo,
      [name]: value
    }); 
  };

  const handleChange_MC = (e) => {
    setModoConsulta(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setVeiculo(prevState => ({
          ...prevState,
          foto: file 
        }));

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);

      } else {

        setVeiculo(prevState => ({
          ...prevState,
          foto: null
        }));
        setSelectedImage(null);

      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(veiculo);
    setVeiculo(inicialState);
    setSelectedImage(null);
    console.log("Condomínio cadastrado com sucesso!");
    console.log(veiculo);
    setModo('cadastrado_sucesso');
  };

  const consultarVeiculo = (e) => {
    e.preventDefault();
    const placa = e.target.placa_consult.value;
    console.log("Consultando veículo com placa:", placa);
    
    // Lógica para consultar veículo
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);


  return (
    <Container>
      <div className={styles.veiculosContainer}>
        <div className={styles.buttonsArea}>
          <ActionButton 
            icon={add}
            onClick={() => {setModo('adicionar')}}
            label="Adicionar Veículo" 
          />
          <ActionButton 
            icon={consultar_veiculo} 
            onClick={() => {setModo('consultar')}} 
            label="Consultar Veículo" 
          />
        </div>

        <div className={styles.contentContainer}>
          {modo === 'adicionar' && (
            <div className={styles.addVeiculo}>
              <div className={styles.img}>

                <h2>Novo Cadastro</h2>
                <img 
                  src={selectedImage ? selectedImage : veiculos_icon}
                  alt="Ícone do veiculo" 
                />
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="foto" 
                />

              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                
                <div className={styles.formField}>
                  <label for="modelo" >Modelo:</label>
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
                  <label for="placa">Placa:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="placa"
                    id='placa'
                    value={veiculo.placa}
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
            <div className={styles.consultarVeiculo}>

              <h2>Consultar Condomínios</h2>

              <form className={styles.modo_consulta}>
                <label htmlFor="modo_consulta">Selecione modo de consulta:</label>
                <select id="modo_consulta" name="modo_consulta" onChange={handleChange_MC} >
                  <option value="sem_seleção">Selecione uma Opção</option>
                  <option value="placa">Por Placa</option>
                  <option value="apartamento">Por Apartamento</option>
                </select>
              </form>
              
              {modoConsulta === 'placa' && (
                <div className={styles.successMessage}>
                  <form className={styles.formConsult} onSubmit={consultarVeiculo}>
                    <label htmlFor="placa_consult">Digite a placa:</label>
                    <input type="text" id="placa_consult" name="placa_consult" />
                    <button type="submit">Consultar</button>
                  </form>
                </div>
              )}

              {modoConsulta === 'apartamento' && (
                <div className={styles.successMessage}>
                  <form className={styles.formConsult}>
                    <div className={styles.apBloco}>
                      <div>
                        <label htmlFor="bloco">Digite o Bloco:</label>
                        <input type="text" id="bloco" name="bloco" />
                      </div>
                      <div>
                        <label htmlFor="apartamento">Digite o Apartamento:</label>
                        <input type="text" id="apartamento" name="apartamento" />
                      </div>
                    </div>
                    <button type="submit">Consultar</button>
                  </form>
                </div>
              )}
            </div>
          )}

          {modo === 'cadastrado_sucesso' && (
            <div className={styles.successMessage}>
              <h2>Cadastro Realizado com Sucesso</h2>
              <p>O Veículo foi cadastrado com sucesso.</p>
              <img src={v_check} alt="Ícone de sucesso" />
            </div>
          )}
        </div>
        
      </div>
    </Container>
  );
}

export default Veiculos;