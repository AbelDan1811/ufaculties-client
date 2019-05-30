import React from 'react'
import { Modal, Button, Tooltip, Alert, Icon} from 'antd'
import { notification} from 'antd'
import {updateUser} from '../../../../services/apis/UserService'

class RemoveUserModal extends React.Component {
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

        const {user} = this.props
        const {username, _id} = user
        console.log(username,_id)
        const payload = {department : null}
        const { success, data, message} = await updateUser({ userId : user._id , payload })

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : `Successfully remove user ${user.username}! from the department`,
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
        const {user} = this.props
        return (
            <div>
                <Tooltip placement="top" title="Xóa tài khoản khỏi đơn vị">
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
                        
                        <p> Bạn có chắc muốn xóa tài khỏan {user.username} đơn vị này không ? </p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default RemoveUserModal