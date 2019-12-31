import React from 'react';

import styles from './Slot.module.css';

const slot = props => {
  const slotStyles = [styles.Slot];
  if (props.highlighted) {
    slotStyles.push(styles.Highlighted)
  };

  return (
    <div
      className={slotStyles.join(" ")}
      onClick={() => props.onSlotClick(props.daytime)}>
      <p>{props.time}</p>
    </div>
  );
};

export default slot;
