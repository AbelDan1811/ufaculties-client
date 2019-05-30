import React from 'react'
import {findAllDepartments} from '../../services/apis/DepartmentService'
import { Tabs, Icon, Divider } from 'antd'
import DepartmentList from './components/DepartmentList'
import DepartmentLookUp from './components/DepartmentLookUp';

class Department extends React.Component {
    state = {
        items : []
    }

    componentWillMount = async () => {
        await this.fetchDepartments()
    }

    fetchDepartments = async () => {
        const {success , data, message} = await findAllDepartments()  
        if (success){
            this.setState({
                items : data
            })
        } 
    }

    render() {
        
        const {TabPane} = Tabs
        let {user} = this.props.appState 
        return (
            <div>     
                <Tabs defaultActiveKey="1" size = "large" tabBarGutter={"40vh"}>
                    <TabPane tab={
                            <span>
                                <Icon type="unordered-list" />
                                DANH SÁCH ĐƠN VỊ
                            </span>
                        } key="1" >
                        <DepartmentList user={user} items={this.state.items} reloadOnSubmit={this.fetchDepartments} />
                    </TabPane>
                    <TabPane tab={
                            <span>
                                <Icon type="search" />
                                TRA CỨU CÁN BỘ
                            </span>
                        } key="2" >
                        <DepartmentLookUp user={user} items={this.state.items} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Department