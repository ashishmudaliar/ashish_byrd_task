import React from 'react';
import { connect } from 'react-redux';
import TicketForm from '../components/TicketForm';
import AuthService from '../services/AuthService';


class MainPage extends React.Component {

  render() {
    return (
      <div>
        <TicketForm
          register={AuthService.submit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.auth,
});

export default connect(mapStateToProps)(MainPage);
