import React from 'react';

import Input from '../../../UI/Input/Input';
import styles from './SubmitButtons.module.css';

const submitButtons = props => {
  const weekOptions = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
    {value: 8, label: '8'},
  ];

  return (
    <div className={styles.SubmitButtons}>
      <div>
        <Input inputtype='select' label='Für wie viele Wochen?' options={weekOptions} onChange={props.weekSelectHandler} />
      </div>
      <p
        className={props.submittable?styles.available:styles.unavailable}
        onClick={props.confirmSlotsHandler}>
          Speichern
      </p>
    </div>
  )
};

export default submitButtons;
