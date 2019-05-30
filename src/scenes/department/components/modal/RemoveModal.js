import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import { notification} from 'antd'
import {deleteDepartment} from '../../../../services/apis/DepartmentService'

const {Option} = Select

class RemoveModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
    }

    showModal = async () => {
        this.setState({
            visible : true
        })
    }

    handleSubmit = async e => {
        e.preventDefault()
        this.setState({
            error : null,
        });
        const {departmentId} = this.props
        const { success, data, message} = await deleteDepartment(departmentId)

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully removed the account!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })

        this.setState({
            visible : false
        })

        await this.props.reloadOnSubmit()
    };


    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
        const {error} = this.state
         
        return (
            <div>
                <Tooltip placement="top" title="Xóa đơn vị">
                <Button shape="circle" icon="delete" onClick={this.showModal}></Button>
                </Tooltip>
                <Modal
                    centered
                    title="THÔNG BÁO"
                    okText="Xóa"
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
                        
                        <p> Bạn có chắc muốn xóa đơn vị này không ? </p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RemoveModal