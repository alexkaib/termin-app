import React, { Component } from 'react';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import WeekButtons from '../../components/RS/Slots/WeekButtons/WeekButtons';
import DayButtons from '../../components/RS/Slots/DayButtons/DayButtons';
import Days from '../../components/RS/Slots/Days/Days';

class WeekDisplayer extends Component {
  constructor(props) {
    super(props);

    const nextThreeWeeks = [];
    let today = new Date();
    const currentWeekday = today.getDay();
    today.setDate(today.getDate() + (1 - currentWeekday)); //set 'today' to current week's monday
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 5; j++) {
        nextThreeWeeks.push(today.toISOString().split('T')[0]);
        today.setDate(today.getDate() + 1);
      };
      today.setDate(today.getDate() + 2);
    };

    this.state = {
      allDates: nextThreeWeeks,
      dates: nextThreeWeeks.slice(0,5),
      slots: [],
      nextAvailable: true,
      prevAvailable: false
    };
  }

  nextWeekHandler = () => {
    var currentIdx = this.state.allDates.indexOf(this.state.dates[4]);

    if (this.state.allDates.length - (currentIdx + 1) < 5) {
      console.log('Not enough dates on server');
      this.setState({nextAvailable: false});
    } else {
      var newDates = this.state.allDates.slice(currentIdx + 1, currentIdx + 6);
      if (this.state.allDates.length - (this.state.allDates.indexOf(newDates[4]) + 1) < 5) {
        this.setState({nextAvailable: false})
      }
      this.setState({dates: newDates, prevAvailable: true});
    }
  };

  prevWeekHandler = () => {
    var currentIdx = this.state.allDates.indexOf(this.state.dates[0]);

    if (currentIdx < 4) {
      console.log('Not enough dates on server');
      this.setState({prevAvailable: false});
    } else {
      var newDates = this.state.allDates.slice(currentIdx - 5, currentIdx);
      if (this.state.allDates.indexOf(newDates[0]) < 4) {
        this.setState({prevAvailable: false})
      }
      this.setState({dates: newDates, nextAvailable: true});
    }
  }

  render() {
    return (
      <AuxComp>
        <h1 style={{textAlign: 'center'}}>{this.props.headline}</h1>
        <DayButtons dates={this.state.dates} />
        <Days
          dates={this.state.dates}
          onSlotClick={this.props.slotSelectionHandler}
          availableSlots={this.props.slots} />
        <WeekButtons
          onNextClick={this.nextWeekHandler}
          onPrevClick={this.prevWeekHandler}
          nextAvailable={this.state.nextAvailable}
          prevAvailable={this.state.prevAvailable}
          />
      </AuxComp>
    );
  }
};

export default WeekDisplayer;
