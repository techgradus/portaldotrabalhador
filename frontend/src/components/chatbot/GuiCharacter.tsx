import { useState } from 'react';
import styles from './GuiCharacter.module.css';
import CharacterGui from './CharacterGui';

interface GuiCharacterProps {
  onChatOpen?: () => void;
}

export default function GuiCharacter({ onChatOpen }: GuiCharacterProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onChatOpen?.();
  };

  return (
    <div 
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`${styles.guiButton} ${isHovered ? styles.hovered : ''}`}
        onClick={handleClick}
        aria-label="Falar com o Gui"
        title="Clique para conversar com o Gui"
      >
        <div className={styles.characterWrapper}>
          <CharacterGui />
        </div>
      </button>
    </div>
  );
}
