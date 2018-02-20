import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TicketDetails from '../components/TicketDetails';

class TicketsDetailsContainer extends React.Component {
  render() {
    const {
      creationDate,
      id,
      status,
      subject,
      comments,
      urgency,
      text,
      name,
      email,
    } = this.props.ticketDetailsManager;
    return (
      <TicketDetails
        creationDate={creationDate}
        id={id}
        status={status}
        subject={subject}
        comments={comments}
        urgency={urgency}
        text={text}
        name={name}
        email={email}
      />);
  }
}

const mapStateToProps = state => ({
  ticketDetailsManager: state.ticketDetailsManager,
});

TicketsDetailsContainer.propTypes = {
  ticketDetailsManager: PropTypes.shape({
    creationDate : PropTypes.string,
    id: PropTypes.number,
    status: PropTypes.string,
    subject: PropTypes.string,
    comments: PropTypes.array,
    urgency: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(TicketsDetailsContainer);
