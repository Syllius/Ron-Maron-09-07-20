import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { HttpFetch } from '../../utilities/HttpFetch';
import VImage from '../../../assets/v.png';
import "./TaskItemView.scss";
import moment from 'moment';


interface MatchParams {
    id: string;
}

export interface TaskItemViewProps extends RouteComponentProps<MatchParams> {
    currentUser: User;
}

export interface TaskItemViewState {
    task: Task;
}

class TaskItemView extends React.Component<TaskItemViewProps, TaskItemViewState> {

    constructor(props: TaskItemViewProps) {
        super(props);
        this.state = {
            task: {
                // _id: '',
                complete: false,
                date: new Date(),
                content: '',
                user: {
                    _id: '',
                    email: '',
                    phone: '',
                    userType: 0,
                    username: '',
                    password: ''
                }
            }
        };
    }

    async componentDidMount() {
        const { currentUser } = this.props;
        if (currentUser.userType == 0) {
            this.props.history.push('/');
            return;
        }

        const task = await HttpFetch<Task>(
            new Request(
                "http://localhost:3000/api/tasks/" + this.props.match.params.id
            )
        );
        console.log('getbyid', task);

        // task.user = this.props.currentUser;
        this.setState({ task });
        console.log(task);
    }

    render() {
        console.log(this.state.task.content);
        return (
            // <div>
            //     <h1>צפייה</h1>
            //     {match.params.id}
            // </div>
            <div className="TaskItemView">
                <h1>צפייה</h1>
                {/* <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="">משימה:</label>
                        <textarea onChange={this.handleContentChange}></textarea>
                    </div>
                    <div className="form-field">
                        <label htmlFor="">בוצע:</label>
                        <input type="checkbox" onChange={this.handleCompleteChange} />
                    </div>
                    <div className="form-field">
                        <input type="submit" value="אישור" />
                        <Link to={`/tasks`}>
                            <button>חזור</button>
                        </Link>
                    </div>
                </form> */}
                <div className="container">
                    <div className="view-item">
                        <div className="label">משימה:</div>
                        <div>{this.state.task.content}</div>
                    </div>
                    <div className="view-item">
                        <div className="label">תאריך יצירה:</div>
                        <div>{moment(this.state.task.date).format('DD.MM.YYYY')}</div>
                    </div>
                    <div className="view-item">
                        <div className="label">בוצע:</div>
                        <div>{this.state.task.complete ? <img src={VImage} /> : <span>לא</span>}</div>
                    </div>
                    <div className="view-item">
                        <div className="label">משתמש:</div>
                        <div>{this.state.task.user.username}</div>
                    </div>
                    <div className="view-item">
                        <Link to={`/tasks`}>
                            <button>חזור</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskItemView;