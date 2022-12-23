import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { name, role } from './SignUp';
import { LoginName, LoginRole } from './Login';
import { LINK } from './../App';

let data: string;
//const data = "1;Ann;1;Bob;2022;12;31;8;10;1;Ann;1;Bob;2022;12;31;11;12;"
const elArr = [];

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

interface ApptProps {
  name?: any;
  value?: any;
}
interface ApptState {
  name: string;
  doctor_name: string;
  year: string;
  month: string;
  day: string;
  time: string;
  isClicked: boolean;
}

export class AppointmentList extends React.Component<ApptProps, ApptState> {
  constructor(props: ApptProps) {
    super(props);
    const initialState = {
      name: '',
      doctor_name: '',
      year: '',
      stringDate: '',
      month: '',
      day: '',
      time: '',
      isClicked: false,
    };
    this.state = initialState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(condition: boolean) {
    this.setState({ ...this.state, isClicked: condition });
  }
  cancel = (info) => {
    const axios = require('axios');
    const res = axios
    .post(LINK, {
      request: `cancel_appointment;${info.patient_name};${info.doctor_name};${info.year};${info.month};${info.day};${info.from};${info.to}`
    })
    .then((response) => {
      if(response.data === 'DELETED') {

        this.handleClick(false);
        this.getAppt();
      }
    })
  }
  getAppt = () => {
    const axios = require('axios');
    const res = axios
      .post(LINK, {
        request: `list_appointment_${
          role || LoginRole === 1 ? 'patient' : 'doctor'
        };${name || LoginName}`,
      })
      .then((response) => {
        if (response.data !== 'NO RECORDS') {
          data = response.data;
          this.formatData();
          this.handleClick(true);
          this.objOfAppointments = elArr.map((el) => ({
            patient_id: el[0],
            patient_name: el[1],
            doctor_id: el[2],
            doctor_name: el[3],
            year: el[4],
            month: el[5],
            day: el[6],
            from: el[7],
            to: el[8],
            doctor_email: el[9],
            doctor_tel: el[10],
            patient_email: el[11],
            patient_tel: el[12],
          }));
        }

        console.log(response.data);
      });
  };

  public formatData() {
    const array = data.split(';');
    array.pop();
    let arr = [];
    array.forEach((el) => {
      arr.push(el);
      if (arr.length === 13) {
        elArr.push(arr);
        arr = [];
      }
    });
  }


  objOfAppointments = [];

  render() {
    const { isClicked } = this.state;

    if (!isClicked) {
      return (
        <div className="viewbtn">
          <button onClick={this.getAppt} className="view">
            View
          </button>
        </div>
      );
    } else {
      return (
        <div >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="title">
                    {role || LoginRole === 1 ? 'Patient' : 'Doctor'}
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Appt Date
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Booking Time
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Telephone
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Email
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Cancellation
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.objOfAppointments.map((row) => (
                  <StyledTableRow key={row.patient_id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="record"
                    >
                      {role || LoginRole === 1
                        ? `${row.patient_name}`
                        : `Dr. ${row.doctor_name}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {row.day + '-' + row.month + '-' + row.year}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {row.from + ':00' + ' - ' + row.to + ':00'}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {role || LoginRole === 2
                        ? `${row.patient_tel}`
                        : `${row.doctor_tel}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                    {role || LoginRole === 2
                        ? `${row.patient_email}`
                        : `${row.doctor_email}`}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      <button className='btn cancel' onClick={this.cancel.bind(null, row)}>Cancel</button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  }
}
