import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {createUser} from '../../../../services/apis/UserService'
import {findAllDepartments} from '../../../../services/apis/DepartmentService'

import {notification} from 'antd'

const {Option} = Select
class AddModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        user : {
            username : '',
            password : '',
            passwordRetype : '',
            email : '',
            fullName : '',
            officerCode : '',
            department : null
        },
        departments : []
    };

    showModal = async () => {
        const {success, data, message} = await findAllDepartments()
        if (success) 
            this.setState({
                visible: true,
                departments : data
            });
    };

    onChangeInput = (key) => (e) => {
        const {target} = e
        const value = target ? target.value :  e 
        
        const mergedUser = Object.assign({}, this.state.user , { [key] : value})
        this.setState({
            user : mergedUser
        })

    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({
            error : null,
        });

        if (!this.isValidatedForm())
            return 

        const {username, password, email, fullName, officerCode, department } = this.state.user
        const payload = {username, password, email, fullName, officerCode, department}
        const { success, data, message} = await createUser(payload)

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully added new account!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })
    

        this.setState({
            visible : false
        })
        await this.props.reloadOnSubmit()
    };

    isValidatedForm = () => {
        const { password, passwordRetype, username, email, officerCode, fullName} = this.state.user
        if (!password || !passwordRetype || !username || !email || !officerCode || !fullName ) {
            this.setState({
                error : 'Thông tin chưa được điền đầy đủ'
            })
            return false
        }

        if (password !== passwordRetype){
            this.setState({
                error : 'Mật khẩu được nhập không trùng khớp'
            })
            return false 
        }
        
        return true
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const {error, user, departments} = this.state
        const {username, password, email, fullName, officerCode, passwordRetype, department} = user
        return (
            <div>
                <Tooltip placement="top" title="Thêm người dùng">
                    <Button icon="plus" type="primary" ghost onClick={this.showModal} />
                </Tooltip>
                <Modal
                    centered
                    title="HỒ SƠ CÁN BỘ"
                    okText="Tạo"
                    cancelText="Hủy"
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    maskClosable={true}
                >
                    <div >
                        { error ?
                            <div className = "SeparatedBottom">
                                <Alert type ="error" closable showIcon message = { error } /> 
                            </div>
                        : null }
                        
                        <Form>
                            <Form.Item>
                                <Input id="username" onChange = {this.onChangeInput('username')} value={username}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Tài khoản"
                                    allowClear = {true}
                                    whitespace={true}
                                />  
                            </Form.Item>
                            <Form.Item>
                                <Input id="password" onChange = {this.onChangeInput('password')} value={password}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Mật khẩu" 
                                    allowClear = {true}
                                    whitespace={true}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input id="passwordRetype" onChange = {this.onChangeInput('passwordRetype')} value={passwordRetype}
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Xác nhận Mật khẩu" 
                                    allowClear = {true}
                                    whitespace={true}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input id="email" onChange = {this.onChangeInput('email')} value={email}
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email" 
                                    allowClear = {true}
                                    whitespace={true}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input id="fullName" onChange = {this.onChangeInput('fullName')} value={fullName}
                                    prefix={<Icon type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Họ và tên" 
                                    allowClear = {true}
                                    whitespace={true}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input id="officerCode" onChange = {this.onChangeInput('officerCode')} value={officerCode}
                                    prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Mã cán bộ" 
                                    allowClear = {true}
                                    whitespace={true}
                                />
                            </Form.Item>
                            <label>Đơn vị công tác : </label>
                            <Form.Item>
                                <Select allowClear id="department"
                                        onChange={this.onChangeInput("department")} style = {{ width : '100%'}} >
                                    { departments.map( (department) => {
                                        return <Option  value={department._id}>{department.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddModal