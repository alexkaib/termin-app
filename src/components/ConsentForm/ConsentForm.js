import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../UI/Input/Input';
import styles from './ConsentForm.module.css';

const consentForm = (props) => (
  <div className={styles.ConsentForm}>
    <h1>Willkommen!</h1>
    <p>Zur Nutzung dieser Anwendung musst du folgenden Nutzungsbedingungen zustimmen:</p>
    <div className={styles.Terms}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo iaculis purus, in rhoncus nibh ultrices at. Vestibulum tellus orci, porta quis dapibus vitae, gravida ut ante. Ut orci mi, ultricies vel massa nec, convallis tincidunt nibh. Nullam vestibulum tincidunt vestibulum. Curabitur eleifend nisl libero, ac aliquam massa condimentum ac. Praesent ullamcorper, nisl id fermentum egestas, diam massa interdum nulla, sed efficitur purus turpis cursus nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris aliquam tincidunt dui at interdum. Maecenas diam libero, dignissim elementum massa nec, tincidunt tincidunt felis. Sed vulputate fringilla magna, a aliquet diam. Duis non nulla nisl. Cras eu turpis id metus placerat ullamcorper. Nullam tincidunt tellus in imperdiet eleifend. Proin vel feugiat neque, vel consequat sapien. Vestibulum sapien elit, congue sed nisl ut, laoreet lobortis erat. Vestibulum blandit sem at leo tincidunt mattis.</p>
      <p>Vestibulum pulvinar ligula eleifend purus cursus scelerisque. Phasellus id nisi ultricies, rhoncus erat eu, viverra ex. Donec id euismod turpis, nec tristique velit. In mattis euismod risus, eget tincidunt ligula volutpat non. Maecenas quis ornare enim, sit amet convallis ipsum. Vivamus condimentum enim at neque tincidunt, a pharetra urna dapibus. Sed pharetra, nisl eu semper egestas, risus nisi ullamcorper urna, in iaculis augue est auctor ipsum. Vivamus neque dolor, rutrum in scelerisque id, dignissim non tortor. Nulla facilisi. Nunc laoreet urna eu lacus tincidunt faucibus. Pellentesque sit amet elit nec urna commodo fermentum et vitae magna. Mauris finibus vitae tortor non auctor. Proin bibendum volutpat varius.</p>
    </div>
    <Input
      inputtype='checkboxes'
      options={[{label: 'Ich habe die Nutzungsbedingungen gelesen und stimme zu.', value: 'termsAccepted'}]}
      onChange={props.inputHandler} />
    <div className={styles.AcceptTermsButton}>
      <p
        className={props.accepted?styles.available:styles.unavailable}
        onClick={props.accepted?props.acceptTermsHandler:null}>
        Bestätigen
      </p>
    </div>
  </div>
);

export default consentForm;
