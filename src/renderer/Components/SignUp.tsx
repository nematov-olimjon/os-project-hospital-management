import React, { useState } from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import Main from './Main';
import { LINK } from './../App'
import '../../config';

export let role;
export let name;
let email;
let tel;
let password;
let isSignUp = false;


const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);

interface SignUpProps {
  name?: any;
  role?: any;
}
interface SignUpState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
  isSignUp: boolean;
}

export class SignUp extends React.Component<SignUpProps, SignUpState> {
  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'username':
        errors.username =
          value.length < 5 ? 'Username must be 5 characters long!' : '';
        break;
      case 'email':
        errors.email = Regex.test(value) ? '' : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8 ? 'Password must be eight characters long!' : '';
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
    console.log(this.state.errors);
  };
  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if (validity == true) {
      console.log('Registering can be done');
    } else {
      console.log('You cannot be registered!!!');
    }
  };

  handleValue = (e) => {
    e.preventDefault();
    role = e.target.value;
  };

  handleName = (e) => {
    e.preventDefault();
    name = e.target.value;
  };

  handlePass = (e) => {
    e.preventDefault();
    password = e.target.value;
  };
  handleEmail = (e) => {
    e.preventDefault();
    email = e.target.value;
  };
  handleTel = (e) => {
    e.preventDefault();
    tel = e.target.value;
  };

  constructor(props: SignUpProps) {
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
      isSignUp: false,
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, isSignUp: condition });
  }

  register = () => {
    const axios = require('axios');
    const res = axios
      .post(LINK, {
        request: `sign_up_patient;${name};${password};${tel};${email}`,
      })
      .then((response) => {
        if (response.data === 'OK') {
            this.handleClick(true);
          console.log(response.data);
          console.log(role)
        }
      });
  };

  render() {
    const { errors } = this.state;
    const { isSignUp } = this.state;

    if (!isSignUp) {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="role">
                <label htmlFor="role">Choose your role</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  onChange={this.handleValue}
                >
                  <MenuItem value={1}>Patient</MenuItem>
                </Select>
              </div>
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
              <div className="telPhone">
                <label htmlFor="telPhone">Phone Number</label>
                <input
                  type="text"
                  name="telPhone"
                  onChange={this.handleTel}
                  className="tel"
                />
              </div>
              <div className="emailAddr">
                <label htmlFor="emailAddr">Email Address</label>
                <input
                  type="email"
                  name="emailAddr"
                  onChange={this.handleEmail}
                  className="email"
                />
              </div>
              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={this.handlePass}
                />
                {errors.password.length > 0 && (
                  <span style={{ color: 'red' }}>{errors.password}</span>
                )}
              </div>
              <div className="submit">
                <button onClick={this.register}>Register Me</button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <Main />;
    }
  }
}

export default isSignUp;
