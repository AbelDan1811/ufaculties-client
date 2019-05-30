import { Menu } from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import UserBarContainer from './userbar/UserBarContainer'
import './Header.css'
class Header extends React.Component {

    handleClick = async e => {
        this.props.setGlobalState({
            current: e.key,
        });
    };

    render() {
        return (
            <div className="Header">
                <Menu onClick={this.handleClick} selectedKeys={[this.props.appState.current]} mode="horizontal" theme="dark" style= {{ lineHeight : "7vh"}}>
                    <Menu.Item key="dashboard">
                        <Link to={'/dashboard'} >Trang chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="departments">
                        <Link to={'/departments'}> Đơn vị</Link>
                    </Menu.Item> 
                    <Menu.Item key="fields">
                        <Link to={'/fields'}> Nghiên cứu</Link>
                    </Menu.Item>
                    <Menu.Item key="profile" className = 'LeftItems'>
                        <UserBarContainer/>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Header