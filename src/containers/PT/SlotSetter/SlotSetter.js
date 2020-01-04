import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-dates/axios-dates';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Days from '../../../components/PT/Slots/Days/Days';
import DayButtons from '../../../components/PT/Slots/DayButtons/DayButtons';
import SubmitButtons from '../../../components/PT/Slots/SubmitButtons/SubmitButtons';

class SlotSetter extends Component {
  state = {
    days: ["1", "2", "3", "4", "5"],
    selectedSlots: [], //2-13 (tuesdays at 13:00), 4-11 (thursdays at 11:00), etc. list
    //another info to send to a server could be amount of offered slots, corresponging to priority
    //a sensible amount of maximum slots to offer seems 5, this could easily be implemented by checking the .length of selectedSlots
    numberOfWeeks: 1,
    unauthorized: true,
    slotsToPush: [],
    tutorId: 2 //shouldnt be in state, but part of auth context
  }

  slotClickHandler = clickedSlot => {
    const newSlots = [...this.state.selectedSlots];
    if (newSlots.includes(clickedSlot)) {
      newSlots.splice(newSlots.indexOf(clickedSlot), 1);
    } else {
      newSlots.push(clickedSlot);
    };
    this.setState({selectedSlots: newSlots});
  }

  weekSelectHandler = (event) => {
    this.setState({numberOfWeeks: event.target.value});
  }

  confirmSlotsHandler = () => {
    const userId = this.props.userId;
    const token = this.props.token;
    const url = 'pt/' + userId + '.json?auth=' + token;
    const slotsToPost = [...this.state.selectedSlots];
    const slotsToPush = [];
    for (let i in slotsToPost) {
      //post each slot to api
      let today = new Date();
      const currentWeekday = today.getDay();
      let dayOfSlot = slotsToPost[i].split('-')[0];
      let timeOfSlot = slotsToPost[i].split('-')[1];
      today.setDate(today.getDate() + (dayOfSlot - currentWeekday));  //converts 'today' to the day of the week specified by the slot
      for (let i = 0; i < this.state.numberOfWeeks; i++) {
        today.setDate(today.getDate() + 7);
        let isoDate = today.toISOString().split('T')[0];
        slotsToPush.push(isoDate + '_' + timeOfSlot);
      };
    };
    let payload = JSON.stringify({setSlots: slotsToPush});
    axios.patch(url, payload)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      })
    const rsUrl = 'rs.json';
    let rsPayload = JSON.stringify({[userId]: slotsToPush});
    axios.patch(rsUrl, rsPayload)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  componentDidMount() {
    const url = 'pt/' + this.props.userId + '.json?auth=' + this.props.token;
    axios.get(url)
      .then(res => {
        const dateTimeList = res.data.setSlots;
        const newSelectedSlots = dateTimeList.map(dateTime => {
          let date = new Date(dateTime.split('_')[0]);
          let time = dateTime.split('_')[1];
          return date.getDay() + '-' + time;
        });
        const uniqueSlots = [...new Set(newSelectedSlots)];
        this.setState({selectedSlots: uniqueSlots, unauthorized: false});
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  render () {
    let toDisplay = (
      <AuxComp>
        <h1 style={{textAlign: 'center'}}>Terminauswahl</h1>
        <h3 style={{textAlign: 'center'}}>Wähle Wochentage und Uhrzeiten aus, an denen du beraten willst.</h3>
        <DayButtons />
        <Days
          days={this.state.days}
          selectedSlots={this.state.selectedSlots}
          onSlotClick={this.slotClickHandler} />
        <SubmitButtons
          weekSelectHandler={this.weekSelectHandler}
          submittable={this.state.selectedSlots.length > 0}
          confirmSlotsHandler={this.confirmSlotsHandler} />
      </AuxComp>
    );

    if (this.state.unauthorized) {
      toDisplay = (
        <h3>Du konntest nicht authentifiziert werden. Bitte kehre zum Login-Bildschirm zurück und melde dich erneut an.</h3>
      );
    }

    return toDisplay;
  }
};

const mapStateToProps = (state) => {
  return {
    userId: state.pt.userId,
    token: state.pt.token
  }
};

export default connect(mapStateToProps)(SlotSetter);
