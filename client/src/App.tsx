import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavBar from './components/main/navbar/NavBar';
import TaskList from './components/main/taskList/TaskList';
import TaskItemView from './components/main/taskItemView/TaskItemView';
import TaskItemCreate from './components/main/taskItemCreate/TaskItemCreate';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';


export interface AppProps {
}


export interface AppState {
  currentUser: User;
}

class App extends React.Component<AppProps, AppState>{

  constructor(props: AppProps) {
    super(props);

    this.state = {
      currentUser: {
        username: '',
        email: '',
        phone: '',
        userType: 0
      }
    };
  }

  private updateUserDetails = (user: User) => {
    let currentUser = { ...this.state.currentUser };
    currentUser = user;
    this.setState({ currentUser });
    console.log('currentUser', currentUser);
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router>
        <NavBar currentUser={currentUser} />
        <div className="App">
          <Switch>
            <Route exact path="/" render={(props) => <Login {...props} onUserDetails={this.updateUserDetails} />} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/tasks" render={(props) => <TaskList {...props} currentUser={currentUser} />} />
            <Route exact path="/tasks/view/:id" render={(props) => <TaskItemView {...props} currentUser={currentUser} />} />
            <Route exact path="/tasks/edit/:id" render={(props) => <TaskItemCreate {...props} isEdit={true} currentUser={currentUser} />} />
            <Route exact path="/tasks/new" render={(props) => <TaskItemCreate {...props} isEdit={false} currentUser={currentUser} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
