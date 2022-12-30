import React from "react";
import "./task.css"

const Task = ({label, condition}) => {

    return (
        <div>
            <li className={condition}>
                <div className="view">
                    <input className="toggle" type="checkbox" />
                    <label>
                        <span className="description">{label}</span>
                        <span className="created">created 5 minutes ago</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                <input type="text" className="edit" value="Editing task" />
            </li>
        </div>
    )
}

export default Task;