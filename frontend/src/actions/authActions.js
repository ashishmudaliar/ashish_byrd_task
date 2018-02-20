import * as types from '../constants/actions';

export const setAuthenticationError = error => ({
  type: types.SET_AUTHENTICATION_ERROR,
  error,
});

export const setSubmissionError = error => ({
  type: types.SET_SUBMISSION_ERROR,
  error,
});

export const setSuccesfulSubmission = status => ({
  type: types.SET_SUCCESFUL_SUBMISSION,
  status,
});

export const setAuthenticatedStatus = status => ({
  type: types.SET_AUTHENTICATED_STATUS,
  status,
});
