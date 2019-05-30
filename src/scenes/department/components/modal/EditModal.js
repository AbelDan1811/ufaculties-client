import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {updateDepartment, deleteDepartment, findDepartment} from '../../../../services/apis/DepartmentService'
import { notification} from 'antd'
const {Option} = Select

class EditModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        department : {
            name : '',
            type : '',
            address : '',
            phoneNumber : '',
            website : ''
        }
    };

    showModal = async () => {
        const {departmentId} = this.props
        const {success, data, message } = await findDepartment(departmentId)

        if (success){
            this.setState({
                department : data,
                visible: true,
            })
        }
    }

    

    onChangeInput = (key) => (e) => {
        const {target} = e
        const value = target ? target.value :  e 
        
        const mergedDepartment = Object.assign({}, this.state.department , { [key] : value})
        this.setState({
            department : mergedDepartment
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({
            error : null,
        });

        if (!this.isValidatedForm())
            return 

        const {name, type, address, phoneNumber, website } = this.state.department
        const payload = {name, type, address, phoneNumber, website }
        const { success, data, message} = await updateDepartment({
            departmentId : this.props.departmentId,
            payload
        })

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully edited the department!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })

        this.setState({
            visible : false
        })
        await this.props.reloadOnSubmit()
    };

    isValidatedForm = () => {
        const {name, type, address, phoneNumber, website } = this.state.department
        console.log(this.state.user)
        if (!name || !type) {
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
        const {department, error} = this.state
        
        const {name, type, address, phoneNumber, website } = department 
 
        return (
            <div>
                <Tooltip placement="top" title="Chỉnh sửa thông tin">
                <Button shape="circle" icon="edit" onClick={this.showModal}></Button>
                </Tooltip>
                <Modal
                    centered
                    title="THÔNG TIN ĐƠN VỊ"
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
                            <label>Tên Đơn vị</label>
                            <Form.Item>
                                <Input id="name"  value={name} onChange={this.onChangeInput("name")}
                                    prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                />  
                            </Form.Item>
                            <label>Loại Đơn vị</label>
                            <Form.Item>
                                <Select id = "type" defaultValue={type} style={{ width: "100%" }} onChange={this.onChangeInput("type")}>
                                    <Option value="Subject">Bộ môn</Option>
                                    <Option value="Laboratory">Phòng thí nghiệm</Option>
                                </Select>
                            </Form.Item>
                            <label>Địa chỉ</label>
                            <Form.Item>
                                <Input id="address" onChange = {this.onChangeInput('address')} whitespace={true} value={address}
                                    prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                />
                            </Form.Item>
                            <label>Liên hệ</label>
                            <Form.Item>
                                <Input id="phoneNumber" onChange = {this.onChangeInput('phoneNumber')} whitespace={true} value={phoneNumber}
                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                />
                            </Form.Item>
                            <label>Trang Web</label>
                            <Form.Item>
                                <Input id="website" onChange = {this.onChangeInput('website')} whitespace={true} value={website}
                                    prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                />
                            </Form.Item>
                            
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default EditModal