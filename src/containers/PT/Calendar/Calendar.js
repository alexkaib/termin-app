import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-dates/axios-dates';

import WeekDisplayer from '../../WeekDisplayer/WeekDisplayer';
import Modal from '../../../components/UI/Modal/Modal';
import AuxComp from '../../../hoc/AuxComp/AuxComp';

class Calendar extends Component {
  state = {
    showModal: false,
    postedSlots: [],
    selectedSlot: {
      dateAndTime: '2020-01-01_12',
      date: '01.01.2020',
      time: '12:00 Uhr'
    }
  }

  slotSelectionHandler = (dateAndTime) => {
    console.log(dateAndTime);
    const dateAsList = dateAndTime.split('_')[0].split('-');
    const newSelectedSlot = {
      dateAndTime: dateAndTime,
      date: dateAsList[2] + '.' + dateAsList[1] + '.' + dateAsList[0],
      time: dateAndTime.split('_')[1] + ':00 Uhr'
    }
    this.setState({showModal: true, selectedSlot: newSelectedSlot});
    return null;
  }

  backdropClickHandler = () => {
    this.setState({showModal: false})
  }

  componentDidMount () {
    const url = 'rs/' + this.props.userId + '.json';
    axios.get(url)
      .then(res => {
        const offeredDates = res.data;
        this.setState({postedSlots: offeredDates});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render () {

    return (
      <AuxComp>
        <Modal visible={this.state.showModal} onBackdropClick={this.backdropClickHandler}>
          Du bietest am {this.state.selectedSlot.date} um {this.state.selectedSlot.time} einen Termin an.
          Willst du ihn löschen?
        </Modal>
        <WeekDisplayer
          slots={this.state.postedSlots}
          slotSelectionHandler={this.slotSelectionHandler}
          headline="Angebotene Termine"/>
      </AuxComp>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.pt.loggedIn,
    userId: state.pt.userId,
    reservedDates: state.pt.datesWithAppointments
  };
};

const mapDisptachToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDisptachToProps)(Calendar);
