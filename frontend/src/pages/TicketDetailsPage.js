import React from 'react';
import { connect } from 'react-redux';
import APIService from '../services/APIService';
import TicketDetailsContainer from '../containers/TicketDetailsContainer'


const styles = {
  main: {
    padding: 20,
  }
};

class TicketDetailsPage extends React.Component {
  componentWillMount() {
    this.authenticationCheck(this.props);
    this.getTicketDetails(this.props.location.pathname);
  }

  componentWillReceiveProps = (nextProps) => {
    // const { authenticated } = this.props.auth;
    // if (authenticated !== nextProps.auth.authenticated) {
      this.authenticationCheck(nextProps);
    // }
  }

  getTicketDetails = (path) => {
    const pathSplit = path.split("/")
    console.log(pathSplit[2]);
    APIService.sendRequest('get_ticket_data', {
      ticket_id: pathSplit[2],
    });
  }

  authenticationCheck = (props) => {
    const { state, history, location } = props;
    console.log(state.authenticated)
    if (!state.authenticated) {
      const { from } = location.state || { from: { pathname: '/login' } };
      history.replace(from);
    }
  }

  render() {
    return (
      <div style={styles.main}>
        <TicketDetailsContainer />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state: state.auth,
});

export default connect(mapStateToProps)(TicketDetailsPage);
