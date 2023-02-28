import React, {MouseEvent, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
}

const Modal = (props: ModalProps) => {
  const {
    children, isOpen,
  } = props;
  const [isClosing, setIsClosing] = useState(false);

  const handleClosing = () => {

  }

  const onKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsClosing(false);
    }
  }, [isClosing]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.wrapModal}`}>
      <div className={styles.overlay}>
        <div className={styles.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
