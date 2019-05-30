import React from 'react'
import { Modal, Button, Tooltip, Form , Input, Alert, Icon, Select} from 'antd'
import {updateField, findAllFields, findFieldDetail } from '../../../../services/apis/FieldService'
import { notification} from 'antd'

const {Option} = Select
class EditModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
        fieldName : '',
        parentId : null,
        allFields : []
    }

    showModal = async () => {
        const fieldId = this.props.field.id
        const [ detailResponse, totalResponse ] = await Promise.all([
            findFieldDetail(fieldId),
            findAllFields()
        ])
        const { success : detailSuccess , data :  detailData, message : detailMessage } = detailResponse
        const { success : totalSuccess , data : totalData, message : totalMessage} = totalResponse

        if (detailSuccess && totalSuccess){
            this.setState({
                allFields : totalData,
                fieldName : detailData.name,
                parentId : detailData.parent,
                visible: true,
            })
        }
    }


    onChangeInput = (key) => (e) => {
        if (e == null) {
            return this.setState({
                [key] : null
            })
        } 
        const {target} = e
        const value = target ? target.value :  e 
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

        const {fieldName, parentId} = this.state
        const payload = {
            name : fieldName,
            parent : parentId
         }
         console.log(payload)
        const { success, data, message} = await updateField({
            fieldId : this.props.field.id,
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
        const {fieldName, error, parentId, allFields} = this.state
 
        return (
            <>
                <Tooltip placement="top" title="Chỉnh sửa">
                    <Button  icon="edit" onClick={this.showModal} size="small" />
                </Tooltip>
                <Modal
                    centered
                    title="LĨNH VỰC NGHIÊN CỨU"
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
                            <Form.Item>
                                <Input id="fieldName"  value={fieldName} onChange={this.onChangeInput("fieldName")}
                                    prefix={<Icon type="file" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Tên Lĩnh vực"
                                    allowClear = {true}
                                />  
                            </Form.Item>
                            <label>Lĩnh vực cha : </label>
                            <Form.Item>
                                <Select allowClear id="parentId" defaultValue={parentId}
                                        onChange={this.onChangeInput("parentId")} style = {{ width : '100%'}} >
                                    <Option value={null}>None</Option>
                                    { allFields
                                        .filter(field => field._id !== this.props.field.id && field.parent !== this.props.field.id )
                                        .map(field => {
                                        return <Option  value={field._id}>{field.name}</Option>
                                        }
                                    )}
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </>
        )
    }
}

export default EditModal