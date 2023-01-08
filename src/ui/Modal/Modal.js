import { useEffect } from 'react';
import ReactDom from 'react-dom';
import classes from './Modal.module.css';

export const Modal = ({ children, onCancel }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return ReactDom.createPortal(
    <div>
      <div className={classes.backdrop} onClick={onCancel}></div>
      <div className={classes.modal}>{children}</div>
    </div>,
    document.getElementById('overlay')
  );
};