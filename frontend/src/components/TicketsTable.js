import React from 'react';
import PropTypes from 'prop-types';
import { Table, Segment, Header,Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const headerMap = [
  { name: 'Nr.', key: 'id' },
  { name: 'Name', key: 'name'},
  { name: 'Email', key: 'email'},
  { name: 'Subject', key: 'subject' },
  { name: 'Ticket Date', key: 'creation_date' },
  { name: 'Urgency', key: 'urgency' },
  { name: 'Status', key: 'status' },
  { name: 'View'}

];

const styles = {
  header: {
    margin: 0
  },
  verticalBlock: {
    height: 10,
  },
  iconDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 30,
  },
  pagination: {
    float: 'right',
    marginBottom: 15,
  },
};

export default class TicketsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [...props.tickets],
      column: null,
      direction: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.tickets !== nextProps.tickets) {
      this.setState({ tickets: [...nextProps.tickets] });
    }
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;
    if (column !== clickedColumn) {
      const sortedData = this.sortTable(clickedColumn);
      this.setState({
        column: clickedColumn,
        tickets: sortedData,
        direction: 'ascending',
      });
    } else {
      this.setState({
        tickets: [...this.state.tickets].reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      });
    }
  }

  sortTable = (clickedColumn) => {
    const tickets = [...this.state.tickets];
    switch (clickedColumn) {
      case 'id':
        tickets.sort((a, b) => a[clickedColumn] - b[clickedColumn]);
        break;
      case 'creation_date':
        tickets.sort((a, b) => {
          const dateA = new Date(a[clickedColumn]);
          const dateB = new Date(b[clickedColumn]);
          if (dateA > dateB) {
            return 1;
          } else if (dateA < dateB) {
            return -1;
          }
          return a.id - b.id;
        });
        break;
      case 'name':
        tickets.sort((a, b) => (
          a[clickedColumn].toLowerCase().localeCompare(b[clickedColumn].toLowerCase())
        ));
        break;
      default:
        break;
    }
    return tickets;
  }

  render = () => {
    const { column, direction, tickets } = this.state;

    return (
      <Segment style={{ padding: 20 }}>
        <Header as='h1' style={styles.header}>Tickets</Header>
        <div style={styles.verticalBlock} />
        <div>
          <div style={styles.pagination}>
            <Pagination
              page={this.props.page}
              itemsPerPage={this.props.itemsPerPage}
              numberOfPages={this.props.numberOfPages}
              onPageChange={this.props.onPageChange}
              onItemsPerPageChange={this.props.onItemsPerPageChange}
            />
          </div>
          <Table textAlign="center" sortable celled>
            <Table.Header >
              <Table.Row>
                {headerMap.map(item => (
                  <Table.HeaderCell
                    key={item.name}
                    sorted={column === item.key ? direction : null}
                    onClick={this.handleSort(item.key)}
                  >
                    {item.name}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tickets.map((ticket) => {
                const date = new Date(ticket.creation_date);
                const dateString = date.toString().slice(4, 24);
                return (
                  <Table.Row key={ticket.id}>
                    <Table.Cell>{ticket.id}</Table.Cell>
                    <Table.Cell>{ticket.name}</Table.Cell>
                    <Table.Cell>{ticket.email}</Table.Cell>
                    <Table.Cell>{ticket.subject}</Table.Cell>
                    <Table.Cell>{dateString}</Table.Cell>
                    <Table.Cell>{ticket.urgency}</Table.Cell>
                    <Table.Cell>{ticket.status}</Table.Cell>
                    <Table.Cell><Button style={{ margin: 'auto' }} as={Link} to={'/ticketdetails/'+ticket.id}>
                      View Ticket
                    </Button></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </Segment>
    );
  }
}

TicketsTable.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    subject: PropTypes.string,
    creation_date: PropTypes.string,
    urgency: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
};
