import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Segment, Button, Form, Input,TextArea,Dropdown } from 'semantic-ui-react';

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

const dropdown_options = [{
  value: 'Low', text: 'Low', key: 'Low',
}, {
  value: 'Medium', text: 'Medium', key: 'Medium',
}, {
  value: 'High', text: 'High', key: 'High',
}];

export default class TicketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      subject: '',
      email: '',
      message: '',
      urgency: '',
      error: props.error
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubjectChange = (event) => {
    this.setState({ subject: event.target.value });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handleUrgencyChange = (event) => {
    this.setState({ urgency: event.target.innerText });
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  }

  submit = () => {
    const { subject, name, email, urgency, message } = this.state;

    if (email !== '' && name !== '' && subject !== '' && message !== '') {
      const validEmail = this.validateEmail(email);
        if (validEmail) {
        this.props.register(subject, name, email, urgency, message);
      } else {
        this.setState({ error: 'Please enter a valid email address' });
      }
    } else {
      this.setState({ error: 'Please fill out all fields' });
    }
  }

  validateEmail = (email) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  render() {
    const { error } = this.state;
    const errorVisibility = error !== '';

    return (
      <div style={styles.container}>
        <Segment>
          <Button style={{ margin: 'auto' }} as={Link} to='/login'>
            Login
          </Button>
          <div style={styles.title}>
            ASHISH BYRD PROJECT<br/>
            CREATE TICKET
          </div>
          <Form error={errorVisibility} style={styles.form}>
            <Form.Group>
              <Form.Field control={Input} label="Email" onChange={this.handleEmailChange} />
            </Form.Group>
            <Form.Group>
              <Form.Field control={Input} label="Name" onChange={this.handleNameChange} />
            </Form.Group>
            <Form.Group>
              <Form.Field control={Dropdown} options={dropdown_options} fluid selection label="Urgency" onChange={this.handleUrgencyChange} />
            </Form.Group>
            <Form.Group>
              <Form.Field control={Input} label="Subject" onChange={this.handleSubjectChange} />
            </Form.Group>
            <Form.Group>
              <Form.Field control={TextArea} label="Message" onChange={this.handleMessageChange} />
            </Form.Group>
            <Form.Group>
              <Button secondary={true} style={{ margin: 'auto' }} onClick={this.submit}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

TicketForm.propTypes = {
  error: PropTypes.string,
  register: PropTypes.func.isRequired,
};

TicketForm.defaultProps = {
  error: '',
};
