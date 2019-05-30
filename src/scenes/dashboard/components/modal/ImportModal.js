import React from 'react'
import { Modal, Button, Tooltip,  Upload, Alert, Icon,  Spin} from 'antd'
import {bulkSave} from '../../../../services/apis/UserService'

import {notification} from 'antd'

class ImportModal extends React.Component {
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
        formData.append('importer',file)
        const { success, data, message} = await bulkSave(formData)

        if (!success)
            return this.setState({
                error : message,
                uploading : false 
            })
        
        notification.open({
            message : "Successfully added new accounts!" ,
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
            <div>
                <Tooltip placement="top" title="Thêm bằng file excel">
                    <Button icon="profile" type="danger" ghost onClick={this.showModal} />
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
                        <p>Thêm nhiều người dùng bằng cách gửi file Excel (.xlsx) tại đây :</p>
                        
                        {uploading ? <Spin size="large"> </Spin> : null}    
                        
                        <input type="file" name="importer" onChange={this.onChangeFile}></input>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default ImportModal