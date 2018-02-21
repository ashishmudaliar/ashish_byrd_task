import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Segment, Button, Form, Input, Message } from 'semantic-ui-react';

const styles = {
  container: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%, -50%)'
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    margin: 25,
    fontSize: 25,
    lineHeight: 1.2,
    fontWeight: 'bold',
  },
};

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: props.error
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  login = () => {
    const { username, password } = this.state;

    this.props.login(username, password);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.error !== '') {
      this.setState({ error: nextProps.error });
    }
  }

  render() {
    const { error } = this.state;
    const errorVisibility = error !== '';

    return (
      <div style={styles.container}>
        <Segment>
          <div style={styles.title}>ASHISH BYRD TASK</div>
          <Form error={errorVisibility} style={styles.form}>
            <Form.Group>
              <Form.Field control={Input} label="Username" onChange={this.handleUsernameChange} />
            </Form.Group>
            <Form.Group>
              <Form.Field control={Input} type="password" label="Password" onChange={this.handlePasswordChange} />
            </Form.Group>
            <Message style={{ width: 180 }} error content={error} />
            <Form.Group>
              <Button secondary={true} style={{ margin: 'auto' }} onClick={this.login}>
                Log in
              </Button>
            </Form.Group>
            <Form.Group>
              <Button style={{ margin: 'auto' }} as={Link} to='/'>
                Add Ticket
              </Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

LoginForm.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  error: '',
};
