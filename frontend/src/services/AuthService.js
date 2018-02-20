import io from 'socket.io-client';
import APIService from './APIService';
import { setAuthenticatedStatus, setAuthenticationError, setSubmissionError, setSuccesfulSubmission } from '../actions/authActions';
import { dispatch } from '../services/ReduxService';

class AuthService {
  constructor() {
    this.socket = null;
  }

  login = (username, password) => {
    const request = new XMLHttpRequest();
    console.log("inside login")
    request.open('POST', 'http://localhost:7000/auth/login', true);
    request.timeout = 5000; // 5s timeout
    request.withCredentials = true;
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.ontimeout = () => {
      dispatch(setAuthenticationError('Timeout connecting to the backend'));
    };

    request.onreadystatechange = () => {
      console.log("login response");
      console.log(request);
      console.log(request.status);
      console.log(request.responseText);
      if (request.readyState === 4) {
        if (request.status === 200) {
          this.connect();
        } else {
          switch (request.status) {
            case -1:
            case 0:
            case 404:
            case 500:
              dispatch(setAuthenticationError('Service not available'));
              break;

            case 403:
              dispatch(setAuthenticationError(request.responseText));
              break;

            default:
              dispatch(setAuthenticationError(`${request.responseText}`));
          }
        }
      }
    };
    request.send(`username=${username}&password=${password}`);
  }

  logout = () => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:7000/auth/logout', true);
    request.timeout = 5000; // 5s timeout
    request.withCredentials = true;
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.ontimeout = () => {
      dispatch(setAuthenticationError('Timeout connecting to the backend'));
    };

    request.onreadystatechange = () => {
      console.log("logout response");
      if (request.readyState === 4) {
        if (request.status === 200) {
          this.signOut();
        } else {
          switch (request.status) {
            case -1:
            case 0:
            case 404:
            case 500:
              dispatch(setAuthenticationError('Service not available'));
              break;

            case 403:
              dispatch(setAuthenticationError(request.responseText));
              break;

            default:
              dispatch(setAuthenticationError(`${request.status}: ${request.statusText}`));
          }
        }
      }
    };
    request.send();
  }

  submit = (subject, name, email, urgency, message) => {
    const request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:7000/api/tickets/submit-ticket', true);
    request.timeout = 5000; // 5s timeout
    request.withCredentials = true;
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.ontimeout = () => {
      dispatch(setAuthenticationError('Timeout connecting to the backend'));
    };
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(request.responseText);
          if (request.responseText.indexOf('Error') !== -1) {
            dispatch(setSubmissionError(request.responseText));
          } else {
            dispatch(setSuccesfulSubmission(true));
          }
        } else {
          switch (request.status) {
            case -1:
            case 0:
            case 404:
            case 500:
              dispatch(setSubmissionError('Service not available'));
              break;

            case 403:
              dispatch(setSubmissionError(request.responseText));
              break;

            default:
              dispatch(setSubmissionError(`${request.status}: ${request.statusText}`));
          }
        }
      }
    };
    request.send(`name=${name}&subject=${subject}&email=${email}&message=${message}&urgency=${urgency}`);
  }

  connect = () => {
    this.socket = io.connect('http://localhost:7000',
      {
        transports: ['websocket'],
        randomizationFactor: 0,
        secure: true,
      },
    );

    this.socket.on('connect', () => {
      this.signIn();
    });

    this.socket.on('connect_error', () => {
      this.signOut();
    });
  }

  signIn = () => {
    APIService.init(this.socket);
    dispatch(setAuthenticatedStatus(true));
  }

  signOut = () => {
    if (this.socket !== null) {
      this.socket.disconnect();
      this.socket = null;
    }
    APIService.destroy();
    dispatch(setAuthenticatedStatus(false));
  }
}

export default new AuthService();
