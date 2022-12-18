import React from 'react';
import { render } from 'react-dom';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

function timeSlotValidator(slotTime) {
  const eveningTime = new Date(
    slotTime.getFullYear(),
    slotTime.getMonth(),
    slotTime.getDate(),
    18,
    0,
    0
  );
  const isValid = slotTime.getTime() > eveningTime.getTime();
  return isValid;
}

function fakeRequest(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Uncomment below to trigger error:
      // return reject('Error: KABOOM!');
      resolve({
        status: 'ok',
        scheduled: data
      });
    }, 2e3);
  });
}

function Add() {
  const [isScheduling, setIsScheduling] = React.useState(false);
  const [isScheduled, setIsScheduled] = React.useState(false);
  const [scheduleErr, setScheduleErr] = React.useState('');

  const handleScheduled = date => {
    setIsScheduling(true);
    setScheduleErr('');
    fakeRequest(date)
      .then(json => {
        setScheduleErr('');
        setIsScheduled(true);
        console.log('fake response: ', json);
      })
      .catch(err => {
        setScheduleErr(err);
      })
      .finally(() => {
        setIsScheduling(false);
      });
    }


  return (
    <DayTimePicker
      timeSlotSizeMinutes={15}
      timeSlotValidator={timeSlotValidator}
      onConfirm={handleScheduled}
      isLoading={isScheduling}
      isDone={isScheduled}
      err={scheduleErr}
    />
  );
}

export default Add;
