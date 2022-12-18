import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

  getAppt = () => {
    const axios = require('axios');
    const res = axios
      .post('https://0419-84-54-80-227.eu.ngrok.io/request', {
        request: `list_appointment_patient;${'Olimjon'}`,
      })
      .then((response) => {
        if (response.data !== 'NO RECORDS') {
          data = response.data;
          this.formatData();
          this.handleClick(true);
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
      if (arr.length === 9) {
        elArr.push(arr);
        arr = [];
      }
    });
  }

  render() {
    const { isClicked } = this.state;

    const objOfAppointments = elArr.map((el) => ({
      patient_id: el[0],
      patient_name: el[1],
      doctor_id: el[2],
      doctor_name: el[3],
      year: el[4],
      month: el[5],
      day: el[6],
      from: el[7],
      to: el[8],
    }));

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
        <div onLoad={this.getAppt}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className="title">Doctor</StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Appt Date
                  </StyledTableCell>
                  <StyledTableCell align="left" className="title">
                    Booking Time
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {objOfAppointments.map((row) => (
                  <StyledTableRow key={row.patient_id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className="record"
                    >
                      Dr. {row.doctor_name}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {row.day + '-' + row.month + '-' + row.year}
                    </StyledTableCell>
                    <StyledTableCell align="left" className="record">
                      {row.from + ':00' + ' - ' + row.to + ':00'}
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
