import styles from './Home.module.css';
import Container from '../../components/container/Container';
import MenuCard from '../../components/menuCard/MenuCard';
import cons_cond from '../../assets/consultar_condomino.png'
import cons_car from '../../assets/consultar_carro.png'
import corres from '../../assets/correspondencia.png'

function Home() {
  return (
    <Container>
        <div className={styles.homeContainer}>
          <div className={styles.header}>
            <h1>Bem vindo Daniel</h1>
            <p>É bom tê-lo conosco hoje</p>
          </div>
          <div className={styles.menu}>
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Veículo"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_car} 
            />
            <MenuCard
              title= "Correspondência"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={corres} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
            <MenuCard
              title= "Consultar Condômino"
              description="Aqui você pode consultar a lista de condôminos cadastrados"
              link="/login"
              icon={cons_cond} 
            />
          </div>
        </div>
    </Container>
  );
}

export default Home;  