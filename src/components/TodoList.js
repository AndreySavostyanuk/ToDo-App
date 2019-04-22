import React, {Component} from "react"
import {TodoItem} from "./TodoItem"

class TodoList extends Component {

    state = {
        text: '',
    }

 renderText = () => {
     const { data } = this.props
     let textTemplate = null

     if (data.length) {
         textTemplate = data.map((item) => {
             return <TodoItem key={item.id} data={item} active={item.active} display={item.display} checkedOne={this.props.checkedOne} onDelete={this.props.onDeleteItem} />
         })
     }
     console.log("12",data);
     return textTemplate

 }

 onBtnClickHandler = () => {
       this.props.deleteAllItem()
 }

 _handleKeyDown = (e) => {

     if (e.key === 'Enter') {
         e.preventDefault()
         const {text} = this.state


         if(text.trim() == false){
             return alert("необходимо что нибудь ввести")
         } else {
             this.props.onAddtext({
                 id: +new Date(),
                 text,
                 active: false,
                 display: 'displayNone'
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

 render() {
     const{text2} = this.props
     const{data} = this.props
     const{data2} = this.props
    console.log('сообщение',data2)
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
                     value={text2}
                     onKeyDown={this._handleKeyDown}
                 />
             </div>

             {this.renderText()}

             {data2.length  ?
                 <div
                     className='footerItems'>

                     <span className={'text__count'}>
                         {
                             data.length ?
                                 <p className={'text__count'}>selected tasks: {data.length}</p> : null
                         }
                     </span>

                     <ul
                         className='spisokItems'>
                         <li onClick={this.props.filterAll}>All</li>
                         <li onClick={this.props.filterActive}>Active</li>
                         <li onClick={this.props.filterCompleted}>Completed</li>
                     </ul>

                     <button
                         className="button"
                         onClick={this.onBtnClickHandler}
                         disabled={!this.validate}>
                         Clear
                     </button>

                 </div>
              : null}
         </div>
     )
 }
}

export {TodoList}