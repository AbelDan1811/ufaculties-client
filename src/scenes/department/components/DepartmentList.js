import React from 'react'
import {findAllDepartments} from '../../../services/apis/DepartmentService'
import { Table, Button, Col, Row } from 'antd'
import '../Department.css'
import EditModal from './modal/EditModal'
import RemoveModal from './modal/RemoveModal'
import AddModal from './modal/AddModal'

class DepartmentList extends React.Component {

    render() {
        const {Column} = Table

        let {user, items, reloadOnSubmit} = this.props
        let {role} = user
        
        return (
            <div className="SeparatedTop">  
                { role === "admin" ? 
                    <div className="SeparatedBottom">
                        <Row>
                            <Col offset={21} span={3}>
                                <AddModal reloadOnSubmit={reloadOnSubmit} />
                            </Col>
                        </Row>  
                    </div> : 
                    null
                }
                
                 
                <Table bordered	dataSource = {items} expandRowByClick	= {true}>
                    <Column title="STT" key="index" render = {(text, record, index) => (<span>{ index + 1 }</span>) } />
                    <Column title="Tên đơn vị" dataIndex="name" key="name" />
                    <Column title="Loại đơn vị" key="type" render = {(text, record) => (<span>{ record.type === "Subject" ? "Bộ môn" : "Phòng thí nghiệm"}</span>) } />
                    <Column title="Địa chỉ" dataIndex="address" key="address" />
                    <Column title="Điện thoại" dataIndex="phoneNumber" key="phoneNumber" />
                    <Column title="Website" dataIndex="website" key="website" />
                    <Column title="Thao tác" key="action" render={
                        (text, record) => (
                            <span>
                                <Row gutter={24}>
                                { role === "admin" ? 
                                    <span>
                                        <Col span={6}>
                                            <EditModal departmentId={record._id} reloadOnSubmit={reloadOnSubmit} />
                                        </Col>
                                        <Col offset={1} span={6}>
                                            <RemoveModal departmentId={record._id} reloadOnSubmit={reloadOnSubmit} />
                                        </Col>
                                    </span>
                                    : null
                                }
                                </Row>
                            </span>                            
                        ) 
                    } />
                </Table>
            </div>
        )
    }
}

export default DepartmentList