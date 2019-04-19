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


  deleteItem = (id) =>{
      console.log("2")
      let newData = [...this.state.text] ;
      newData = newData.filter((item)=>{
         return item.id !== id
      })
      console.log("gg", newData )
      this.setState({
         text: newData
      });
  }

    checkedAll = () => {
      console.log("hiii")
        this.state.text.map(item =>{
            console.log(item)
        })
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <TodoList data={this.state.text} onAddtext={this.handleAdd} onDeleteItem={this.deleteItem} checked={this.checkedAll} />
        </header>
      </div>
    );
  }
}

export default App;
