import React, { Component } from 'react';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Days from '../../../components/PT/Slots/Days/Days';
import DayButtons from '../../../components/PT/Slots/DayButtons/DayButtons';
import SubmitButtons from '../../../components/PT/Slots/SubmitButtons/SubmitButtons';

class SlotSetter extends Component {
  state = {
    days: ["Mo", "Di", "Mi", "Do", "Fr"], //change this to numbers to make it fit with api
    selectedSlots: [], //(daytime, daytime...) tuple
    //another info to send to a server could be amount of offered slots, corresponging to priority
    //a sensible amount of maximum slots to offer seems 5, this could easily be implemented by checking the .length of selectedSlots
    numberOfWeeks: 1,
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
    for (let i in this.state.selectedSlots) {
      //post each slot to api
    }
  }

  render () {

    return (
      <AuxComp>
        <h1 style={{textAlign: 'center'}}>Terminauswahl</h1>
        <h3 style={{textAlign: 'center'}}>Wähle Wochentage und Uhrzeiten aus, an denen du beraten willst.</h3>
        <DayButtons />
        <Days
          days={this.state.days}
          selectedSlots={this.state.selectedSlots}
          onSlotClick={this.slotClickHandler} />
        <SubmitButtons weekSelectHandler={this.weekSelectHandler} submittable={this.state.selectedSlots.length > 0} />
      </AuxComp>
    );
  }
};

export default SlotSetter;
