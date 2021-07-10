import React, { Component } from "react";
import Habit from "./habit";

class Habits extends Component {
  state = {
    habits_li: [
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 0 },
    ],
  };

  //argument habit은 habit.jsx에서 this.props.habit이다.
  //habits의 handle함수와 habit의 handle함수는 다르다.
  handleIncrement = (habit) => {
    const habits_cp = [...this.state.habits_li];
    const index = habits_cp.indexOf(habit);
    habits_cp[index].count++;
    this.setState({ habits_li: habits_cp });
  };
  handleDecrement = (habit) => {
    const habits_cp = [...this.state.habits_li];
    const index = habits_cp.indexOf(habit);
    const count = habits_cp[index].count - 1;
    habits_cp[index].count = count < 0 ? 0 : count;
    this.setState({ habits_li: habits_cp });
  };
  handleDelete = (habit) => {
    const habits_cp = this.state.habits_li.filter(
      (item) => item.id !== habit.id
    );
    console.log(habits_cp);
    this.setState({ habits_li: habits_cp });
  };

  render() {
    return (
      <ul>
        {this.state.habits_li.map((habit) => (
          <Habit
            key={habit.id}
            habit={habit}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        ))}
      </ul>
    );
  }
}

export default Habits;
