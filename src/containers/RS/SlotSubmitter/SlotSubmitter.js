import React, { Component } from 'react';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Form from '../../../components/RS/Submit/Form/Form';
import SubmitFormButtons from '../../../components/RS/Submit/SubmitFormButtons/SubmitFormButtons';


class SlotSubmitter extends Component {

  state = {
    dateAndTime: this.props.match.params.dateAndTime,
    date: this.props.match.params.dateAndTime.split('_')[0],
    time: this.props.match.params.dateAndTime.split('_')[1],
    rsInfo: {
      firstName: '',
      lastName: '',
      email: '',
      semester: 1,
      abschluss: 'bachelor',
      fach: '',
      firstLanguage: '',
      secondLanguage: '',
      foreignLanguage: '',
      terminReasons: {
        ideenEntwickeln: false,
        unwohlBeimSchreiben: false,
        dozEmpfehlung: false,
        wissenschaftlichkeitLernen: false,
        feedback: false
      },
      otherTerminReason: '',
      reachedBy: {
        flyer: false,
        dozierende: false,
        socialMedia: false,
        ov: false,
        kommilitonen: false
      }
    },
    invalidForm: false,
    ptName: null
  }

  inputHandler = (event) => {
    const currentInfo = {...this.state.rsInfo};

    switch (event.target.type) {
      case 'text':
        currentInfo[event.target.id] = event.target.value;
        this.setState({
          rsInfo: currentInfo
        });
        break;

      case 'email':
        currentInfo[event.target.id] = event.target.value;
        this.setState({
          rsInfo: currentInfo
        });
        break;

      case 'select-one':
        currentInfo[event.target.id] = event.target.value;
        this.setState({
          rsInfo: currentInfo
        });
        break;

      case 'checkbox':
        const checkboxesName = event.target.parentElement.parentElement.id;
        const clickedBox = event.target.value;
        const updatedCheckboxes = currentInfo[checkboxesName];
        updatedCheckboxes[clickedBox] = !updatedCheckboxes[clickedBox];
        currentInfo[checkboxesName] = updatedCheckboxes;
        this.setState({
          rsInfo: currentInfo
        });
        break;
      default:
      currentInfo[event.target.id] = event.target.value;
      this.setState({
        rsInfo: currentInfo
      });
      break;
    }
    console.log(this.state);
  };

  submitHandler = () => {
    console.log(this.state.rsInfo);
    const currentInfo = {...this.state.rsInfo};
    if (currentInfo.firstName < 1 || currentInfo.lastName < 1 || !(currentInfo.email.includes('@'))) {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0;
      this.setState({invalidForm: true});
      return null;
    } else {
      alert('Dein Termin wurde reserviert! Wir schicken dir gleich eine Mail zur Bestätigung, in der du den Treffpunkt und weitere Informationen zur Beratung findest.')
    }
  }

  goBackHandler = () => {
    this.props.history.push({pathname: '/rs/select-slot'})
  }

  componentDidMount () {
    console.log(this.state.dateAndTime)
  }

  render () {
    const currentRSInfo = {...this.state.rsInfo};

    return (
      <AuxComp>
        <Form
          date={this.state.date}
          time={this.state.time}
          rsInfo={this.state.rsInfo}
          inputHandler={this.inputHandler}
          invalidForm={this.state.invalidForm} />
        <SubmitFormButtons
          available={currentRSInfo.firstName.length >= 1 && currentRSInfo.lastName.length >= 1 && currentRSInfo.email.includes('@')}
          goBackHandler={this.goBackHandler}
          submitHandler={this.submitHandler}
           />
      </AuxComp>
    );
  }
};

export default SlotSubmitter;
