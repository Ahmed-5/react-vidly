import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          onClick={() => this.props.handleLike(movie._id)}
          liked={movie.liked}
        />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.handleDelete(movie._id)}
        type="button"
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { movies } = this.props;
    return (
      <React.Fragment>
        <Table
          data={movies}
          columns={this.columns}
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
        />
      </React.Fragment>
    );
  }
}

export default MoviesTable;
