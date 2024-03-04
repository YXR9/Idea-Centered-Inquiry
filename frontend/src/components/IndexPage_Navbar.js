import React, {useState, useEffect, useRef} from 'react';
import Logo from "../assets/logo v4.png"
import Avatar from '@mui/material/Avatar';
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import user from '../assets/user.png';
import edit from '../assets/edit.png';
// import { CreateActivityForm } from './CreateActivityForm';
import { JoinActivityForm } from './JoinActivityForm';

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}
  
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split('').map((char, index) => index > 0 ? char : '').join('')}`,
    // children: `${name.split('')[1][0]}${name.split('')[2][0]}`,
  };
}

function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img}></img>
        <a> {props.text} </a>
      </li>
    );
}

export default function IndexPage_Navbar() {
    const singOut = useSignOut();
    const navigate = useNavigate();

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email')
    
    let menuRef = useRef();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpen(false);
                console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);
  
    const logout = () => {
      singOut();
      navigate("/");
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('activityId');
      localStorage.removeItem('groupId');
      localStorage.removeItem('nodeId');
      localStorage.removeItem('nodeDataLength');
    };

    return (
        <nav ref={menuRef}>
            <div className='nav-logo-container'>
                <img alt='' src={Logo} width={85} height={85} />
            </div>
            <div className='nav-buttons'>
                <button className='join-activity-button'>
                  <JoinActivityForm/>
                </button>
                <div className="menu-trigger" onClick={() => { setOpen(!open) }}>
                    <Avatar {...stringAvatar(name)} />
                </div>
            </div>
            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                <h3>嗨！{name}</h3>
                <ul>
                    <DropdownItem img = {user} text = {"我的個人資料"}/>
                    <DropdownItem img = {edit} text = {"編輯個人資料"}/>
                </ul>
                <h3><button className='register-button' onClick={logout}>登出</button></h3>
            </div>
      </nav>
    )
}