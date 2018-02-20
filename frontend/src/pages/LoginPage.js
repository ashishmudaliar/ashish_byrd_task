import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import AuthService from '../services/AuthService';

class LoginPage extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.authenticationCheck(nextProps);
  }

  authenticationCheck = (props) => {
    const { state, history, location } = props;
    if (state.authenticated) {
      const { from } = location.state || { from: { pathname: '/tickets' } };
      history.replace(from);
    }
  }

  render() {
    const { state } = this.props;

    return (
      <div>
        <LoginForm
          login={AuthService.login}
          error={state.authenticationError}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.auth,
});

export default connect(mapStateToProps)(LoginPage);
