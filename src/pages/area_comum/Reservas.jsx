import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Container from '../../components/container/Container';
import styles from './Reservas.module.css';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const reservasIniciais = [
  {
    title: 'Festa de Fim de Semestre',
    apto: '101',
    bloco: 'A',
    area: 'Churrasqueira', 
    start: new Date(2025, 11, 20, 10, 0),
    end: new Date(2025, 11, 20, 14, 0),
  },
  {
    title: 'Natal da Familia Santos',
    apto: '202',
    bloco: 'B',
    area: 'salao de festas',
    start: new Date(2025, 11, 25, 12, 0),
    end: new Date(2025, 11, 25, 18, 0),
  },
];

const CustomEvent = ({ event }) => {
  return (
    <div className={styles.tagReserva} title={`${event.title} - Apto: ${event.apto} Bl: ${event.bloco}`}>
      <strong>{event.title}</strong> <br />
      Area: {event.area}
      <div>
        {event.apto && <span>Ap: {event.apto}</span>}
        {event.bloco && <span> - Bl: {event.bloco}</span>}
      </div>
    </div>
  );
};

function Reservas() {
  const [todosEventos, setTodosEventos] = useState(reservasIniciais);
  
  // 1. ESTADO PARA NAVEGAÇÃO DO CALENDÁRIO
  const [dataAtual, setDataAtual] = useState(new Date(2025, 11, 1)); 

  // 2. ESTADO DO FORMULÁRIO
  const [novaReserva, setNovaReserva] = useState({
    area: 'salao_festas',
    apto: '', 
    bloco: '',
    data_reserva: '',
    horario_inicio: '',
    horario_fim: ''
  });

  // Atualiza o formulário enquanto digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaReserva(prev => ({ ...prev, [name]: value }));
  };

  // Função para navegar no calendário
  const handleNavigate = (date) => {
    setDataAtual(date);
  };


  const handleReservar = (e) => {
    e.preventDefault();

    if (!novaReserva.data_reserva || !novaReserva.horario_inicio || !novaReserva.horario_fim) {
      alert("Preencha todos os campos!");
      return;
    }

    const start = new Date(`${novaReserva.data_reserva}T${novaReserva.horario_inicio}`);
    const end = new Date(`${novaReserva.data_reserva}T${novaReserva.horario_fim}`);

    if (end <= start) {
      alert("O horário final deve ser maior que o inicial.");
      return;
    }

    const temConflito = todosEventos.some(evento => {
      if (evento.area !== novaReserva.area) return false;

      return (start < evento.end && end > evento.start);
    });

    if (temConflito) {
      alert(`Já existe uma reserva para ${novaReserva.area.replace('_', ' ')} neste horário!`);
      return;
    }

    const novoEvento = {
      title: novaReserva.area === 'salao_festas' ? 'Salão de Festas' : 
             novaReserva.area === 'churrasqueira' ? 'Churrasqueira' :
             novaReserva.area === 'quadra_esportes' ? 'Quadra' : 'Piscina',
      area: novaReserva.area,
      apto: novaReserva.apto,
      bloco: novaReserva.bloco,
      start,
      end
    };

    setTodosEventos([...todosEventos, novoEvento]);
    alert("Reserva realizada com sucesso!");
  
    setDataAtual(start);

    setNovaReserva({
      area: 'salao_festas', // Volta para o valor padrão ou mantém o atual se preferir
      apto: '',
      bloco: '',
      data_reserva: '',
      horario_inicio: '',
      horario_fim: ''
    });
  };

  return (
    <Container>
      <div className={styles.reservasWrapper}>
        <h1>Reservas de Áreas Comuns</h1>
        
        <div className={styles.reservaContainer}>
          <form className={styles.formReserva} onSubmit={handleReservar}>
            <label htmlFor="area">Área Comum:</label>
            <select name="area" id="area" value={novaReserva.area} onChange={handleChange}>
              <option value="salao_festas">Salão de Festas</option>
              <option value="churrasqueira">Churrasqueira</option>
              <option value="quadra_esportes">Quadra de Esportes</option>
              <option value="piscina">Piscina</option>
            </select>

            <label htmlFor="apto">Apartamento:</label>
            <input type="text" id="apto" name="apto" value={novaReserva.apto} onChange={handleChange} />
            
            <label htmlFor="bloco">Bloco:</label>
            <input type="text" id="bloco" name="bloco" value={novaReserva.bloco} onChange={handleChange} />
            
            <label htmlFor="data_reserva">Data da Reserva:</label>
            <input type="date" id="data_reserva" name="data_reserva" value={novaReserva.data_reserva} onChange={handleChange} />

            <label htmlFor="horario_inicio">Horário Início:</label>
            <input type="time" id="horario_inicio" name="horario_inicio" value={novaReserva.horario_inicio} onChange={handleChange} />

            <label htmlFor="horario_fim">Horário Fim:</label>
            <input type="time" id="horario_fim" name="horario_fim" value={novaReserva.horario_fim} onChange={handleChange} />

            <button type="submit">Reservar</button>
          </form>

          <div className={styles.calendario}>
            <Calendar
              localizer={localizer}
              events={todosEventos}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              culture='pt-BR'
              messages={{
                next: "Próximo",
                previous: "Anterior",
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia"
              }}
              components={{
                event: CustomEvent
              }}
              selectable={false}

              // --- ESSAS DUAS LINHAS CORRIGEM A NAVEGAÇÃO ---
              date={dataAtual}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Reservas;