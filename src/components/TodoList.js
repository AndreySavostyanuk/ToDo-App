import React, {Component} from "react"
import {TodoItem} from "./TodoItem"

class TodoList extends Component {

    state = {
        text: '',
    }

    renderText = () => {
        const { data } = this.props
        let textTemplate = null

        console.log("data при рендере" , data)

        if (data.length) {
            textTemplate = data.map(function (item) {
                return <TodoItem key={item.id} data={item} />
            })
        } else {
            textTemplate = <p>К сожалению задач нет</p>
        }

        return textTemplate

    }

    onBtnClickHandler = e => {
        e.preventDefault()
        const {text} = this.state

        console.log("что это 2 ", text)
        this.props.onAddtext({
            id: +new Date(),
            text,
        })

    }


    handleChandge = (e) =>{
        const  {id, value } = e.currentTarget
        console.log("что это", value)
        this.setState({ [id]: value })
    }

    render() {
        const{text2} = this.props
        const{data} = this.props
        const completedStyle = {
            fontStyle: "italic",
            color: "#cdcdcd",
            textDecoration: "line-through"
        }
        return (
            <div className="todo-list">
                <input
                    id='text'
                    type='text'
                    onChange={this.handleChandge}
                    className="text"
                    placeholder='Введите задачу'
                    value={text2}

                />

                {this.renderText()}

                <div
                    className='footerItems'>

                        <strong className={'text__count'}>
                            {
                                data.length ? <strong className={'text__count'}>Всего задач: {data.length}</strong> : null
                            }
                        </strong>

                    <ul
                        className='spisokItems'>
                        <li>All</li>
                        <li>Active</li>
                        <li>Completed</li>
                    </ul>

                    <button
                        className="button"
                        onClick={this.onBtnClickHandler}>
                        Add</button>

                    </div>
            </div>
        )
    }
}


export {TodoList}