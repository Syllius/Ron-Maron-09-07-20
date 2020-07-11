import * as React from 'react';
import { Link } from 'react-router-dom';
import './TaskListHeader.scss';

export interface TaskListHeaderProps {
    tasks: Task[]
}

export interface TaskListHeaderState {

}

class TaskListHeader extends React.Component<TaskListHeaderProps, TaskListHeaderState> {

    render() {
        const { tasks } = this.props;

        return (
            <div className="TaskListHeader">
                <h2>רשימת הלקוחות שלך ({tasks.length})</h2>
                <Link to={`/tasks/new`}>
                    <button>משימה חדשה</button>
                </Link>
            </div>
        );
    }
}

export default TaskListHeader;