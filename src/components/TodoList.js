import React, {Component} from "react"
import {TodoItem} from "./TodoItem"
import { toast } from 'react-toastify';

class TodoList extends Component {

    state = {
        text:'',
        currentList: 'All',
        arrow: true,
    }

    renderText = () => {
        const { data } = this.props
        let textTemplate = null

        if (data.length) {
            textTemplate = data.map((item) => {
                return <TodoItem
                    key={item.id}
                    data={item}
                    active={item.active}
                    changeText={this.props.textСhange}
                    checkedOne={this.props.checkedOne}
                    onDelete={this.props.onDeleteItem} />
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
                toast.success("task added", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                this.props.onAddtext({
                    id: +new Date(),
                    text,
                    active: false,
                })
            }

            this.setState({
                text : ''
            })
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
        const {arrow} = this.state



        if (this.state.arrow === false){
             this.setState({
                 arrow: true
             })
        } else if (this.state.arrow === true) {
            this.setState({
                arrow: false
            })
        }

        this.props.checkedAll(arrow)
    }

    isActive = (e) =>{
        this.state.currentList = e.currentTarget.innerHTML
        this.props.modeChange(e.currentTarget.innerHTML)
    }

    arrowChange= () => {
        if(this.state.arrow === true  ) {
            return "image__arrow"
        } else {
           return  "image__arrow_active"
        }
    }

    clearChange = () => {
        const { data } = this.props
            let textTemplate = data.filter((item) => {
               return  item.active === true
            })

        if(textTemplate.length) {
            return true
        }
    }

    render() {
        const{text, data, items} = this.props

        return (
            <div className="todo-list">
                <div className="header">
                    { data.length ?
                        <img src="https://www.tjonline.ru/delivery/img/down.png"
                             className={this.arrowChange()}
                             onClick={this.arrowCheck}/>
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
                                className={this.clearChange() === true ? "spisokItems" : "spisokItems2"}>
                                <li className={this.state.currentList === 'All' ? 'All' : ''}
                                    onClick={this.isActive}
                                    value='All'>
                                    All
                                </li>
                                <li className={this.state.currentList  === 'Active' ? 'Active' : ''}
                                    onClick={this.isActive}
                                    value='Active'>
                                    Active
                                </li>
                                <li className={this.state.currentList === 'Completed' ? 'Completed' : ''}
                                    onClick={this.isActive}
                                    value='Completed'>
                                    Completed
                                </li>
                            </ul>

                        { this.clearChange() === true ?
                            <p
                                className="button"
                                onClick={this.onBtnClickHandler}
                                disabled={!this.validate}>
                                Clear completed
                            </p>
                        : null}

                    </div>
                    : null}
            </div>
        )
    }
}

export {TodoList}