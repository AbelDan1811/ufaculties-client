import React from 'react'
import {findUsersByDepartment} from '../../../services/apis/DepartmentService'
import { Table, List, Col, Row,  Icon, Button } from 'antd'
import '../Department.css'
import RemoveUserModal from './modal/RemoveUserModal'
import {Link} from 'react-router-dom'
const {Column} = Table

class DepartmentLookUp extends React.Component {
    state = {
        departmentId : null,
        users : []
    }

    handleClick = async (e) => {
        const departmentId = e.target.id

        this.setState({
            departmentId : departmentId
        })

        const {success, data, message } = await findUsersByDepartment(departmentId) 
        if(success)
            return this.setState({
                users : data
            }) 
        
    }

    fetchUsers = async () => {
        const {departmentId} = this.state
        const {success, data, message } = await findUsersByDepartment(departmentId) 
        if(success)
            return this.setState({
                users : data
            }) 
    }


    render() {
        let {user, items} = this.props
        let {role} = user
        
        return (
            <div className="SeparatedTop">     
                <Row gutter={16}>
                    <Col span={12}> 
                        <List
                            header={<div><Icon type="solution"/>&nbsp;ĐƠN VỊ</div>}
                            bordered
                            size="small"
                            dataSource={items}
                            renderItem={item => (
                                <List.Item >
                                    <Col span={22}>
                                        <div>{item.name}</div>
                                    </Col> 
                                    <Button 
                                        id={item._id} 
                                        onClick ={this.handleClick}
                                        type={ item._id === this.state.departmentId ?  "primary" : "default"}
                                        size="small"  
                                        shape="circle-outline"
                                        icon="right">
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Table 	dataSource = {this.state.users} expandRowByClick= {true}>
                            <Column title="STT" key="index" render = {(text, record, index) => (<span>{ index + 1 }</span>) } />
                            <Column title="Tên giảng viên" key="name" render = {(text, record) => (<span>{ record.lastName + ' ' + record.firstName}</span>)}/>
                            <Column title="Học vị" dataIndex="degree" key="degree" />
                            <Column title="Thao tác" key="action" render={
                                (text, record) => (
                                    <span>
                                        <Row gutter={24}>
                                            <Col span={4}>
                                                <Link to={`/profile/${record._id}`}>
                                                    <Button shape="circle" icon="info-circle" ghost type="primary"></Button>
                                                </Link>
                                            </Col>
                                            { role === "admin" ? 
                                                <span>
                                                    <Col offset={1} span={4}>
                                                        <RemoveUserModal user={record} reloadOnSubmit={this.fetchUsers} />
                                                    </Col>
                                                </span>
                                                : null
                                            }
                                        </Row>
                                    </span>                            
                                ) 
                            } />
                        </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DepartmentLookUp