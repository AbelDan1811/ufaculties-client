import React from 'react'
import {findDistinctUserDegrees, findDistinctUserTypes} from '../../../services/apis/UserService'
import {findAllDepartments} from '../../../services/apis/DepartmentService'
import { Row, Col, Select, Button, Tooltip } from 'antd'
import AddModal from './modal/AddModal'
import ImportModal from './modal/ImportModal'

class AddUser extends React.Component {
    
    reloadOnSubmit = async () => {
        this.props.fetchUsers()
    }
    
    render() {
        const {currentUserRole} = this.props
        return (
            <div>
                { currentUserRole === "admin" ? 
                <Row gutter = {40}>
                    <Col offset={10} span={2}>
                        <AddModal reloadOnSubmit = {this.reloadOnSubmit}/>
                    </Col> 
                    <Col  span={3}>
                        <ImportModal reloadOnSubmit = {this.reloadOnSubmit} />
                    </Col>
                     
                </Row>
                 : null } 
            </div>
        )
    }
}

export default AddUser