import React from 'react'
import {TodoList} from "./components/TodoList"
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {toast} from 'react-toastify';
import axios from "axios";

class App extends React.Component {

    state = {
        text: "",
        mode: "All"
    }

    handleData = () => {
        axios
            .get('http://localhost:3000/todoList')
            .then(response => {
                this.setState({
                    text: response.data
                });
            })
            .catch(error => {
                console.log(error)
            });
    };

    handleAdd = (data) => {
        const nextText = [data, ...this.state.text];

        this.setState({
            text: nextText
        });
    };

    modeChange = (mode) => {
        this.setState({
            mode: mode
        });
    };

    deleteItem = (id) => {
        axios
            .delete(`http://localhost:3000/todoList/${id}`)
            .then(response => {
                this.setState({
                    text: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });

        toast.error('task deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });

    };

    deleteAllItem = () => {
        axios
            .delete('http://localhost:3000/todoList')
            .then(response => {
                this.setState({
                    text: response.data
                });

                toast.error('All task deleted', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    checkedOne = (id, active) => {
        axios
            .put(`http://localhost:3000/todoList/${id}`, {
                "active": !!active
            })
            .then(response => {
                this.setState({
                    text: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    checkedAll = (arrow) => {
        if (arrow === true) {
            toast.info('all task are marked!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            axios
                .put('http://localhost:3000/todoList', {
                    "active": arrow
                })
                .then(response => {
                    this.setState({
                        text: response.data
                    })
                })
                .catch(error => {
                    console.log(error);
                });

        } else {
            toast.info('Removed mark of all task', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            axios
                .put('http://localhost:3000/todoList', {
                    "active": !!arrow
                })
                .then(response => {
                    this.setState({
                        text: response.data
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        }
        ;

    };

    textChange = (id, text) => {
        let newData = [...this.state.text];

        let newArray = newData.map((item) => {
            if (item.id === +id) {
                item.text = text
            }
            ;
            return item;
        });

        this.setState({
            text: newArray
        });
    };

    filter = () => {
        let newData = [...this.state.text];


        if (this.state.mode === 'All') {
            let newArray = newData.filter((item) => {
                return item;
            });
            return newArray;
        }
        ;

        if (this.state.mode === 'Active') {

            let newArray = newData.filter((item) => {
                return item.active === false
            });

            return newArray;
        }
        ;

        if (this.state.mode === 'Completed') {

            let newArray = newData.filter((item) => {
                return item.active === true;
            });

            return newArray;
        }
        ;
    };

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover/>
                    <p className="todos">todos</p>
                    <TodoList
                        data={this.filter()}
                        items={this.state.text}
                        handleData={this.handleData()}
                        modeChange={this.modeChange}
                        textChange={this.textChange}
                        onAddtext={this.handleAdd}
                        deleteAllItem={this.deleteAllItem}
                        checkedAll={this.checkedAll}
                        checkedOne={this.checkedOne}
                        onDeleteItem={this.deleteItem}/>
                </header>
            </div>
        );
    };
};

export default App;

