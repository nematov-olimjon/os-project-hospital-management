import React, { useState } from 'react';
import { AppointmentList } from './AppointmentList';
import { render } from '@testing-library/react';
import { AddAppt } from './AddAppt';
import { name, role } from './SignUp';
import { LoginName, LoginRole } from './Login';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from './Menu';
import { LINK } from './../App';
import AddDoctor from './AddDoctor';
import AddTimeSlot from './AddTimeSlot';

let dataDoctors: string;
const doctorArr = [];

interface MainProps {
  name?: any;
  value?: any;
}
interface MainState {
  date: Date;
  isClicked: boolean;
  isDoctorTable: boolean;
  isBookAppt: boolean;
  isTimeSlot: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {},
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    const initialState = {
      date: new Date(),
      isClicked: false,
      isDoctorTable: false,
      isBookAppt: false,
      isTimeSlot: false,
    };
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
    this.handleDoctorTable = this.handleDoctorTable.bind(this);
    this.handleBookAppt = this.handleBookAppt.bind(this);
    this.handleTimeSlot = this.handleTimeSlot.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, isClicked: condition });
  }

  handleDoctorTable(condition: boolean) {
    this.setState({ ...this.state, isDoctorTable: condition });
  }

  handleBookAppt(condition: boolean) {
    this.setState({ ...this.state, isBookAppt: condition });
  }

  handleTimeSlot(condition: boolean) {
    this.setState({ ...this.state, isTimeSlot: condition });
  }


  open = () => {
    this.handleClick(true);
  };

  openBookAppt = () => {
    this.handleBookAppt(true);
  }

  openTimeSLot = () => {
    this.handleTimeSlot(true);
  }

  getDoctors = () => {
    const axios = require('axios');
    const res = axios
      .post(LINK, {
        request: `list_doctors`,
      })
      .then((response) => {
        if (response.data !== 'NO RECORDS') {
          dataDoctors = response.data;
          this.formatData();
          this.handleDoctorTable(true);
          this.objOfDoctor = doctorArr.map((el) => ({
            doctor_id: el[0],
            doctor_name: el[1],
            email: el[2],
            phone_number: el[3],
            category: el[4],
            location: el[5],
          }));
        }
      });
  };

  public formatData() {
    const array = dataDoctors.split(';');
    array.pop();
    let arr = [];
    array.forEach((el) => {
      arr.push(el);
      if (arr.length === 6) {
        doctorArr.push(arr);
        arr = [];
      }
    });
  }
  objOfDoctor = [];

  renderElement() {
    console.log(role)
    if(role || LoginRole === 1) {
      const { isBookAppt } = this.state;
      if (isBookAppt) {
        return (<AddAppt/>)
      }
      return (
        <div className="patient-main">
          <h2>My Appointments</h2>
          <AppointmentList />
          <div className="book-appt">
            <button className="book" onClick={this.openBookAppt}>
              Book New Slot
            </button>
          </div>
        </div>
      );
    }

    if (role || LoginRole === 3) {
      return (
        <div className="admin-main">
          <h2>All Doctors</h2>
          <div className="viewbtn">
            <button onClick={this.getDoctors} className="view">
              View
            </button>
          </div>
          <div className="book-appt">
            <button type="submit" className="book" onClick={this.open}>
              Add Doctor
            </button>
          </div>
        </div>
      );
    }

    if (role || LoginRole === 2) {
      const { isTimeSlot } = this.state;
      if (isTimeSlot) {
        return (<AddTimeSlot />)
      }
      return (
        <div className="doctor-main">
          <h2>My Appointments</h2>
          <AppointmentList />
          <div className="book-appt">
            <button className="book" onClick={this.openTimeSLot}>
              Add Time Slots
            </button>
          </div>
        </div>
      )
    }

    else {
      return(<p>Error occured, please restart the app</p>)
    }
  }

  render() {
    const { isClicked } = this.state;
    const { isDoctorTable } = this.state;


    console.log(this.objOfDoctor)

    if (!isClicked && !isDoctorTable) {
      return (
        <div className="main">
          <Menu />
          {this.renderElement()}
        </div>
      );
    }

    if (isDoctorTable) {
      {this.getDoctors}
      return (
        <div className="main">
          <Menu />
          <h2>All Doctors</h2>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="title">Doctor</StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Specialty
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Location
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Telephone
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Email
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.objOfDoctor.map((row) => (
                  <StyledTableRow key={row.doctor_id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="record"
                    >
                      {`Dr. ${row.doctor_name}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {`${row.category}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {`${row.location}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {`${row.phone_number}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {`${row.email}`}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="book-appt">
            <button type="submit" className="book" onClick={this.open}>
              Add Doctor
            </button>
          </div>
        </div>
      );
    }
    if (isClicked) {
      return <AddDoctor />;
    }

    else {
      return (
        <p>Nothing</p>
      );
    }
  }
}

export default Main;
