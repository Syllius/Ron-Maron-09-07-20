import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import TaskItem from '../taskItem/TaskItem';
import TaskListHeader from '../taskListHeader/TaskListHeader';
import "./TaskList.scss";
import { HttpFetch } from '../../utilities/HttpFetch';


export interface TaskListProps extends RouteComponentProps<any> {
    currentUser: User;
}

export interface TaskListState {
    tasks: Array<Task>;
}

class TaskList extends React.Component<TaskListProps, TaskListState> {

    constructor(props: TaskListProps) {
        super(props);
        this.state = { tasks: [] };
    }

    async componentDidMount() {
        const { currentUser } = this.props;
        const userIsAdmin = currentUser.userType == 1;
        console.log(userIsAdmin);

        if (currentUser.userType == 0) {
            this.props.history.push('/');
            return;
        }

        const tasks = await HttpFetch<Task[]>(
            new Request(
                // "http://localhost:3000/api/tasks/user/5f086ed4003fce5a6cbf1de2" // TODO: Make this dynamic
                "http://localhost:3000/api/tasks" + (!userIsAdmin ? "/user/" + currentUser._id : "")
            )
        );
        console.log('get', tasks);

        this.setState({ tasks });
    }

    private handleDeleteTask = async (event: React.MouseEvent<HTMLDivElement>, task: Task) => {
        // const tasks = this.state.tasks.filter(t => t._id !== taskId);
        // this.setState({ tasks });
        console.log('Delete!', task);

        const response = await HttpFetch<Task>(
            new Request(
                "http://localhost:3000/api/tasks/" + task._id,
                {
                    method: "delete",
                    body: JSON.stringify(task),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        );
        console.log('delete', response);

        const tasks = this.state.tasks.filter(t => t._id !== task._id);
        this.setState({ tasks });
    }

    render() {
        const { tasks } = this.state;

        return (
            <React.Fragment>
                <h1>ניהול משימות</h1>
                <TaskListHeader tasks={tasks} />
                <div className="TaskList">
                    <table>
                        <thead>
                            <tr>
                                <th>שם משתמש</th>
                                <th>טלפון</th>
                                <th>מייל</th>
                                <th>תאריך יצירת המשימה</th>
                                <th>פעולות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map((task, i) => (
                                <TaskItem key={i} task={task} onDeleteTask={(e) => {
                                    this.handleDeleteTask(e, task)
                                }} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }

}

export default TaskList;