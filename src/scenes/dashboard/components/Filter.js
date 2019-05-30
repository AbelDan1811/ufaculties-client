import React from 'react'
import {findDistinctUserDegrees, findDistinctUserTypes} from '../../../services/apis/UserService'
import {findAllDepartments} from '../../../services/apis/DepartmentService'
import { Row, Col, Select, Button, Tooltip, Input } from 'antd'

class Filter extends React.Component {
    state = {
        query : {},
        types : [],
        degrees : [],
        departments : [],
        keyword : ''
    }

    componentWillMount = async () => {
        const [ types , degrees , departments ] = await Promise.all([
            this._fetchTypes(),
            this._fetchDegrees(),
            this._fetchDepartments()
        ])
        return this.setState({
            types ,
            degrees ,
            departments
        })
    }

    handleSubmit = () =>{
        const {query} = this.state
        console.log(query)
        return this.props.onChangeQuery(query)
    }
    
    handleSelectChange = (key) => (value) => {
        const {query} = this.state

        if (value)
            query[key] = value
        else 
            delete query[key]
        this.setState({
            query
        })
    }

    handleInputChange = (e) => {
        const {query} = this.state
        const {value} = e.target
           
        if (value) 
            query['firstName'] = value
        else 
            delete query['firstName']
        return this.setState({
            query,
            keyword : value
        })
        
        
    }

    _fetchTypes = async () => {
        const {success, data, message} = await findDistinctUserTypes()
        if (success)
            return data
        return []
    }
    
    _fetchDegrees = async () => {
        const {success, data, message} = await findDistinctUserDegrees()
        if (success)
            return data
        return []
    }

    _fetchDepartments = async () => {
        const { success, data, message } = await findAllDepartments()
        if (success)
            return data
        return []
    }

    render() {
        const {types, degrees, departments, keyword} = this.state
        const {Option} = Select
        return (
            <div >
                <Row gutter = {16}>
                    <Col span={5}>
                        <Input allowClear id="keyword" placeholder="Từ khóa" onChange={this.handleInputChange} value={keyword} style = {{ width : '100%'}} />                            
                    </Col>
                    <Col span={5}>
                        <Select allowClear id="officerType" placeholder="Loại Cán bộ" onChange={this.handleSelectChange("officerType")} style = {{ width : '100%'}}>
                            { types.map( (type) => {
                                return <Option  value={type} >{type}</Option>
                            })}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Select allowClear id="degree" placeholder="Học vị" onChange={this.handleSelectChange("degree")} style = {{ width : '100%'}}>
                            { degrees.map( (degree) => {
                                return <Option value={degree}>{degree}</Option>
                            })}
                        </Select>
                    </Col>
                    <Col span={5}>
                        <Select allowClear id="department" placeholder="Đơn vị" onChange={this.handleSelectChange("department")} style = {{ width : '100%'}}>
                            { departments.map( (department) => {
                                return <Option  value={department._id}>{department.name}</Option>
                            })}
                        </Select>
                    </Col>
                    <Col span={3}>
                        <Button onClick={this.handleSubmit} type="primary" >Truy vấn</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Filter