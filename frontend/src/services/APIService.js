import { dispatch } from './ReduxService';
import { sendRequest, receiveResponse } from '../actions/APIServiceActions';

class APIService {
  constructor() {
    this.socket = null;
    this.lastRequestId = 0;
    console.log("API Service init");
  }

  init = (socket) => {
    this.socket = socket;
    this.socket.on('response', (data) => {
      dispatch(receiveResponse(data));
    });
  }

  destroy = () => {
    this.socket = null;
  }

  sendRequest = (type, data) => {
    console.log('Inside send request');
    if (this.socket !== null) {
      console.log('Inside socket check');
      this.lastRequestId += 1;
      const request = { id: this.lastRequestId, type, data };
      this.socket.emit('request', request);
      dispatch(sendRequest(request));
    } else {
      console.error('APIService: Socket is not initialized');
    }
  }
}

export default new APIService();
