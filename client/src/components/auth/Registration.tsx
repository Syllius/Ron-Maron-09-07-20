import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { HttpFetch } from '../utilities/HttpFetch';
import "./Registration.scss";


interface MatchParams {
}

export interface RegistrationProps extends RouteComponentProps<MatchParams> {
}

export interface RegistrationState {
    user: User;
    registerError: Boolean
}

class Registration extends React.Component<RegistrationProps, RegistrationState> {

    constructor(props: RegistrationProps) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                phone: '',
                email: '',
                userType: 0
            },
            registerError: false
        };
    }

    private handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;

        const clonedUser = this.state.user;
        clonedUser.username = username;

        this.setState({ user: clonedUser, registerError: false });

        console.log('user', this.state.user);
    }

    private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;

        const clonedUser = this.state.user;
        clonedUser.password = password;

        this.setState({ user: clonedUser, registerError: false });

        console.log('user', this.state.user);
    }


    private handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const phone = event.target.value;

        const clonedUser = this.state.user;
        clonedUser.phone = phone;

        this.setState({ user: clonedUser, registerError: false });

        console.log('user', this.state.user);
    }


    private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;

        const clonedUser = this.state.user;
        clonedUser.email = email;

        this.setState({ user: clonedUser, registerError: false });

        console.log('user', this.state.user);
    }

    private handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userType = event.target.value;

        const clonedUser = this.state.user;
        clonedUser.userType = +userType;

        this.setState({ user: clonedUser, registerError: false });

        console.log('user', this.state.user);
    }

    private handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { user } = this.state;
        if (!user.username || !user.password || !user.email || !user.phone || user.userType == 0) {
            this.setState({ registerError: true });
            return;
        }

        const finalUser = this.state.user;

        const newUser = await HttpFetch<User>(
            new Request(
                "http://localhost:3000/api/users",
                {
                    method: "post",
                    body: JSON.stringify(finalUser),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        );
        this.props.history.push('/');

        console.log('register', newUser);
    }

    render() {
        const { registerError } = this.state;

        return (
            <div className="Registeration">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <input type="text" placeholder="Username" onChange={this.handleUsernameChange} />
                    </div>
                    <div className="form-field">
                        <input type="password" placeholder="Password" onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-field">
                        <input type="text" placeholder="Phone" onChange={this.handlePhoneChange} />
                    </div>
                    <div className="form-field">
                        <input type="text" placeholder="Email" onChange={this.handleEmailChange} />
                    </div>
                    <div className="form-field">
                        <select onChange={this.handleUserTypeChange}>
                            <option value="" disabled selected>User type</option>
                            <option value="2">Regular</option>
                            <option value="1">Admin</option>
                        </select>
                    </div>
                    <div className="form-field">
                        {registerError ? <p className="error">נא למלא את כל השדות</p> : ""}
                    </div>
                    <div className="form-field">
                        <input type="submit" value="Register" />
                    </div>
                    <div className="form-field">
                        <Link to={`/`}>
                            <input type="button" value="Back" />
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Registration;