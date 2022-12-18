import React, { useState } from 'react';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import Main from './Main';

const Validator = () => {
  const [isLogin, setLogin] = useState(false);
};

let role;
let name;
let password;

const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);

interface LoginProps {
  name?: any;
  value?: any;
}
interface LoginState {
  username: string;
  email: string;
  password: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
  isLogin: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case 'name':
        value.length < 1 ? 'Name must be more than 1 character!' : '';
        break;
      case 'password':
        errors.password =
          value.length < 5 ? 'Password must be 5 characters long!' : '';
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
      console.log('Login can be done');
    } else {
      console.log('You cannot log in!!!');
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

  constructor(props: LoginProps) {
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
      isLogin: false,
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, isLogin: condition });
  }

  register = () => {
    const axios = require('axios');
    const res = axios
      .post('https://0419-84-54-80-227.eu.ngrok.io/request', {
        request: `sign_in_${role === 1 ? "patient" : "doctor"};${name};${password}`,
      })
      .then((response) => {
        if (response.data === 'MATCH') {
          console.log(response.data);
          this.handleClick(true);
        } else {
          console.log('Name or password are incorrect');
        }
      });
  };

  render() {
    const { errors } = this.state;
    const { isLogin } = this.state;

    if (!isLogin) {
      return (
        <div className="wrapper">
          <div className="form-wrapper">
            <h2>Login</h2>
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
                  <MenuItem value={2}>Doctor</MenuItem>
                </Select>
              </div>
              <div className="email">
                <label htmlFor="email">Name</label>
                <input type="name" name="name" onChange={this.handleName} />
                {errors.email.length > 0 && (
                  <span style={{ color: 'red' }}>{errors.email}</span>
                )}
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
                <button onClick={this.register}>Login</button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    else {
      return (<Main/>)
    }
  }
}
