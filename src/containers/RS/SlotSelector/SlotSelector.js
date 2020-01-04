import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-dates/axios-dates';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import WeekButtons from '../../../components/RS/Slots/WeekButtons/WeekButtons';
import DayButtons from '../../../components/RS/Slots/DayButtons/DayButtons';
import Days from '../../../components/RS/Slots/Days/Days';

class SlotSelector extends Component {
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

  slotSelectionHandler = (dateAndTime) => {
    this.props.onSlotSelect(dateAndTime);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0;
    this.props.history.push({pathname: '/rs/submit-slot/'});
  };

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

  componentDidMount() {
    const newSlots = [];

    const availableDates = [];
    //reach out to server to get list of upcoming days and open slots
    //the current or upcoming week should be displayed -> handled by backend
    axios.get('/rs.json')
      .then(req => {
        const pts = Object.keys(req.data);
        //newSlots has a list of slot objects which store both the tutor id and the date + time
        for (let i in pts) {
          let pt = pts[i];
          for (let j in req.data[pt]) {
            newSlots.push({slot: req.data[pt][j], ptId: pt});
          };
        };
        //availableDates is simply a list of all available date +times
        for (let i in newSlots) {
          availableDates.push(newSlots[i].slot);
        };
        this.setState({slots: availableDates});
      })
      .catch(err => {
        console.log(err.response);
      })


    /* const dates = ["2019-12-09", "2019-12-10", "2019-12-11", "2019-12-12", "2019-12-13"];
    const slots = ["2019-12-10_13"];
    return(
      this.setState({dates: dates, slots: slots}),
      console.log(this.state)
    ); */
  }

  render() {
    return (
      <AuxComp>
        <h1 style={{textAlign: 'center'}}>Terminauswahl</h1>
        <DayButtons dates={this.state.dates} />
        <Days
          dates={this.state.dates}
          onSlotClick={this.slotSelectionHandler}
          availableSlots={this.state.slots} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    onSlotSelect: (slot) => dispatch({type: 'SELECT_SLOT', selectedDateAndTime: slot})
  };
};

export default connect(null, mapDispatchToProps)(SlotSelector);
