import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {createDepartment} from '../../../../services/apis/DepartmentService'
import { notification} from 'antd'
const {Option} = Select

class AddModal extends React.Component {
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
    }

    showModal = async () => {
        this.setState({
            visible: true,
        })
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
        const { success, data, message} = await createDepartment({
            payload
        })

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully added new department!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })

        this.setState({
            visible : false
        })
        await this.props.reloadOnSubmit()
    };

    isValidatedForm = () => {
        const {name, type} = this.state.department
        if (!(name+'').trim() || !type) {
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
                <Tooltip placement="top" title="Thêm đơn vị">
                <Button  icon="plus" onClick={this.showModal} type="danger" ghost>Thêm đơn vị</Button>
                </Tooltip>
                <Modal
                    centered
                    title="HỒ SƠ ĐƠN VỊ"
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
                                <Input id="name"  value={name} onChange={this.onChangeInput("name")}
                                    prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Tên Đơn vị"
                                    allowClear = {true}
                                />  
                            </Form.Item>
                            <Form.Item>
                                <Select id = "type" defaultValue={"Subject"} style={{ width: "100%" }} onChange={this.onChangeInput("type")}>
                                    <Option value="Subject">Bộ môn</Option>
                                    <Option value="Laboratory">Phòng thí nghiệm</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Input id="address" onChange = {this.onChangeInput('address')}  value={address}
                                    prefix={<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                    placeholder="Địa chỉ"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input id="phoneNumber" onChange = {this.onChangeInput('phoneNumber')}  value={phoneNumber}
                                    prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                    placeholder="Số điện thoại liên hệ"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input id="website" onChange = {this.onChangeInput('website')} value={website}
                                    prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    allowClear = {true}
                                    placeholder="Website"
                                />
                            </Form.Item>
                            
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default AddModal