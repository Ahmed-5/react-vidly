import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  renderCurrentPage = p => {
    return p === this.props.currentPage ? "page-item active" : "page-item";
  };
  renderPagesLinks = () => {
    let arr = [];
    for (let i = 0; i * this.props.pageSize < this.props.itemsCount; i++)
      arr.push(i + 1);
    if (arr.length === 1) return null;
    return arr.map(i => {
      return (
        <li key={i} className={this.renderCurrentPage(i)}>
          <span
            onClick={() => this.props.onPageChange(i)}
            className="page-link"
          >
            {i}
          </span>
        </li>
      );
    });
  };

  render() {
    return (
      <nav aria-label="...">
        <ul className="pagination pagination-md">{this.renderPagesLinks()}</ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
