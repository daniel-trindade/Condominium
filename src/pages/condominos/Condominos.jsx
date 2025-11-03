import { useState, useEffect } from 'react';

import styles from './Condominos.module.css';
import Container from '../../components/container/Container';
import ActionButton from '../../components/action_button/ActionButton';
import consult_cond from '../../assets/consultar_condomino2.png';

import add_cond from '../../assets/adicionar_condomino.png';
import user_icon from '../../assets/user.png';
import v_check from '../../assets/v_check.png';
  
const inicialState = {
  nome: '',
  telefone: '',
  cpf: '',
  data_nascimento: '',
  bloco: '',
  apartamento: '',
  foto: null
};

function Condominos() {

  const  [modo , setModo] = useState('');
  const [modoConsulta, setModoConsulta] = useState('');
  const [condomino, setCondomino] = useState(inicialState);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCondomino({
      ...condomino,
      [name]: value
    });
  };

  const handleChange_MC = (e) => {
    setModoConsulta(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setCondomino(prevState => ({
          ...prevState,
          foto: file 
        }));

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);

      } else {

        setCondomino(prevState => ({
          ...prevState,
          foto: null
        }));
        setSelectedImage(null);

      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(condomino);
    setCondomino(inicialState);
    setSelectedImage(null);
    setModo('cadastrado_sucesso');
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
                <img 
                  src={selectedImage ? selectedImage : user_icon}
                  alt="Ícone de usuário" 
                />
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="foto" 
                />

              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                
                <div className={styles.formField}>
                  <label for="nome" >Nome do Condômino:</label>
                  <input 
                    onChange={handleChange} 
                    type="text"
                    name="nome"
                    id='nome'
                    value={condomino.nome}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="telefone">Telefone:</label>
                  <input
                    onChange={handleChange} 
                    type="text"
                    name="telefone"
                    id='telefone'
                    value={condomino.telefone}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="cpf">CPF:</label>
                  <input
                    onChange={handleChange} 
                    type="text"
                    name="cpf"
                    id='cpf'
                    value={condomino.cpf}
                    required
                  />
                </div>

                <div className={styles.formField}>
                  <label for="data_nascimento">Data de Nascimento:</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="data_nascimento"
                    id='data_nascimento'
                    value={condomino.data_nascimento}
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
                      value={condomino.bloco}
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
                      value={condomino.apartamento}
                      required
                    />
                  </div>

                </div>

                <button type="submit" className={styles.submitButton}>Cadastrar</button>

              </form>
            </div>
          )}

          {modo === 'consultar' && (
            <div className={styles.consultarCondomino}>

              <h2>Consultar Condomínios</h2>

              <form className={styles.modo_consulta}>
                <label htmlFor="modo_consulta">Selecione modo de consulta:</label>
                <select id="modo_consulta" name="modo_consulta" onChange={handleChange_MC} >
                  <option value="nome">Por Nome</option>
                  <option value="apartamento">Por Apartamento</option>
                  <option value="cpf">Por CPF</option>
                </select>
              </form>
              
              {modoConsulta === 'cpf' && (
                <div className={styles.successMessage}>
                  <form className={styles.formConsult}>
                    <label htmlFor="cpf">Digite o CPF:</label>
                    <input type="text" id="cpf" name="cpf" />
                    <button type="submit">Consultar</button>
                  </form>
                </div>
              )}

              {modoConsulta === 'nome' && (
                <div className={styles.successMessage}>
                  <form className={styles.formConsult}>
                    <label htmlFor="nome">Digite o Nome:</label>
                    <input type="text" id="nome" name="nome" />
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
              <p>O condômino foi cadastrado com sucesso.</p>
              <img src={v_check} alt="Ícone de sucesso" />
            </div>
          )}
        </div>
        
      </div>
    </Container>
  );
}

export default Condominos;