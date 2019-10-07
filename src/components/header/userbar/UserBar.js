import React, {Component} from 'react'
import {Avatar, Button } from 'antd'
import {Link} from 'react-router-dom'

const UserBar = (props) => {
        const {user} = props.appState
        const { username, avatarUrl, _id } = user
        if (username) {
            return (
                <>  
                    <Link to={`/profile/${_id}`}>
                        <Avatar src = {avatarUrl} style={{ backgroundColor: '#87d068' }}>{username[0].toUpperCase()}</Avatar>
                    </Link>
                </>  
            )
        }
            
        return ( 
            <Button type="primary" style={{ backgroundColor: '#87d068', borderStyle : 'none' }}>
                <Link to={'/signin'} style = {{ color : 'white'}}>
                    Đăng nhập
                </Link>
            </Button>
        )
}

export default UserBar

