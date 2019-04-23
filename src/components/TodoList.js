import React, {Component} from "react"
import {TodoItem} from "./TodoItem"

class TodoList extends Component {

    state = {
        text: '',
        currentList: 'All'
    }

    renderText = () => {
        const { data } = this.props
        let textTemplate = null

        if (data.length) {
            textTemplate = data.map((item) => {
                return <TodoItem key={item.id} data={item} active={item.active} changeText={this.props.textСhange}  checkedOne={this.props.checkedOne} onDelete={this.props.onDeleteItem} />
            })
        }

        return textTemplate

    }

    onBtnClickHandler = () => {
        this.props.deleteAllItem()
    }

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.currentTarget.value = ""
            const {text} = this.state

            if(text.trim() == false){
                return alert("необходимо что нибудь ввести")
            } else {
                this.props.onAddtext({
                    id: +new Date(),
                    text,
                    active: false,
                })
            }
        }
    }

    validate = () => {
        const { text, agree } = this.state
        if (text.trim() && agree) {
            return true
        }
        return false
    }

    handleChandge = (e) =>{
        const  {id, value } = e.currentTarget
        this.setState({ [id]: value })
    }

    arrowCheck = () => {
        this.props.checkedAll()
    }

    isActive = (e) =>{

        console.log("current",  e.currentTarget.innerHTML )



        this.state.currentList = e.currentTarget.innerHTML

        this.props.modeChange(e.currentTarget.innerHTML)



    }

    render() {
        const{text, data, items} = this.props


        return (
            <div className="todo-list">
                <div className="header">
                    { data.length ?
                        <img src="https://image.flaticon.com/icons/png/512/25/25623.png" className="image__arrow"  onClick={this.arrowCheck}/>
                        : null}
                    <input
                        id='text'
                        type='text'
                        onChange={this.handleChandge}
                        className="text"
                        placeholder='Enter a task'
                        value={text}
                        onKeyDown={this._handleKeyDown}
                    />
                </div>

                {this.renderText()}

                {items.length  ?
                    <div
                        className='footerItems'>

                     <span className={'text__count'}>
                         {
                             data.length ?
                                 <p className={'text__count'}>{data.length} items left </p> : null
                         }
                     </span>

                        <ul
                            className='spisokItems'>
                            <li className={this.state.currentList === 'All' ? 'All' : ''} onClick={this.isActive} value='All' >All</li>
                            <li className={this.state.currentList === 'Active' ? 'Active' : ''} onClick={this.isActive} value='Active' >Active</li>
                            <li className={this.state.currentList === 'Completed' ? 'Completed' : ''} onClick={this.isActive} value='Completed' >Completed</li>
                        </ul>

                        <p
                            className="button"
                            onClick={this.onBtnClickHandler}
                            disabled={!this.validate}>
                            Clear completed
                        </p>

                    </div>
                    : null}
            </div>
        )
    }
}

export {TodoList}