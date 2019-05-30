import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {updateUser, selectFields} from '../../../../services/apis/UserService'
import {findAllDepartments} from '../../../../services/apis/DepartmentService'
import { notification} from 'antd'
const {Option} = Select

class EditModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        user : {
            username : '',
            role : '',
            officerCode : '',
            officerType : '',
            department : null
        },
        departments : []
        
    };

    showModal = async () => {
        const {userId} = this.props
        const fields = 'username,role,officerCode,officerType,department'
        const [ userResponse, departmentResponse ] = await Promise.all([
            selectFields({ userId, fields }),
            findAllDepartments()
        ])
        
        const { success : userSuccess , data :  userData, message : userMessage } = userResponse
        const { success : deptSuccess , data : deptData, message :deptMessage} = departmentResponse

        if (userSuccess && deptSuccess){
            this.setState({
                departments : deptData,
                user : userData,
                visible: true,
            })
        }
    };


    onChangeInput = (key) => (e) => {
        const {target} = e
        console.log(e)
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

        const {username, role, officerCode, officerType, department } = this.state.user
        const payload = {username, role, officerCode, officerType, department }
        const { success, data, message} = await updateUser({
            userId : this.props.userId,
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
        const {username, role, officerCode, officerType } = this.state.user
        console.log(this.state.user)
        if (!username || !role || !officerCode || !officerType ) {
            this.setState({
                error : 'Thông tin chưa được điền đầy đủ'
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
        
        const {username, role, officerCode, officerType, department } = user 
 
        return (
            <div>
                <Tooltip placement="top" title="Chỉnh sửa thông tin">
                <Button shape="circle" icon="edit" onClick={this.showModal}></Button>
                </Tooltip>
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
                            <label>Tài khoản</label>
                            <Form.Item>
                                <Input id="username" disabled value={username}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />  
                            </Form.Item>
                            <label>Quyền hệ thống</label>
                            <Form.Item>
                                <Select id = "role" defaultValue={role} style={{ width: "100%" }} onChange={this.onChangeInput("role")}>
                                    <Option value="admin">Quản trị viên</Option>
                                    <Option value="teacher">Cán bộ</Option>
                                </Select>
                            </Form.Item>
                            <label>Mã CB</label>
                            <Form.Item>
                                <Input id="officerCode" onChange = {this.onChangeInput('officerCode')} whitespace={true} value={officerCode}
                                    prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                />
                            </Form.Item>
                            <label>Chức vụ</label>
                            <Form.Item>
                                <Input id="officerType" onChange = {this.onChangeInput('officerType')} whitespace={true} value={officerType}
                                    prefix={<Icon type="fork" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                />
                            </Form.Item>
                            <label>Đơn vị công tác : </label>
                            <Form.Item>
                                <Select allowClear id="department" defaultValue={department}
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

export default EditModal