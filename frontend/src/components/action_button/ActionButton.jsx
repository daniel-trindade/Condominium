import styles from './ActionButton.module.css';

function ActionButton({ icon, onClick, label }) {
  return (
    <button className={styles.actionButton} onClick={onClick}>

      <img 
        src={icon} 
        alt="" 
        className={styles.icon} 
      />

      {label}

    </button>
  );
}

export default ActionButton;