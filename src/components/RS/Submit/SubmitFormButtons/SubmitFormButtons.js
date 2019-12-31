import React from 'react';

import styles from './SubmitFormButtons.module.css';

const submitFormButtons = props => {
  let buttons = (
    <div className={styles.available} onClick={props.goBackHandler}>
    Zurück zur Terminauswahl
    </div>
  );
  if (window.matchMedia("(max-width: 800px)").matches) {
    buttons = null;
  };

  return (
  <div className={styles.SubmitButtons}>
    {buttons}
    <div
      className={props.available?styles.available:styles.unavailable}
      onClick={props.submitHandler}>
      Abschicken
    </div>
  </div>
  )
};

export default submitFormButtons;
