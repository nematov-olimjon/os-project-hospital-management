import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {name, role} from './SignUp'
import {LoginName, LoginRole} from './Login';
import { LINK } from './../App'

import 'react-datepicker/dist/react-datepicker.css';
import App from 'renderer/App';

import Menu from '../Components/Menu';

let doctor_name;
let time: number;
let dateToday = new Date();
let PickDate = new Date();
let notOverlap = false;
let date;

interface AddApptProps {
  name?: any;
  value?: any;
}
interface AddApptState {
  name: string;
  doctor_name: string;
  year: string;
  month: string;
  day: string;
  date: Date;
  time: string;
  notOverlap: boolean;
  chosenDate: string;
}

export class AddAppt extends React.Component<AddApptProps, AddApptState> {
  public doctors = [
    'John Smith',
    'Cristiano Ronaldo',
    'Adam Sandler',
    'Dua Lipa',
  ];

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
  handleName = (e) => {
    e.preventDefault();
  };

  handleDoctorName = (e) => {
    e.preventDefault();
    doctor_name = e.target.value;
  };

  handleDate = (e) => {
    e.preventDefault();
    date = e.target.value;
  };

  handleTime = (e) => {
    e.preventDefault();
    time = e.target.value;
    console.log(time);
  };

  constructor(props: AddApptProps) {
    super(props);
    const initialState = {
      name: '',
      doctor_name: '',
      year: '',
      date: new Date(
        dateToday.getFullYear(),
        dateToday.getMonth(),
        dateToday.getDate()
      ),
      stringDate: '',
      month: '',
      day: '',
      time: '',
      notOverlap: false,
      chosenDate: dateToday.getDate() + '/' + dateToday.getMonth() + '/' + dateToday.getDate
    };
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, notOverlap: condition });
  }

  handleChosenDate(dateString: string) {
    this.setState({ ...this.state, chosenDate: dateString });
  }

  isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  add = () => {
    const axios = require('axios');
    const res = axios
      .post(LINK, {
        request: `make_appointment;${name || LoginName};${doctor_name};${date.slice(6,10)};${date.slice(3,5)};${date.slice(0,2)};${this.times[time].slice(0, 2)};${time >= this.times.length - 1 ? '18': this.times[time + 1].slice(0, 2)}`,
      })
      .then((response) => {
        if (response.data === 'NOT OVERLAPS') {
          this.handleClick(true);
          console.log(response.data);
        } else if (response.data === 'NO SUCH DOCTOR NAME') {
          console.log(response.data);
          const root = ReactDOM.createRoot(document.querySelector('.add'));
          const elem = (
            <div>
              {this.render()}
              <p style={{ color: 'red' }}>No Such Doctor Name</p>
            </div>
          );
          root.render(elem);
        } else {
          console.log(response.data);
          const root = ReactDOM.createRoot(document.querySelector('.add'));
          const elem = (
            <div>
              {this.render()}
              <p style={{ color: 'red' }}>Time Overlaps</p>
            </div>
          );
          root.render(elem);
        }
      });
  };

  render() {
    const { notOverlap } = this.state;
    const { chosenDate } = this.state;
    if (!notOverlap) {
      return (
        <div className="add">
          <h2>Add Appointment</h2>
          <form noValidate>
            <div className="role">
              <label htmlFor="role">Enter doctor name</label>
              <input
                type="text"
                name="doctorName"
                onChange={this.handleDoctorName}
                className="name"
              />
            </div>
            <div className="name">
              <label htmlFor="name" className="label">
                Your Name
              </label>
              <br />
              <input
                type="text"
                name="fullName"
                className="name"
                value={name || LoginName}
                disabled = {true}
              />
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
                placeholder='dd/MM/yyyy'
              />
            </div>
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
          </form>
          <div className="book-appt">
            <button type="submit" onClick={this.add} className="book">
              Add New Slot
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div id="content">
          <Main />
        </div>
      );
    }
  }
}
