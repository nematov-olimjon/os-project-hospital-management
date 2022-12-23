import React, { useState } from 'react';
import axios from 'axios';
import Main from './Main';
import { LINK } from './../App'
import '../../config';

let name;
let email;
let tel;
let password;
let category;
let location;
let isAddDoctor = false;


const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);

interface AddDoctorProps {
  name?: any;
  role?: any;
}
interface AddDoctorState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
  isAddDoctor: boolean;
}

export class AddDoctor extends React.Component<AddDoctorProps, AddDoctorState> {
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

  handleCateg = (e) => {
    e.preventDefault();
    category = e.target.value;
  };

  handleLoc = (e) => {
    e.preventDefault();
    location = e.target.value;
  };

  constructor(props: AddDoctorProps) {
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
      isAddDoctor: false,
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, isAddDoctor: condition });
  }

  register = () => {
    const axios = require('axios');
    const res = axios
      .post(LINK, {
        request: `sign_up_doctor;${name};${password};${tel};${email};${category};${location}`,
      })
      .then((response) => {
        if (response.data === 'OK') {
          this.handleClick(true);
          console.log(response.data);
        }
      });
  };

  render() {
    const { errors } = this.state;
    const { isAddDoctor } = this.state;

    if (!isAddDoctor) {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Sign Up</h2>
            <form onSubmit={this.handleSubmit} noValidate>
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
                <label htmlFor="telPhone">Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  onChange={this.handleCateg}
                  className="tel"
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
              <div className="emailAddr">
                <label htmlFor="emailAddr">Location</label>
                <input
                  type="text"
                  name="location"
                  onChange={this.handleLoc}
                  className="email"
                />
              </div>
              <div className="submit">
                <button onClick={this.register}>Add Doctor</button>
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

export default AddDoctor;
