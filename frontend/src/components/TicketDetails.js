import React from 'react';
import PropTypes from 'prop-types';
import APIService from '../services/APIService';
import { Card, Comment, Dropdown, Header, Form, Button } from 'semantic-ui-react';

const urgency_dropdown_options = [{
  value: 'Low', text: 'Low', key: 'Low',
}, {
  value: 'Medium', text: 'Medium', key: 'Medium',
}, {
  value: 'High', text: 'High', key: 'High',
}];

const status_dropdown_options = [{
  value: 'Open', text: 'Open', key: 'Open',
}, {
  value: 'Closed', text: 'Closed', key: 'Closed',
}, {
  value: 'In Progress', text: 'In Progress', key: 'In Progress',
}, {
  value: 'Rejected', text: 'Rejected', key: 'Rejected',
}];

export default class TicketDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      creationDate: '',
      id: props.id,
      status: '',
      subject: '',
      urgency: '',
      text: '',
      comment: '',
      name: '',
      email: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      comments: [...nextProps.comments],
      creationDate: nextProps.creationDate,
      id: nextProps.id,
      status: nextProps.status,
      subject: nextProps.subject,
      urgency: nextProps.urgency,
      name: nextProps.name,
      email: nextProps.email,
    text: nextProps.text});
  }

  handleUrgencyChange = (event) => {
    const new_urgency = event.target.innerText;
    APIService.sendRequest('change_urgency', {
      ticket_id: this.state.id,
      urgency: new_urgency
    });
  }

  handleStatusChange = (event) => {
    const new_status = event.target.innerText;
    APIService.sendRequest('change_status', {
      ticket_id: this.state.id,
      status: new_status
    });
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  }

  submitComment = () => {
    APIService.sendRequest('add_comment', {
      ticket_id: this.state.id,
      text: this.state.comment
    });

  }


  render = () => {
    const { creationDate,
      id,
      status,
      subject,
      comments,
      urgency,
      name,
      email,
    text,} = this.state;
    const date = new Date(creationDate);
    const dateString = date.toString().slice(4, 24);
    return (
      <div>
        <Card>
          <Card.Content header={subject} />
          <Card.Content header={name} />
          <Card.Content meta={email} />
          <Card.Content meta={dateString} />
          <Card.Content description={text} />
          <Card.Content extra>
            <div>Urgency</div>
            <Dropdown placeholder={urgency} fluid selection options={urgency_dropdown_options} onChange={this.handleUrgencyChange}/>
          </Card.Content>
          <Card.Content extra>
            <div>Status</div>
            <Dropdown placeholder={status} fluid selection options={status_dropdown_options} onChange={this.handleStatusChange}/>
          </Card.Content>
        </Card>
        <Comment.Group>
          <Header as='h3' dividing>Comments</Header>
          {comments.map((comment) => {
            const date = new Date(comment.date);
            const dateString = date.toString().slice(4, 24);
            return (
              <Comment>
                <Comment.Content>
                  <Comment.Author as='a'>{comment.user}</Comment.Author>
                  <Comment.Metadata>
                    <div>{dateString}</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })}
          <Form reply>
            <Form.TextArea onChange={this.handleCommentChange}/>
            <Button content='Add Comment' labelPosition='left' icon='edit' primary onClick={this.submitComment}/>
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

TicketDetails.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    text: PropTypes.string,
    user: PropTypes.string,
  })).isRequired,
};
