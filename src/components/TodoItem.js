import React from 'react'


class TodoItem extends React.Component {

    handleCheckboxChange = e => {
        console.log("14",e.currentTarget.id)
        this.props.checkedOne(e.currentTarget.id)
        //this.setState({ agree: e.currentTarget.checked })
       // console.log("чекбокс", e.currentTarget.checked);
       // this.props.active =  e.currentTarget.checked;
    }

    validate = () => {
        if(this.props.active == true){
        }
        return false
    }

    handler = () => {
        if(this.props.active == true){
            const {id} = this.props.data
            this.props.onDelete(id)
        }
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
                    checked={this.props.active}
                    onChange={this.handleCheckboxChange}
                    id={this.props.data.id}/>
                <input value={text} defaultChecked={this.validate}   className={this.props.active==true ? 'text__changed': 'text__text'} />
                <img onClick={this.handler} src='https://iconizer.net/files/Web_Design_Creatives/orig/Cross-lines.png' className='image'/>
            </div>
        )
    }
}

export {TodoItem}