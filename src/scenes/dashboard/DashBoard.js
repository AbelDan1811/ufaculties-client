import React from 'react'
import {searchAllUsers} from '../../services/apis/UserService'
import { Table, Button, Col, Row, Tabs, Icon } from 'antd'
import { Link } from 'react-router-dom'
import Filter from './components/Filter'
import AddUser from './components/AddUser'
import EditModal from './components/modal/EditModal'
import RemoveModal from './components/modal/RemoveModal'

import './DashBoard.css'

class DashBoard extends React.Component {
    state = {
        items : [],
        query : {},
        page : 1,
        totalPages : null,
        totalItems : null,
        loading : false
    }

    componentWillMount = async () => {
        await this.fetchUsers()
    }


    changeQuery = async (query) => {
        this.setState({
            query,
            loading : true
        })
        await this.fetchUsers()
    }

    fetchUsers = async () =>{
        const {query} = this.state
        const {success , data, message} = await searchAllUsers({ query })  
        if (success){
            const { users , totalPages, total } = data
            this.setState({
                items : users,
                totalPages : totalPages,
                totalItems : total,
                loading : false
            })
        } 
    }

    render() {
        const {Column} = Table
        const {TabPane} = Tabs
        const {user} = this.props.appState 
        const {role,_id} = user 
        return (
            <div>     
                <Tabs defaultActiveKey="1" size = "large" tabBarGutter={300}>
                    <TabPane tab={<span><Icon type="unordered-list" /><b>DANH SÁCH CÁN BỘ</b></span>} key="1" >
                        <div className="SeparatedTop">
                            <div style={{ marginBottom : "3vh"}}> 
                                <Row>
                                    <Col span={16}>
                                        <Filter onChangeQuery={ this.changeQuery } currentUserRole = {role}/>
                                    </Col>
                                    <Col offset={4} span={4}>
                                        <AddUser currentUserRole = {role} fetchUsers = {this.fetchUsers} />
                                    </Col>
                                </Row>  
                                
                            </div>
                            
                            <Table bordered dataSource = {this.state.items} expandRowByClick= {true} loading={this.state.loading}>
                                <Column title="STT" key="index" render = {(text, record, index) => (<span>{ index + 1 }</span>) } />
                                <Column title="Mã CB" dataIndex="officerCode" key="officerCode" />
                                <Column title="Họ tên" key="fullName" render = {(text, record) => (<span>{ record.lastName + ' ' + record.firstName}</span>) } />
                                <Column title="Tài khoản" dataIndex="username" key="username" />
                                <Column title="VNU Email" dataIndex="email" key="email" />
                                <Column title="Loại CB" dataIndex="officerType" key="officerType" />
                                <Column title="Học vị" dataIndex="degree" key="degree" />
                                <Column title="Đơn vị" key="department" render = {(text, record) => (<span>{ record.department ? record.department.name : "" }</span>) } />
                                <Column title="Thao tác" key="action" render={
                                    (text, record) => (
                                        <span>
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Link to={`/profile/${record._id}`}>
                                                        <Button shape="circle" icon="info-circle" ghost type="primary"></Button>
                                                    </Link>
                                                </Col>
                                            { role === "admin" && _id !== record._id? 
                                                <span>
                                                    <Col span={6}>
                                                        <EditModal userId={record._id} reloadOnSubmit={this.fetchUsers} />
                                                    </Col>
                                                    <Col span={6}>
                                                        <RemoveModal userId={record._id} reloadOnSubmit={this.fetchUsers} />
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
                    </TabPane>
                </Tabs>
            </div>


        )
    }
}

export default DashBoard