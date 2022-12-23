import React, { useState } from 'react';
import axios from 'axios';
import Main from './Main';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { LINK } from './../App';
import { LoginName, LoginRole } from './Login';

let name, date, time;
let isAddTimeSlot = false;

interface AddTimeSlotProps {
  name?: any;
  role?: any;
}
interface AddTimeSlotState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
  isAddTimeSlot: boolean;
}

export class AddTimeSlot extends React.Component<
  AddTimeSlotProps,
  AddTimeSlotState
> {
  handleName = (e) => {
    e.preventDefault();
    name = e.target.value;
  };

  handleDate = (e) => {
    e.preventDefault();
    date = e.target.value;
  };
  handleTime = (e) => {
    e.preventDefault();
    time = e.target.value;
  };

  constructor(props: AddTimeSlotProps) {
    super(props);
    const initialState = {
      username: '',
      email: '',
      password: '',
      errors: {
        username: '',
        email: '',
        password: '',
      },
      isAddTimeSlot: false,
    };
    this.state = initialState;
    this.handleTimeSlot = this.handleTimeSlot.bind(this);
  }

  public times = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  handleTimeSlot(condition: boolean) {
    this.setState({ ...this.state, isAddTimeSlot: condition });
  }

  setTimeSlot = () => {
    const axios = require('axios');
    const res = axios
      .post(LINK, {
        request: `set_time_slot;${name};${date.slice(6, 10)};${date.slice(
          3,
          5
        )};${date.slice(0, 2)};${this.times[time].slice(0, 2)};${
          time >= this.times.length - 1
            ? '18'
            : this.times[time + 1].slice(0, 2)
        }`,
      })
      .then((response) => {
        if (response.data === 'TIME SLOT ADDED') {
          this.handleTimeSlot(true);
          console.log(response.data);
        }
      });
  };

  render() {
    const { errors } = this.state;
    const { isAddTimeSlot } = this.state;

    if (!isAddTimeSlot) {
      return (
        <div className="add">
          <h3>Add Time Slot</h3>
          <form noValidate>
            <div className="fullName">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                onChange={this.handleName}
                className="name"
              />
              {errors.username.length > 0 && (
                <span style={{ color: 'red' }}>{errors.username}</span>
              )}
            </div>
            <div className="date">
              <span className="label">Choose Date</span>
              <br />
              {/* <DatePicker
                minDate={dateToday}
                filterDate={this.isWeekday}
                dateFormat="MM/dd/yyyy"
                selected={this.state.date}
                onChange={(daate: Date) => {
                  this.setState({ ...this.state, date: daate });
                  PickDate = this.state.date;
                  console.log(PickDate.toString());
                }}
                value={this.state.date}
              /> */}
              <input
                type="text"
                name="date"
                onChange={this.handleDate}
                className="name"
                placeholder="dd/MM/yyyy"
              />
              <div className="time">
                <InputLabel id="demo-simple-select-label">Time</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-date"
                  label="Age"
                  input={<OutlinedInput label="Name" />}
                  onChange={this.handleTime}
                >
                  {this.times.map(function (n, i = 0) {
                    return [<MenuItem value={i}>{n}</MenuItem>];
                    i++;
                  })}
                </Select>
              </div>
            </div>
          </form>
          <button type="submit" onClick={this.setTimeSlot} className="book">
              Add Time Slot
            </button>
        </div>
      );
    } else {
      return <Main />;
    }
  }
}

export default AddTimeSlot;
