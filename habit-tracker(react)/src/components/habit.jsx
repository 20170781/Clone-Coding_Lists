import React, { PureComponent } from "react";

class Habit extends PureComponent {
  callIncrement = () => {
    this.props.onIncrement(this.props.habit);
  };
  callDecrement = () => {
    this.props.onDecrement(this.props.habit);
  };
  callDelete = () => {
    this.props.onDelete(this.props.habit);
  };

  render() {
    const { name, count } = this.props.habit;
    return (
      <li className="habit">
        <span className="habit-name">{name}</span>
        <span className="habit-count">{count}</span>
        <button
          className="habit-button habit-increase"
          onClick={this.callIncrement}
        >
          <i className="far fa-plus-square"></i>
        </button>
        <button
          className="habit-button habit-decrease"
          onClick={this.callDecrement}
        >
          <i className="far fa-minus-square"></i>
        </button>
        <button className="habit-button habit-delete" onClick={this.callDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </li>
    );
  }
}

export default Habit;
