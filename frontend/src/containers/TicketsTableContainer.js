import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TicketsTable from '../components/TicketsTable';
import APIService from '../services/APIService';
import * as fileManagerActions from '../actions/fileManagerActions';

class TicketsTableContainer extends React.Component {
  componentWillMount = () => {
    this.getTickets();
  }

  getTickets = () => {
    APIService.sendRequest('get_tickets');
  }

  handlePageClick = (page) => {
    this.props.actions.updatePageNumber(page);
  }

  handleItemsPerPageClick = (itemsPerPage) => {
    this.props.actions.updateItemsPerPage(itemsPerPage);
  }

  render() {
    const {
      paginatedTickets,
      numberOfPages,
      itemsPerPage,
      page,
    } = this.props.fileManager;
    return (
      <TicketsTable
        tickets={paginatedTickets}
        page={page}
        numberOfPages={numberOfPages}
        itemsPerPage={itemsPerPage}
        onPageChange={this.handlePageClick}
        onItemsPerPageChange={this.handleItemsPerPageClick}
      />);
  }
}

const mapStateToProps = state => ({
  fileManager: state.fileManager,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(fileManagerActions, dispatch),
});

TicketsTableContainer.propTypes = {
  fileManager: PropTypes.shape({
    paginatedTickets: PropTypes.array,
    numberOfPages: PropTypes.number,
    page: PropTypes.number,
    itemsPerPage: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsTableContainer);
