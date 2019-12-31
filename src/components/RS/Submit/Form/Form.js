import React from 'react';

import Input from '../../../UI/Input/Input';
import styles from './Form.module.css';

const form = props => {
  const howDidYouFindUsCheckboxes = [
    {value: 'flyer', label: 'Flyer'},
    {value: 'dozierende', label: 'Dozierende'},
    {value: 'socialMedia', label: 'Social Media'},
    {value: 'infotisch', label: 'Infotisch'},
    {value: 'kommilitonen', label: 'Kommiliton*innen'},
    {value: 'ov', label: 'Orientierungsveranstaltung'}
  ];

  const terminReasonsCheckboxes = [
    {value: 'ideenEntwickeln', label: 'Ich möchte meine Ideen weiterentwickeln.'},
    {value: 'unwohlBeimSchreiben', label: 'Ich fühle mich beim Schreiben unwohl.'},
    {value: 'dozEmpfehlung', label: 'Mein*e Dozent*in hat mir die Beratung empfohlen.'},
    {value: 'wissenschaftlichkeitLernen', label: 'Ich möchte lernen, wie man wissenschaftlich schreibt.'},
    {value: 'feedback', label: 'Ich möchte Feedback auf meinen Text.'}
  ];

  const semesterOptions = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'}
  ]

  const abschlussOptions = [
    {value: 'bachelor', label: 'Bachelor'},
    {value: 'master', label: 'Master'},
    {value: 'lehramt', label: 'Lehramt'},
    {value: 'magister', label: 'Magister'},
    {value: 'diplom', label: 'Diplom'},
    {value: 'promotion', label: 'Promotion'}
  ]

  return (
    <div>
      <h1>Du hast einen Termin am {props.date.split('-')[2]}.{props.date.split('-')[1]}.
      {props.date.split('-')[0]} um {props.time}:00 Uhr ausgewählt.</h1>
      <h3>Fülle bitte das folgende Formular zur Bestätigung aus. Um fortzufahren, benötigen wir nur deinen
      Namen und deine E-Mail-Adresse. Letztere speichern wir nur vorübergehend, um dich bezüglich des Termins
      kontaktieren zu können.</h3>
      <h3>Deine restlichen Antworten helfen uns bei unserer Forschung und der Verbesserung unserer Angebote,
      deshalb wären wir dankbar, wenn du dir auch für diese kurz Zeit nimmst.</h3>

      <div className={styles.Form}>
        <h2>Pflichtfelder</h2>
        {props.invalidForm?<p style={{color: 'red'}}>Bitte fülle diese Felder vollständig aus.</p>:null}
        <div className={styles.NameForm}>
          <Input
            inputtype='input'
            label='Vorname*'
            elementConfig={{
              id: 'firstName',
              type: 'text',
              value: props.rsInfo.firstName,
              placeholder: 'Dein Vorname',
              onChange: props.inputHandler
            }} />
          <Input
            inputtype='input'
            label='Nachname*'
            elementConfig={{
              id: 'lastName',
              type: 'text',
              value: props.rsInfo.lastName,
              placeholder: 'Dein Nachname',
              onChange: props.inputHandler
            }} />
          <Input
            inputtype='input'
            label='E-Mail*'
            elementConfig={{
              id: 'email',
              type: 'email',
              value: props.rsInfo.email,
              placeholder: 'E-Mail-Adresse',
              onChange: props.inputHandler
            }}/>
        </div>

        <h2>Über dich</h2>
        <div className={styles.Study}>
          <Input
            inputtype='select'
            id='semester'
            label='Fachsemester:'
            options={semesterOptions}
            onChange={props.inputHandler}/>

          <Input
            inputtype='select'
            id='abschluss'
            label='Angestrebter Studienabschluss:'
            options={abschlussOptions}
            onChange={props.inputHandler}/>

          <Input
            inputtype='input'
            label='Hauptstudienfach:'
            elementConfig={{
              id: 'fach',
              type: 'text',
              value: props.rsInfo.fach,
              placeholder: 'Fach',
              onChange: props.inputHandler
            }}/>
        </div>

        <div className={styles.NameForm}>
          <Input
            inputtype='input'
            label='Erstsprache(n)'
            elementConfig={{
              id: 'firstLanguage',
              type: 'text',
              value: props.rsInfo.firstLanguage,
              placeholder: 'Erstsprache(n)',
              onChange: props.inputHandler
            }} />
          <Input
            inputtype='input'
            label='Zweitsprache(n)'
            elementConfig={{
              id: 'secondLanguage',
              type: 'text',
              value: props.rsInfo.secondLanguage,
              placeholder: 'Zweitsprache(n)',
              onChange: props.inputHandler
            }} />
          <Input
            inputtype='input'
            label='Weitere Sprache(n)'
            elementConfig={{
              id: 'foreignLanguage',
              type: 'text',
              value: props.rsInfo.foreignLanguage,
              placeholder: 'weitere Sprache(n)',
              onChange: props.inputHandler
            }}/>
        </div>

        <h2>Zur Schreibberatung</h2>

        <Input
          inputtype='checkboxes'
          id='terminReasons'
          label='Was bringt dich zur Schreibberatung?'
          options={terminReasonsCheckboxes}
          onChange={props.inputHandler}/>

        <div className={styles.OtherCheckbox}>
          <Input
            inputtype='input'
            label='Sonstige:'
            elementConfig={{
              id: 'otherTerminReason',
              type: 'text',
              value: props.rsInfo.otherTerminReason,
              placeholder: 'andere Gründe für die Beratung',
              onChange: props.inputHandler
            }}/>
        </div>

        <Input
          inputtype='checkboxes'
          id='reachedBy'
          label='Wie hast du von uns erfahren?'
          options={howDidYouFindUsCheckboxes}
          onChange={props.inputHandler}/>
      </div>
    </div>
  );
};

export default form;
