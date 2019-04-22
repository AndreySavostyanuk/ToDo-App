import React from 'react'
import {TodoList} from "./components/TodoList"
import {TodoItem} from "./components/TodoItem"
import todoData from './data/todoData'
import './App.css';


class App extends React.Component {

  state = {
    text: todoData,
      todo: todoData,
  }

  handleAdd = (data , data2) => {
      data2 = data
      console.log('data2',data2)
    const nextText = [data, ...this.state.text]

    this.setState({text: nextText})
      const nextText2 = [data2, ...this.state.todo]
      this.setState({todo: nextText2})

  }

  deleteItem = (id) =>{
      let newData = [...this.state.text] ;
      newData = newData.filter((item)=>{
         return item.id !== id
      })

      this.setState({
         text: newData,
          todo: newData,
      });
  }

  deleteAllItem = () => {
      let newData = [...this.state.text] ;

      let newArray = newData.filter((item)=>{
          return item.active == false
      })

      this.setState({
          text: newArray,
          todo: newArray,
      });
  }

        checkedOne= (id) =>{
            let  newData = [...this.state.text];

           let newArray = newData.map((item) => {
               if (item.id === +id){
                   item.active = !item.active
               }
               return item
            });

            this.setState({
                text: newArray
            })
}

        checkedAll = () =>{
            let  newData = [...this.state.text];

            let newArray = newData.map((item) => {

                   if ( item.active == false ) {
                       item.active = true
                   }
                return item
            });

            this.setState({
                text: newArray
            })
        }

        filterAll = () => {
          let  newData = [...this.state.todo];

           if(newData !== this.state.text)
            {
                this.setState({
                    text: newData,
                })
            }
        }

    filterActive = () => {
        let  newData = [...this.state.text];
        let  newData2 = [...this.state.todo];

        let newArray = newData2.filter((item)=>{
            return item.active == false
        })

        this.setState({
           text: newArray
        })
    }

    filterCompleted = () => {
        let  newData = [...this.state.text];
        let  newData2 = [...this.state.todo];

        let newArray = newData2.filter((item)=>{
            return item.active == true
        })

        this.setState({
           text: newArray,
        })
    }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <TodoList data={this.state.text} data2={this.state.todo} onAddtext={this.handleAdd} filterAll={this.filterAll} filterCompleted={this.filterCompleted}  filterActive={this.filterActive } deleteAllItem={this.deleteAllItem} checkedAll={this.checkedAll} checkedOne={this.checkedOne} onDeleteItem={this.deleteItem}  />
        </header>
      </div>
    );
  }
}

export default App;
