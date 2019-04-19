import React, {Component} from "react"
import {TodoItem} from "./TodoItem"

class TodoList extends Component {

    state = {
        text: '',
        id:'',
        active:'',
    }


 renderText = () => {
     console.log("text", this.props)
     const { data } = this.props
     let textTemplate = null

     console.log("data при рендере" , data)

     if (data.length) {
         textTemplate = data.map((item) => {
             return <TodoItem key={item.id} data={item} onDelete={this.props.onDeleteItem} checkBoxChange={this.props.checkBoxChange} />
         })
     }

     return textTemplate

 }

 onBtnClickHandler = e => {
     e.preventDefault()
     const {text} = this.state

     this.props.onAddtext({
         id: +new Date(),
         text,
     })

 }

 _handleKeyDown = (e) => {

     if (e.key === 'Enter') {
         e.preventDefault()
         const {text} = this.state

         if(text.trim() == false){
             return alert("нужно что нибудь ввести")
         } else {
             this.props.onAddtext({
                 id: +new Date(),
                 text,
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
     console.log("что это", e.currentTarget)
     this.setState({ [id]: value })
 }


arrowCheck = () => {

        console.log("hi1", this.props.checked())
}

 render() {
     const{text2} = this.props
     const{data} = this.props

     return (
         <div className="todo-list">
             <div className="header">
                 {data.length ?
                     <img src="https://image.flaticon.com/icons/png/512/25/25623.png" className="image__arrow" arrowCheck={this.arrowCheck()} onClick={this.arrowCheck}/>
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

             {data.length ?
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
                         <li>All</li>
                         <li>Active</li>
                         <li>Completed</li>
                     </ul>

                     <button
                         className="button"
                         onClick={this.onBtnClickHandler}
                         disabled={!this.validate()}>
                         Add
                     </button>

                 </div>
              : null}
         </div>
     )
 }
}

export {TodoList}