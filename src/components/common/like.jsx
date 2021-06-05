import React, { Component } from "react";

class Like extends Component {
  renderHeart() {
    return this.props.liked ? "fa fa-heart" : "fa fa-heart-o";
  }

  render() {
    return (
      <i
        className={this.renderHeart()}
        onClick={() => this.props.onClick(this.props.id)}
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
