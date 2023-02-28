import React, {MouseEvent, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import styles from "./Modal.module.css";
import { useRouter } from 'next/navigation';

interface ModalProps {
  children: ReactNode;
  isOpen?: boolean;
}

const Modal = (props: ModalProps) => {
  const {
    children, isOpen,
  } = props;
  const router = useRouter();

  const handleClosing = () => {
    router.push('/')
  }

  const onKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClosing()
    }
  }, []);

  useEffect(() => {
      window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={`${styles.wrapModal}`}>
      <div className={styles.overlay} onClick={handleClosing}>
        <div className={styles.content} onClick={onContentClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
