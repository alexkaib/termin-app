import React from 'react';

import styles from './Input.module.css';

const input = props => {

  let inputElement = null;

  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={styles.InputElement} {...props.elementConfig} />;
      break;

    case 'textarea':
      inputElement = <textarea className={styles.InputElement} {...props.elementConfig} />;
      break;

    case 'select':
      inputElement = (
        <select className={styles.InputElement} onChange={props.onChange} id={props.id}>
          {props.options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      );
      break;

    case 'checkboxes':
      inputElement = (
        <div className={styles.CheckBoxes} id={props.id}>
          {props.options.map(option => (
          <div key={option.label}>
            <input type='checkbox' label={option.label} value={option.value} key={option.value} onChange={props.onChange} />
            <label className={styles.CheckboxLabel} key={option.label}>{option.label}</label>
          </div>
          ))}
        </div>
      );
      break;
    default:
      inputElement = <input className={styles.InputElement} {...props} />;
    };

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
