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

       // e.currentTarget.className = e.currentTarget.innerHTML;

        this.state.currentList = e.currentTarget.innerHTML

        if(e.currentTarget.innerHTML === 'All'){
            this.props.filterAll()
        }
        if(e.currentTarget.innerHTML === 'Active'){
            this.props.filterActive()
        }
        if(e.currentTarget.innerHTML === 'Completed'){
            this.props.filterCompleted()
        }

    }

 render() {
     const{text2, data, data2} = this.props

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
                         Clear 
                     </p>

                 </div>
              : null}
         </div>
     )
 }
}

export {TodoList}