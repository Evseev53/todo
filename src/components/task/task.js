import React, { Component } from "react";
import "./task.css"
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default class Task extends Component {
    static defaultProps = {
        onDeleted () { return new Error('В Task не передана функция onDeleted') },
        onToggleDone () { return new Error('В Task не передана функция onToggleDone') },
        onToggleEdit () { return new Error('В Task не передана функция onToggleEdit') }
    }

    state = {
        text: this.props.label
    }

    onLabelChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const {label, id, onDeleted, onToggleDone, onToggleEdit, done, editing, date} = this.props;
        const { text } = this.state;
        const distance = formatDistanceToNow( date,{addSuffix: true} );

        let classNames = null;
        let defaultChecked = false;
        if (done) {
            classNames = 'completed';
            defaultChecked = true;
        }
        if (editing) {
            classNames = 'editing';
        }

        return (
            <div>
                <li className={classNames}>
                    <div className="view">
                        <input className="toggle"
                               type="checkbox"
                               defaultChecked={ defaultChecked }
                               id={id}
                               onClick={ onToggleDone }
                               />
                        <label htmlFor={id} >
                        <span className="description">
                            {label}
                        </span>
                            <span className="created">Created { distance }</span>
                        </label>
                        <button className="icon icon-edit" onClick={ () => onToggleEdit(id) }></button>
                        <button className="icon icon-destroy" onClick={ onDeleted }></button>
                    </div>
                    <input
                        autoFocus={ true }
                        onFocus={ e => e.currentTarget.select() }
                        type="text"
                        className="edit"
                        defaultValue={ label }
                        onChange={ this.onLabelChange }
                        onBlur={ () => onToggleEdit(id, text) }
                    />
                </li>
            </div>
        )
    }
}