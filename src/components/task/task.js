import React, { Component } from "react";
import "./task.css"

export default class Task extends Component {
    state = {
        done: false,
        editing: false
    }

    onLabelClick = () => {
        this.setState((state) => {
            return {
                done: !this.state.done
            }
        })
    }

    onBtnEditClick = () => {
        this.setState({
            editing: true
        })
    }

    render() {
        const {label, id, onDeleted} = this.props;
        const { done, editing } = this.state;

        let classNames = null;
        if (done) {
            classNames = 'completed';
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
                               id={id}
                               onClick={ this.onLabelClick }/>
                        <label htmlFor={id}>
                        <span className="description">
                            {label}
                        </span>
                            <span className="created">created 5 minutes ago</span>
                        </label>
                        <button className="icon icon-edit" onClick={this.onBtnEditClick}></button>
                        <button className="icon icon-destroy" onClick={onDeleted}></button>
                    </div>
                    <input type="text" className="edit" defaultValue={ label } />
                </li>
            </div>
        )
    }
}