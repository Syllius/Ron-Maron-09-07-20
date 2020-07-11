import * as React from 'react';
import "./Login.scss";
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HttpFetch } from '../utilities/HttpFetch';


interface MatchParams {
}

export interface LoginProps extends RouteComponentProps<MatchParams> {
    onUserDetails: (user: User) => void;
}

export interface LoginState {
    username: String,
    password: String,
    loginError: Boolean
}

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginError: false
        };
    }

    private handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;

        this.setState({ username, loginError: false });

        console.log('username', this.state.username);
    }

    private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;

        this.setState({ password, loginError: false });

        console.log('password', this.state.password);
    }

    private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const state = this.state;

        const user = await HttpFetch<User>(
            new Request(
                "http://localhost:3000/api/users/login",
                {
                    method: "post",
                    body: JSON.stringify(state),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        );

        if (user) {
            this.props.onUserDetails(user);
            this.props.history.push('/tasks');
        } else {
            // error, user not found
            this.setState({ loginError: true });
        }
    }

    render() {
        const { loginError } = this.state;

        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-field">
                        <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-field">
                        {loginError ? <p className="error">משתמש ו/או סיסמא שגויים</p> : ""}
                    </div>
                    <div className="form-field">
                        <input type="submit" value="Login" />
                    </div>
                    <div className="form-field">
                        <Link to={`/register`}>
                            <input type="button" value="Register" />
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;