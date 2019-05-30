import React from 'react'
import { Modal, Button, Tooltip, Alert, Icon} from 'antd'
import {deleteField} from '../../../../services/apis/FieldService'
import { notification} from 'antd'

class RemoveModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
    }

    showModal = async () => {
        this.setState({
            visible: true,
        })
    }

    handleSubmit = async e => {
        e.preventDefault()

        this.setState({
            error : null,
        });

        const fieldId = this.props.field.id
        const { success, data, message} = await deleteField(fieldId)

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully removed the research field!" ,
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
            <>
                <Tooltip placement="top" title="Xóa lĩnh vực nghiên cứu">
                    <Button  icon="delete" onClick={this.showModal} size="small" />
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
                            
                        <p> Bạn có chắc muốn xóa lĩnh vực nghiên cứu này không ? </p>
                    </div>
                </Modal>
            </>
        )
    }
}

export default RemoveModal