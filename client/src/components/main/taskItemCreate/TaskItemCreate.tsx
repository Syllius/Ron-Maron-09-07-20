import * as React from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import "./TaskItemCreate.scss";
import { HttpFetch } from '../../utilities/HttpFetch';


interface MatchParams {
    id: string;
}

export interface TaskItemCreateProps extends RouteComponentProps<MatchParams> {
    isEdit: Boolean;
    currentUser: User;
}

export interface TaskItemCreateState {
    task: Task;
    isError: Boolean;
}

class TaskItemCreate extends React.Component<TaskItemCreateProps, TaskItemCreateState> {

    constructor(props: TaskItemCreateProps) {
        super(props);
        this.state = {
            task: {
                // _id: '',
                complete: false,
                date: new Date(),
                content: '',
                user: {
                    _id: "",
                    email: '',
                    phone: '',
                    userType: 0,
                    username: '',
                    password: ''
                }
            },
            isError: false
        };
    }

    async componentDidMount() {
        const { currentUser } = this.props;
        if (currentUser.userType == 0) {
            this.props.history.push('/');
            return;
        }

        if (this.props.isEdit) {
            const task = await HttpFetch<Task>(
                new Request(
                    "http://localhost:3000/api/tasks/" + this.props.match.params.id
                )
            );
            console.log('getbyid', task);

            this.setState({ task });
        }

        let task = { ...this.state.task };
        task.user = this.props.currentUser;
        this.setState({ task });
    }

    private handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('textarea', event);
        const content = event.target.value;
        const clonedTask = this.state.task;
        clonedTask.content = content;

        this.setState({
            task: clonedTask,
            isError: false
        });

        console.log(clonedTask);
        console.log('state', this.state.task);
    }

    private handleCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const complete = event.target.checked;
        console.log('complete', complete);

        const clonedTask = this.state.task;
        clonedTask.complete = complete;

        this.setState({
            task: clonedTask
        });

        console.log('state', this.state.task);
    }

    private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submit');

        const finalTask = this.state.task;
        const isEdit = this.props.isEdit;

        if (finalTask.content) {
            const response = await HttpFetch<Task>(
                new Request(
                    "http://localhost:3000/api/tasks" + (isEdit ? "/" + this.props.match.params.id : ""),
                    {
                        method: !isEdit ? "post" : "put",
                        body: JSON.stringify(finalTask),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
            );
            this.props.history.push('/tasks');

            console.log('response', response);
        } else {
            this.setState({ isError: true });
        }
    }

    render() {
        const { task, isError } = this.state;
        const { isEdit } = this.props;

        return (
            <div className="TaskItemCreate">
                <h1>{!this.props.isEdit ? "משימה חדשה" : "עריכה"}</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="">משימה:</label>
                        <textarea value={task.content} onChange={this.handleContentChange}>
                        </textarea>
                    </div>
                    <div className="form-field">
                        <label htmlFor="">בוצע:</label>
                        <input type="checkbox" onChange={this.handleCompleteChange} checked={task.complete} />
                    </div>
                    <div className="form-field">
                        {isError ? <p className="error">נא לרשום משימה</p> : ""}
                    </div>
                    <div className="form-field">
                        <input type="submit" value={isEdit ? "עדכן" : "אישור"} />
                        <Link to={`/tasks`}>
                            <button>חזור</button>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default TaskItemCreate;