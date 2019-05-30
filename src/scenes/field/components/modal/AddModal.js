import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {createField} from '../../../../services/apis/FieldService'
import { notification} from 'antd'


class AddModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        fieldName : ''
    }

    showModal = async () => {
        this.setState({
            visible: true,
        })
    }

    onChangeInput = (key) => (e) => {
        const {value} = e.target
        this.setState({
            [key] : value
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({
            error : null,
        });

        if (!this.isValidatedForm())
            return 

        const {fieldName} = this.state
        const payload = {
            name : fieldName,
            parent : this.props.parentField ? this.props.parentField.id : null
         }
        const { success, data, message} = await createField({
            payload
        })

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully added new research field!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })

        this.setState({
            visible : false
        })
        await this.props.reloadOnSubmit()
    };

    isValidatedForm = () => {
        const {fieldName} = this.state
        if (!(fieldName+'').trim()) {
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
        const {fieldName, error} = this.state
        const {parentField} = this.props 
 
        return (
            <>
                <Tooltip placement="top" title="Thêm lĩnh vực nghiên cứu">
                    <Button  icon="plus" onClick={this.showModal} 
                             size={parentField ? "small" : "default"} 
                             type={parentField ? "default" : "primary"}  
                    >
                        {parentField ? null : "Thêm mới"}
                    </Button>
                    
                </Tooltip>
                <Modal
                    centered
                    title="LĨNH VỰC NGHIÊN CỨU"
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
                                <Input id="fieldName"  value={fieldName} onChange={this.onChangeInput("fieldName")}
                                    prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Tên Lĩnh vực"
                                    allowClear = {true}
                                />  
                            </Form.Item>
                            {
                                parentField ? 
                                <>
                                    <label>Lĩnh vực cha : </label>
                                    <Form.Item>
                                        <Input id="parent"  value={parentField} disabled
                                            prefix={<Icon type="apartment" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        /> 
                                    </Form.Item>  
                                </>
                                : null  
                            }
                            
                        </Form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default AddModal