import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    if (path) {
      let sortColumn = { ...this.props.sortColumn };
      if (path === sortColumn.path)
        sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
      else sortColumn = { path, order: "asc" };
      this.props.onSort(sortColumn);
    }
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(c => (
            <th
              className="clickable"
              key={c.path || c.key}
              onClick={() => this.raiseSort(c.path)}
            >
              {c.label} {this.renderSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
