import React from 'react'
import {TodoList} from "./components/TodoList"
import {TodoItem} from "./components/TodoItem"
import todoData from './data/todoData'
import './App.css';


class App extends React.Component {

    state = {
        text: todoData,
        mode: "All"
    }

    handleAdd = (data) => {


        const nextText = [data, ...this.state.text]

        this.setState({text: nextText})

    }

    modeChange = (mode) => {
        this.setState({
            mode : mode
        })

    }

    deleteItem = (id) =>{
        let newData = [...this.state.text] ;
        newData = newData.filter((item)=>{
            return item.id !== id
        })

        this.setState({
            text: newData,
        });
    }

    deleteAllItem = () => {
        let newData = [...this.state.text] ;

        let newArray = newData.filter((item)=>{
            return item.active == false
        })

        this.setState({
            text: newArray,

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

            if ( item.active === false) {
                item.active = true
            }
            return item
        });

        this.setState({
            text: newArray
        })
    }


    textСhange = (id , text) => {
        let  newData = [...this.state.text];

        let newArray = newData.map((item) => {
            if (item.id === +id){
                item.text = text
            }
            return item
        });

        this.setState({
            text: newArray
        })
    }

    filter = () => {
        let  newData = [...this.state.text];
        let  newArray = []

        if(this.state.mode === 'All'){
            let newArray = newData.filter((item)=>{
                return item
            })
            return newArray
        }

        if(this.state.mode === 'Active'){
            let newArray = newData.filter((item)=>{
                return item.active === false
            })
            return newArray
        }

        if(this.state.mode === 'Completed'){
            let newArray = newData.filter((item)=>{
                return item.active === true
            })
            return newArray
        }


    }


    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <TodoList data={this.filter()} items={this.state.text} data2={this.state.todo} modeChange={this.modeChange} textСhange={this.textСhange} onAddtext={this.handleAdd}  deleteAllItem={this.deleteAllItem} checkedAll={this.checkedAll} checkedOne={this.checkedOne} onDeleteItem={this.deleteItem}  />
                </header>
            </div>
        );
    }
}

export default App;