import React from 'react'


class TodoItem extends React.Component {

    state = {
        agree: false,
    }

    handleCheckboxChange = e => {
        this.setState({ agree: e.currentTarget.checked })
        console.log("чекбокс", e.currentTarget.checked)
    }

    validate = () => {
        const {agree} = this.state
        if(agree == true){
        }
        return false
    }

    handler = () => {
        if(this.state.agree == true){
            const {id} = this.props.data
            this.props.onDelete(id)
        }
    }

    checkBoxChange = e => {
        if (this.state.agree == false){
            return true
        }else return false

}

    render() {

        const { text } = this.props.data
        console.log("первая data", this.props)
        return (
            <div className='todo-item'>
                <input
                    name="completed"
                    className='checkbox'
                    type="checkbox"
                    checked={this.state.agree}
                    onChange={this.handleCheckboxChange}/>
                <p defaultChecked={this.validate}   className={this.state.agree==true ? 'text__changed': 'text__text'} >{text}</p>
                <img onClick={this.handler} src='https://iconizer.net/files/Web_Design_Creatives/orig/Cross-lines.png' className='image'/>
            </div>
        )
    }
}

export {TodoItem}