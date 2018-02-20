import * as types from '../constants/actions';

const initialState = {
  creationDate : '',
  id: -1,
  status: '',
  subject: '',
  comments: [],
  urgency: '',
  text: '',
};

const handleResponse = (response, state) => {
  console.log(response.type);

  switch (response.type) {
    case 'get_ticket_data': {
      console.log(response.data.jsons);
      if (response.status === 'success') {
        console.log(response.data.jsons);
        return {
          ...state,
          creationDate: response.data.jsons.creation_date,
          id: response.data.jsons.id,
          status: response.data.jsons.status,
          subject: response.data.jsons.subject,
          urgency: response.data.jsons.urgency,
          comments: response.data.jsons.comments,
          text: response.data.jsons.text,
          name: response.data.jsons.name,
          email: response.data.jsons.email,
        };
      } else if (response.status === 'fail') {
        return {
          ...state,
        };
      }
      return state;
    }
    case 'add_comment': {
      console.log(response.data.jsons);
      if (response.status === 'success') {
        console.log(response.data.jsons);
        return {
          ...state,
          creationDate: response.data.jsons.creation_date,
          id: response.data.jsons.id,
          status: response.data.jsons.status,
          subject: response.data.jsons.subject,
          urgency: response.data.jsons.urgency,
          comments: response.data.jsons.comments,
          text: response.data.jsons.text,
          name: response.data.jsons.name,
          email: response.data.jsons.email,
        };
      } else if (response.status === 'fail') {
        return {
          ...state,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

const ticketDetailsManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }

    default:
      return state;
    }
  }

export default ticketDetailsManager;
