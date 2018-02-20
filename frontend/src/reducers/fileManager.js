import * as types from '../constants/actions';

const initialState = {
  tickets: [],
  paginatedTickets: [],
  numberOfPages: -1,
  page: 1,
  itemsPerPage: 5,
};

const getPaginatedTickets = (array, page, itemsPerPage) => {
  const sortedArray = [...array.sort((a, b) => (a.fileId - b.fileId))];
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const slicedArray = [...sortedArray.slice(start, end)];
  return slicedArray;
};

const handleResponse = (response, state) => {
  switch (response.type) {
    case 'get_tickets': {
      if (response.status === 'success') {
        const array = [...response.data.jsons];
        const numberOfPages = Math.ceil(array.length / state.itemsPerPage);
        const paginatedTickets = getPaginatedTickets(array, state.page, state.itemsPerPage);
        return {
          ...state,
          tickets: response.data.jsons,
          paginatedTickets,
          numberOfPages,
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

const handleRequest = (request, state) => {
  switch (request.type) {
    case 'get_tickets': {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

const fileManager = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.RECEIVE_RESPONSE: {
      return handleResponse(action.response, state);
    }
    case types.SEND_REQUEST: {
      return handleRequest(action.request, state);
    }
    case types.UPDATE_PAGE_NUMBER: {
      const paginatedTickets = getPaginatedTickets(state.tickets, action.page, state.itemsPerPage);
      return {
        ...state,
        paginatedTickets,
        page: action.page,
      };
    }
    case types.UPDATE_ITEMS_PER_PAGE: {
      const numberOfPages = Math.ceil(state.tickets.length / action.itemsPerPage);
      const paginatedTickets = getPaginatedTickets(state.tickets, 1, action.itemsPerPage);
      return {
        ...state,
        page: 1,
        numberOfPages,
        itemsPerPage: action.itemsPerPage,
        paginatedTickets,
      };
    }
    default:
      return state;
  }
};

export default fileManager;
