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

    render() {

        const { text } = this.props.data
        console.log("первая data", this.props.data)
        return (
            <div
                className="todo-item">
                <input
                    name="completed"
                    className='checkbox'
                    type="checkbox"
                    onChange={this.handleCheckboxChange}/>
                <p defaultChecked={this.validate}   className={this.state.agree==true ? 'text__changed': 'text__text'} >{text}</p>
            </div>
        )
    }
}

export {TodoItem}