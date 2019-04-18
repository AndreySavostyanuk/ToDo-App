import React from 'react'
import {TodoList} from "./components/TodoList"
import {TodoItem} from "./components/TodoItem"
import todoData from './data/todoData'
import './App.css';


class App extends React.Component {

  state = {
    text: todoData,
  }


  handleAdd = (data) => {

    const nextText = [data, ...this.state.text]
    this.setState({text: nextText})

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <TodoList data={this.state.text} onAddtext={this.handleAdd}/>

        </header>
      </div>
    );
  }
}

export default App;
