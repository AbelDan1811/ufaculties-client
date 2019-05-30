import React from 'react'
import {findRootNodes, findChildrenNodes} from '../../services/apis/FieldService'
import { Tabs, Icon, Row, Col, Table, Button} from 'antd'
import FieldTree from './components/FieldTree'
import { Link} from 'react-router-dom'

const {TabPane} = Tabs
const {Column} = Table
class Field extends React.Component {
    state = {
        items : [],
        selectedKeys : [],
        checkedKeys : [],
        users : [],
        reload : false
    }
    
    changeState = newState => {
        this.setState(newState)
    }

    componentWillMount = async () => {
        await this.fetchFields()
    }

    fetchFields = async () => {
        const fulfilledItems = await this._getAllNodes()
        this.setState({
            items : fulfilledItems
        }) 
    }

    _getAllNodes = async () => {
        const {success , data : rootNodes, message} = await findRootNodes()   
        
        if (success && rootNodes.length > 0){
            const validatedRoots = await Promise.all(rootNodes.map(async root => {
                return {
                    id : root._id,
                    name : root.name,
                    children : []
                }
            }))
            const fulfilledRoots = await this._getChildrenByRoots({ rootNodes : validatedRoots })
            return fulfilledRoots
        }
        return []
    }

    _getChildrenByRoots = async ({ rootNodes }) => {
        return await Promise.all(rootNodes.map( async root => {
            const { success, data : children, message} = await findChildrenNodes(root.id)

            if (children.length === 0 || !success)
                return root
            
            const validatedChildren = await Promise.all(children.map(async child => {
                return {
                    id : child._id,
                    name : child.name,
                    children : []
                }
            }))

            const fulfilledChildren = await this._getChildrenByRoots({ rootNodes : validatedChildren })
            const fulfilledRoot = Object.assign({}, root, { children : fulfilledChildren})
            
            return fulfilledRoot
        }))
    }

    
        

    render() {
        const {user} = this.props.appState 
        const {role} = user
        const {items, selectedKeys, checkedKeys} = this.state
        return (
            <div>     
                <Tabs defaultActiveKey="1" size = "large" tabBarGutter={"40vh"}>
                    <TabPane tab={
                            <span>
                                <Icon type="unordered-list" />
                                DANH SÁCH LĨNH VỰC NGHIÊN CỨU
                            </span>
                        } key="1" >
                        <div className='SeparatedTop'>
                            <Row gutter={16}>
                                <Col span={12}> 
                                    <FieldTree 
                                        checkable={role === "admin"? true : false}
                                        items={items}
                                        selectedKeys = {selectedKeys}
                                        checkedKeys = {checkedKeys}
                                        changeState = {this.changeState}
                                        reloadOnSubmit = {this.fetchFields}
                                        user = {user}
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
                                                    </Row>
                                                </span>                            
                                            ) 
                                        } />
                                    </Table>
                                </Col>
                            </Row>
                        </div>
                        
                    </TabPane>
                    
                </Tabs>
            </div>
        )
    }
}

export default Field