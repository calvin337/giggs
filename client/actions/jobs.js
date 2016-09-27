import axios from 'axios';
import Cookies from 'js-cookie';
import { SubmissionError } from 'redux-form';
import { browserHistory } from 'react-router';

import { GET_ALL_JOBS, CREATE_JOB, GET_JOBS } from './actionTypes';

export function sendJob(jobDetails) {
  const jobDet = jobDetails;
  jobDet.category_id = jobDetails.category_id.value;
  jobDet.location_lat = 1.0;
  jobDet.location_lng = 2.0;
  jobDet.user_id = Cookies.getJSON('user').userid;
  console.log('jobdetails', jobDet);
  console.log('cookies user', Cookies.getJSON('token'));
  console.log('cookies ', Cookies.getJSON('user'));
  return (dispatch) => {
    return axios.post('/db/jobs/create', jobDet, { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then((response) => {
        console.log('createJob payload:', response);
        browserHistory.push('/joblistings');
        dispatch({ type: CREATE_JOB, payload: response.data });
      })
      .catch(() => {
        console.log('value:', Object.keys(jobDet).length);
        if (Object.keys(jobDet).length < 9) {
          throw new SubmissionError({ _error: 'Please fill out missing fields.' });
        }
      });
  };
}

export function getJobList() {
/*  console.log('inside job.js');
  // const request = axios.get('/db/jobs/getAll');
  return {
    type: createJob,
    payload: 'test'
  };*/
  return (dispatch) => {
    return axios.get('/db/jobs/getAll', { headers: { 'x-access-token': Cookies.getJSON('token') } })
      .then(response => {
          dispatch({ type: GET_ALL_JOBS, payload: response.data });
          console.log('response from getJobList:', response);
        })
      .catch(() => {
        throw new SubmissionError({ _error: 'something terrible happened' });
      });
    }
}

export function getJobDetail(jobID) {
  const field = 'id';
  return (dispatch) => {
    return axios.get('/db/jobs/query', {
      params: {
        field,
        key: jobID
      }
    })
    .then(response => {
      dispatch({ type: GET_JOBS, payload: response.data });
      console.log('response from queryJob', response.data);
    })
    .catch((err) => {
      throw err;
    });
  };
}
