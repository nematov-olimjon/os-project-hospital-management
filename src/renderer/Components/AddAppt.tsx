import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Main';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import App from 'renderer/App';

import Menu from '../Components/Menu';

let doctor_name;
let name;
let time: number;
let dateToday = new Date();
let PickDate = new Date();
let notOverlap = false;

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
    name = e.target.value;
  };

  handleDoctorName = (e) => {
    e.preventDefault();
    doctor_name = e.target.value;
  };

  handleDate = (e) => {
    e.preventDefault();
    PickDate = e.target.value;
    console.log('dfsf');
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
    };
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, notOverlap: condition });
  }

  isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  add = () => {
    const axios = require('axios');
    const res = axios
      .post('https://0419-84-54-80-227.eu.ngrok.io/request', {
        request: `make_appointment;${name};${doctor_name};${PickDate.getFullYear()};${
          PickDate.getMonth() + 1
        };${PickDate.getDate() + 1};${this.times[time].slice(0, 2)};${
          time >= this.times.length - 1 ? '18' : this.times[time + 1].slice(0, 2)
        }`,
      })
      .then((response) => {
        if (response.data === 'NOT OVERLAPS') {
          this.handleClick(true);
          console.log(response.data);
        }
        if (response.data === 'NO SUCH DOCTOR NAME') {
          console.log(response.data);
          const root =  ReactDOM.createRoot(document.querySelector(".add"));
          const elem = <div>{this.render()}<p style={{color: "red"}}>No Such Doctor Name</p></div>
          root.render(elem);
        }
      });
  };

  render() {
    const { notOverlap } = this.state;
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
                onChange={this.handleName}
                className="name"
              />
            </div>
            <div className="date">
              <span className="label">Choose Date</span>
              <br />
              <DatePicker
                minDate={dateToday}
                filterDate={this.isWeekday}
                dateFormat="MM/dd/yyyy"
                selected={this.state.date}
                onChange={(daate: Date) => {
                  PickDate = this.state.date;
                  console.log(PickDate.toString());
                  this.setState({ ...this.state, date: daate });
                }}
                value={this.state.date}
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
