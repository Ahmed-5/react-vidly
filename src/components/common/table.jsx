import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
  render() {
    const { onSort, columns, sortColumn, data } = this.props;
    return (
      <table key="table" className="table table-light">
        <TableHeader
          onSort={onSort}
          columns={columns}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
