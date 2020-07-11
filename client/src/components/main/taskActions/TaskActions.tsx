import * as React from 'react';
import { Link } from 'react-router-dom';
import './TaskActions.scss';
import ViewImg from '../../../assets/view.png';
import EditImg from '../../../assets/edit.png';
import RemoveImg from '../../../assets/remove.png';


export interface TaskActionsProps {
    task: Task;
    onDeleteTask: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export interface TaskActionsState {
}

class TaskActions extends React.Component<TaskActionsProps, TaskActionsState> {

    render() {
        const { task, onDeleteTask } = this.props;

        return (
            <div className="TaskActions">
                <Link to={`/tasks/view/${task._id}`}>
                    <div className="TaskAction TaskActionView">
                        <img src={ViewImg} alt="View" />
                        <small>צפייה</small>
                    </div>
                </Link>
                <Link to={`/tasks/edit/${task._id}`}>
                    <div className="TaskAction TaskActionEdit">
                        <img src={EditImg} alt="Edit" />
                        <small>עריכה</small>
                    </div>
                </Link>
                <div className="TaskAction TaskActionRemove" onClick={onDeleteTask}>
                    <img src={RemoveImg} alt="Remove" />
                    <small>מחיקה</small>
                </div>
            </div>
        );
    }

}

export default TaskActions;