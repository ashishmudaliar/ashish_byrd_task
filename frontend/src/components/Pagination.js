import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'semantic-ui-react';

const itemsPerPageOptions = [
  { key: '5', value: 5, text: '5' },
  { key: '25', value: 25, text: '25' },
  { key: '50', value: 50, text: '50' },
  { key: '100', value: 100, text: '100' },
];

class Pagination extends React.Component {
  goToFirst = () => this.props.onPageChange(1)

  goToPrevious = () => this.props.onPageChange(this.props.page - 1)

  goToNext = () => this.props.onPageChange(this.props.page + 1)

  goToLast = () => this.props.onPageChange(this.props.numberOfPages)

  generatePages = () => {
    const { page, numberOfPages } = this.props;
    let startPage = page - 2;
    startPage = startPage < 1 ? 1 : startPage;
    let endPage = page + 2;
    endPage = endPage > numberOfPages ? numberOfPages : endPage;
    const pagesItems = [];

    for (let i = startPage; i <= endPage; i++) {
      const name = i.toString();

      pagesItems.push(
        <Menu.Item
          name={name}
          key={i}
          active={this.props.page === (i)}
          onClick={() => this.props.onPageChange(i)}
        />,
      );
    }

    if ((numberOfPages - endPage) > 1) {
      pagesItems.push(<Menu.Item key={1000} disabled content="..." />);
    }

    if ((numberOfPages - endPage) > 0) {
      pagesItems.push(
        <Menu.Item
          name={numberOfPages.toString()}
          key={2000}
          active={this.props.page === (numberOfPages)}
          onClick={() => this.props.onPageChange(numberOfPages)}
        />,
      );
    }

    return pagesItems;
  }

  render() {
    const { itemsPerPage, numberOfPages } = this.props;
    return (
      <Menu pagination>
        <Menu.Item
          disabled={this.props.page === 1}
          content="<<"
          onClick={this.goToFirst}
        />
        <Menu.Item
          disabled={this.props.page === 1}
          content="<"
          onClick={this.goToPrevious}
        />
        {this.generatePages()}
        <Menu.Item
          disabled={this.props.page === numberOfPages}
          content=">"
          onClick={this.goToNext}
        />
        <Menu.Item
          disabled={this.props.page === numberOfPages}
          content=">>"
          onClick={this.goToLast}
        />
        <Menu.Item> {'Items per page:'} </Menu.Item>
        <Dropdown
          value={itemsPerPage}
          options={itemsPerPageOptions}
          onChange={(event, data) => { this.props.onItemsPerPageChange(data.value); }}
          className="link item"
        />
      </Menu>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  numberOfPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;
