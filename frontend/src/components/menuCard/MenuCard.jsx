import styles from './MenuCard.module.css';
import { Link } from 'react-router-dom';

function MenuCard({ title, description, link , icon}) {
  return (
    <Link to={link} className={styles.card}>
      <img src={icon} alt={`${title} icon`} className={styles.icon} />
      <h2>{title}</h2>
      <span>{description}</span>
    </Link>
  );
}

export default MenuCard;