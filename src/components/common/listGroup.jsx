import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    let {
      genres,
      selectedItem,
      textProperty,
      valueProperty,
      onItemSelect
    } = this.props;
    return (
      <ul className="list-group">
        {genres.map(g => (
          <li
            key={g[valueProperty]}
            className={
              selectedItem === g[textProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => onItemSelect(g[textProperty])}
          >
            {g[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
