import * as types from '../constants/actions';

const initialState = {
  authenticated: false,
  authenticationError: '',
  submitted: false,
  submissionError: '',
};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_AUTHENTICATION_ERROR: {
      const authenticationError = action.error;
      return { ...state, authenticationError };
    }
    case types.SET_AUTHENTICATED_STATUS: {
      const authenticated = action.status;
      return { ...state, authenticated };
    }
    case types.SET_SUBMISSION_ERROR: {
      const submissionError = action.error;
      return { ...state, submissionError };
    }
    case types.SET_SUCCESFUL_SUBMISSION: {
      const submitted = action.status;
      return { ...state, submitted };
    }
    default:
      return state;
  }
};

export default auth;
