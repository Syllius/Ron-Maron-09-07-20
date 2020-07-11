import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';
import LogoImg from '../../../assets/logo.png';

interface NavBarProps {
    currentUser: User
}

const NavBar: React.SFC<NavBarProps> = (props) => {
    return (
        <div className="NavBar">
            <img src={LogoImg} alt="PROPiT" />
            {props.currentUser.userType != 0 ? <Link to={`/`}><button>Logout</button></Link> : ""}
        </div>
    );
}

export default NavBar;