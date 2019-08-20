import React from 'react'
import { Modal, Button, Tooltip,  Upload, Alert, Icon,  Spin} from 'antd'
import {uploadAvatar} from '../../../../services/apis/UserService'
import {notification} from 'antd'

class EditAvatarModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        file : null,
        uploading : false
    };

    showModal = async () => {
        this.setState({
            visible: true,
        })
    }


    handleSubmit = async e => {
        e.preventDefault()

        this.setState({
            error : null,
        })

        const { file } = this.state
        this.setState({
            uploading : true
        })
        
        const formData = new FormData()
        formData.append('avatar',file)
        const { success, data, message} = await uploadAvatar({
            userId : this.props.user._id,
            formData
        })

        if (!success)
            return this.setState({
                error : message,
                uploading : false 
            })
        
        notification.open({
            message : "Successfully uploaded data!" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })
    
        this.setState({
            visible : false,
            uploading : false 
        })
        await this.props.reloadOnSubmit()
    };

    onChangeFile = async (e) => {
        await this.setState({
            file : e.target.files[0]
        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
            loading : false,
            file : null
        });
    };

    render() {
        const {error, file, uploading, visible} = this.state
        return (
            <div >
                <Tooltip placement="top" title="Thêm bằng file excel">
                    <Button type="primary"onClick={this.showModal} >Cập nhật</Button>
                </Tooltip>
                <Modal
                    centered
                    title="THÊM HỒ SƠ CÁN BỘ"
                    okText="Tạo"
                    cancelText="Hủy"
                    visible={visible}
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
                        <p>Chọn file ảnh trong máy và tải lên tại đây. Định dạng cho phép ( JPG, JPEG, PNG )</p>
                        
                        {uploading ? <Spin size="large"> </Spin> : null}    
                        
                        <input type="file" name="avatar" onChange={this.onChangeFile}></input>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default EditAvatarModal