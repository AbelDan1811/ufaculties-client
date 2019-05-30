import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {updateUser, findUser} from '../../../../services/apis/UserService'
import {findAllDepartments} from '../../../../services/apis/DepartmentService'
import { notification} from 'antd'
const {Option} = Select

class EditInfoModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        user : {
            fullName : ''
        },
        departments : []
        
    };

    showModal = async () => {
        const { success , data, message } = await findAllDepartments()

        if (success) {
            return this.setState({
                visible : true,
                user : {
                    ...this.props.user,
                    fullName : this.props.user.lastName + ' ' + this.props.user.firstName,
                },
                departments : data
            })
        } 
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

        const { _id ,fullName, email, phoneNumber, website, degree, department } = this.state.user
        const payload = {fullName, email, phoneNumber, website, degree, department : department._id }
        const { success, data, message} = await updateUser({
            userId : _id,
            payload
        })

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully edited the account!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })

        this.setState({
            visible : false
        })
        await this.props.reloadOnSubmit()
    };

    isValidatedForm = () => {
        const {fullName, email } = this.state.user
        console.log(this.state.user)
        if (!fullName || !email) {
            this.setState({
                error : 'Họ tên và Email bắt buộc được điền đầy đủ'
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
        const {user, error, departments} = this.state
        
        const {fullName, email, phoneNumber, website, degree, department } = user 
 
        return (
            <div>
                <Button icon="edit" type="primary" onClick={this.showModal} />
                <Modal
                    centered
                    title="HỒ SƠ CÁN BỘ"
                    okText="Sửa"
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
                            <label>Họ tên</label>
                            <Form.Item>
                                <Input id="fullName"  value={fullName} allowClear
                                    onChange={this.onChangeInput("fullName")}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    
                                />  
                            </Form.Item>
                            <label>Học vị</label>
                            <Form.Item>
                                <Input id="degree"  value={degree} allowClear
                                    onChange={this.onChangeInput("degree")}
                                    prefix={<Icon type="container" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    
                                />  
                            </Form.Item>
                            <label>VNU Email</label>
                            <Form.Item>
                                <Input id="email"  value={email} allowClear
                                    onChange={this.onChangeInput("email")}
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />  
                            </Form.Item>
                            <label>Số điện thoại</label>
                            <Form.Item>
                                <Input id="phoneNumber" value={phoneNumber} allowClear
                                    onChange = {this.onChangeInput('phoneNumber')}
                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                            </Form.Item>
                            <label>Website</label>
                            <Form.Item>
                                <Input id="website" value={website} allowClear
                                    onChange = {this.onChangeInput('website')}
                                    prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />
                            </Form.Item>
                            <label>Đơn vị công tác : </label>
                            <Form.Item>
                                <Select allowClear id="department" defaultValue={department ? department._id : null}
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

export default EditInfoModal