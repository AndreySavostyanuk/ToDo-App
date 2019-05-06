import React from 'react'
import 'react-toastify/dist/ReactToastify.min.css'
import {toast} from 'react-toastify';
import axios from "axios";

class TodoItem extends React.Component {
    state = {
        forEdit: false,
        text: this.props.data.text
    }

    handleCheckboxChange = e => {
        this.props.checkedOne(e.currentTarget.id, e.currentTarget.checked);
    };

    validate = () => {
        if (this.props.active === true) {
        }
        ;
        return false;
    };

    handler = () => {
        const {data: {id}} = this.props;

        this.props.onDelete(id);
    };

    inputChange = () => {
        this.setState({
            forEdit: !this.state.forEdit
        });
    };

    inputHandler = e => {
        this.setState({
            text: e.currentTarget.value
        });
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {

            let id = e.currentTarget.id;

            axios
                .put(`http://localhost:3000/todoList/text/${id}`, {
                    "text": e.currentTarget.value
                })
                .then(response => {
                    this.setState({
                        text: response.data
                    })
                })
                .catch(error => {
                    console.log(error);
                });


            toast.success('text has been changed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            this.setState({
                forEdit: !this.state.forEdit
            });
        }
        ;
    };

    render() {

        return (
            <div className='todo-item'>

                <input
                    name="completed"
                    className='checkbox'
                    type="checkbox"
                    checked={this.props.active}
                    onChange={this.handleCheckboxChange}
                    id={this.props.data.id}/>
                <label htmlFor={this.props.data.id}></label>
                <input
                    id={this.props.data.id}
                    onChange={this.inputHandler}
                    onKeyDown={this.handleKeyDown}
                    value={this.state.text}
                    type="text"
                    name='input'
                    readOnly={this.state.forEdit}
                    onDoubleClick={this.inputChange}
                    defaultChecked={this.validate}
                    className={this.props.active === true ? 'text__changed' : 'text__text'}/>
                <img onClick={this.handler}
                     src='https://avatanplus.com/files/resources/original/59032f6a1d07b15bb4713687.png'
                     alt=''
                     className='image'/>
            </div>
        )
    };
};

export {TodoItem};

