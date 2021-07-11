import React, { Component } from "react";
import "./app.css";
import Navbar from "./components/navbar";
import Habits from "./components/habits";

class App extends Component {
  state = {
    habits_li: [
      { id: 1, name: "Reading", count: 0 },
      { id: 2, name: "Running", count: 0 },
      { id: 3, name: "Coding", count: 0 },
    ],
  };

  //state는 직접 변경x, 그저 id 같은지 확인용
  handleIncrement = (habit) => {
    const habits_cp = this.state.habits_li.map((item) => {
      // item: 기존, habit: 새로운
      if (item.id === habit.id) {
        return { ...habit, count: habit.count + 1 };
      }
      return item;
    });
    this.setState({ habits_li: habits_cp });
  };

  handleDecrement = (habit) => {
    const habits_cp = this.state.habits_li.map((item) => {
      if (item.id === habit.id) {
        const count = habit.count - 1;
        return { ...habit, count: count < 0 ? 0 : count };
      }
      return item;
    });
    this.setState({ habits_li: habits_cp });
  };

  handleDelete = (habit) => {
    const habits_cp = this.state.habits_li.filter(
      (item) => item.id !== habit.id
    );
    this.setState({ habits_li: habits_cp });
  };

  handleAdd = (name) => {
    const habits_cp = [
      ...this.state.habits_li,
      { id: Date.now(), name, count: 0 },
    ];
    this.setState({ habits_li: habits_cp });
  };

  handleReset = () => {
    const habits_cp = this.state.habits_li.map((habit) => {
      if (habit.count !== 0) {
        return { ...habit, count: 0 };
      }
      return habit;
    });
    this.setState({ habits_li: habits_cp });
  };

  render() {
    return (
      <>
        <Navbar
          totalCount={
            this.state.habits_li.filter((item) => item.count > 0).length
          }
        />
        <Habits
          habits_li={this.state.habits_li}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
          onDelete={this.handleDelete}
          onAdd={this.handleAdd}
          onReset={this.handleReset}
        />
      </>
    );
  }
}

export default App;
