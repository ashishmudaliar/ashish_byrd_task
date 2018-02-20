import React from 'react';
import { connect } from 'react-redux';
import APIService from '../services/APIService';
import TicketsTableContainer from '../containers/TicketsTableContainer';
import { Grid } from 'semantic-ui-react';

const styles = {
  main: {
    padding: 20,
  }
};

class TicketPage extends React.Component {

  componentWillMount() {
    this.authenticationCheck(this.props);
    this.getTickets();
  }

  componentWillReceiveProps = (nextProps) => {
    const { authenticated } = this.props.auth;
    if (authenticated !== nextProps.auth.authenticated) {
      this.authenticationCheck(nextProps);
    }
  }

  getTickets = () => {
    APIService.sendRequest('get_tickets');
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
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <TicketsTableContainer />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  state: state.auth,
});

export default connect(mapStateToProps)(TicketPage);
