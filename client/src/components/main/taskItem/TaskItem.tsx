import * as React from 'react';
import { Component } from 'react';
import TaskActions from '../taskActions/TaskActions';
import VImage from '../../../assets/v.png';
import moment from 'moment';
import "./TaskItem.scss";

export interface TaskItemProps {
    task: Task;
    onDeleteTask: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface TaskItemState {

}

class TaskItem extends Component<TaskItemProps, TaskItemState> {
    // state = { : }
    render() {
        const { task, onDeleteTask } = this.props;

        return (
            <tr>
                <td>{task.user.username}</td>
                <td>{task.user.phone}</td>
                <td>{task.user.email}</td>
                <td>
                    <div className="item-complete">
                        {task.complete ? <img src={VImage} /> : ""}
                    </div>
                    {moment(task.date).format('DD.MM.YYYY')}
                </td>
                <td>
                    <TaskActions task={task} onDeleteTask={onDeleteTask} />
                </td>
            </tr>
        );
    }
}

export default TaskItem;