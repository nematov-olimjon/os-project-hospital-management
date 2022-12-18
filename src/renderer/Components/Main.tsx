import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { AppointmentList } from './AppointmentList';
import { render } from '@testing-library/react';
import { AddAppt } from './AddAppt';

interface MainProps {
  name?: any;
  value?: any;
}
interface MainState {
  date: Date;
  isClicked: boolean;
}

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    const initialState = {
      date: new Date(),
      isClicked: false,
    };
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, isClicked: condition });
  }

  open = () => {
    this.handleClick(true);
  };

  render() {
    const { isClicked } = this.state;

    if (!isClicked) {
      return (
        <div className="main">
          <div className="calendar">
            <Calendar value={this.state.date} />
          </div>
          <h2>My Appointments</h2>
          <h1>{this.props.name}</h1>
          <AppointmentList />
          <div className="book-appt">
            <button type="submit" className="book" onClick={this.open}>
              Book New Slot
            </button>
          </div>
        </div>
      );
    }
    else {
      return (<AddAppt/>)
    }
  }
}

export default Main;
