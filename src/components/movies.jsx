import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./searchBox";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    genres: [],
    selectedGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleLike = id => {
    let movies = [...this.state.movies];
    let [movie] = this.state.movies.filter(m => m._id === id);
    movie.liked = !movie.liked;
    this.setState({
      movies
    });
  };

  handleGenreSelect = genre => {
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async id => {
    const originalMovies = this.state.movies;
    this.setState({
      movies: originalMovies.filter(m => m._id !== id)
    });

    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: "All Genres",
      currentPage: 1
    });
  };

  getPageData = () => {
    let movies = this.state.movies;
    const {
      selectedGenre: genre,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery
    } = this.state;
    if (searchQuery) {
      movies = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      movies =
        genre === "All Genres"
          ? movies
          : movies.filter(m => m.genre.name === genre);
    }
    const count = movies.length;
    movies = _.orderBy(movies, [sortColumn.path], [sortColumn.order]);
    movies = movies.slice(
      (currentPage - 1) * pageSize,
      (currentPage - 1) * pageSize + pageSize
    );
    return { count, movies };
  };

  render() {
    const { user } = this.props;
    if (this.state.movies.length === 0) return <h1>There are no movies</h1>;
    let { count, movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={this.state.genres}
            selectedItem={this.state.selectedGenre}
            textProperty="name"
            valueProperty="_id"
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New movie
            </Link>
          )}
          {count === 0 ? (
            <h1>There are no movies</h1>
          ) : (
            <React.Fragment>
              <h1>There are {count} movies.</h1>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
              <MoviesTable
                movies={movies}
                currentPage={this.state.currentPage}
                pageSize={this.state.pageSize}
                handleLike={this.handleLike}
                handleDelete={this.handleDelete}
                onSort={this.handleSort}
                sortColumn={this.state.sortColumn}
              />
              <Pagination
                itemsCount={count}
                pageSize={this.state.pageSize}
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default Movies;
