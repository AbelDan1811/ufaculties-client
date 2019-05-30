import React, {Component} from 'react'
import { Form, Icon, Input, Button, Alert } from 'antd';
import './SignIn.css'
import {signIn} from '../../services/apis/AuthService'
import {setCookie} from '../../helpers/cookies'
import {Redirect} from 'react-router-dom'

class SignIn extends Component {
    state = {
        username : '',
        password : '',
        error : null,
        loginSucceeded : false
    }

    _handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({
            error : false
        })
        const {username, password} = this.state
        const { success, data, message} = await signIn({ username, password})

        if (!success) 
            return this.setState({
                error : message
            })
        
        const { token, user } = data    
        this.props.setGlobalState({
            user : user,
            token : token
        })

        setCookie('user', user)
        setCookie('token' , token)
        
        return this.setState({
            loginSucceeded : true
        })
    }

    _onChangeInput = (key) => (e) => {
        const {value} = e.target
        this.setState({
            [key]: value,
        })

    }
    
    render() {
        let {error, username, password, loginSucceeded} = this.state
        
        if (loginSucceeded){
            this.props.setGlobalState({
                current : 'dashboard'
            })
            return <Redirect to={'/dashboard'} />
        }
            
        return (
            <div >
                <div className = "SeperateBottom">
                    { error ? <Alert type ="error" closable showIcon message = { error } /> : null }
                </div>
                
                <Form onSubmit={this._handleSubmit} className="login-form AlignCenter">
                    <h1 className = "TextAlignCenter"><b>ĐĂNG NHẬP</b></h1>
                    
                    <Form.Item>
                        <Input id="username" onChange = {this._onChangeInput('username')} value={username}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Tài khoản"
                            allowClear = {true}
                        />  
                    </Form.Item>
                    <Form.Item>
                        <Input id="password" onChange = {this._onChangeInput('password')} value={password}
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Mật khẩu" 
                            allowClear = {true}
                        />
                    </Form.Item>
                    <div className="AlignCenter">
                        <Button type="primary" size="large" htmlType="submit" className="login-form-button ButtonAlignCenter " ghost>
                            Tiếp tục
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default SignIn