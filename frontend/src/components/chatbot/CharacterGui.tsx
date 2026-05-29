import styles from './CharacterGui.module.css';
import guiImage from '../../img/gui.png';

export default function CharacterGui() {
  return (
    <div className={styles.characterContainer}>
      <img 
        src={guiImage} 
        alt="Gui - Guia Trabalhista" 
        className={styles.characterImage}
      />
    </div>
  );
}
