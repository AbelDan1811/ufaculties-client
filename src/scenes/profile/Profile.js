import React from 'react'
import {findUser} from '../../services/apis/UserService'
import {Tabs, Icon,  Row, Col, Spin, Button} from 'antd'
import UserInfo from './components/UserInfo'
import ResearchFields from './components/ResearchFields'
import {clearCookie } from '../../helpers/cookies'


const {TabPane} = Tabs

class Profile extends React.Component {
    state = {
        user : null,
        loading : true
    }

    onClickLogout = async () => {
        clearCookie()
        await this.props.setGlobalState({
            user : null,
            token : null
        })
        console.log(this.props.appState)
        window.location.href = '/';
    }

    componentWillMount = async () => {
        await this.fetchUser()
    }

    fetchUser = async () => {
        const {userId} = this.props.match.params
        const {success, data, message} = await findUser(userId)
        if (success) {
            this.setState({
                user : data,
                loading : false
            })
        }
    }

    render() {  
        const {user : requestUser } = this.props.appState
        const {user, loading} = this.state
        if (loading && !user) 
            return (
                <Spin size="large"></Spin>
            )
        return (
            <div>     
                <Tabs defaultActiveKey="1" size = "large" tabBarGutter={1000}>
                    <TabPane tab={
                                <span>
                                    <Icon type="user" />
                                    <b>HỒ SƠ CÁN BỘ</b> 
                                </span> 
                        } key="1" >
                        {
                            requestUser && requestUser._id === user._id ? 
                                <Row gutter={16}>
                                    <Col offset={20} span={2}>
                                        <Button type="primary" icon="logout" ghost onClick={this.onClickLogout}>Đăng xuất</Button>
                                    </Col>
                                </Row> 
                            : null 
                        }
                        
                        <div className="SeparatedTop">
                            <UserInfo requestUser={this.props.appState.user} reloadOnSubmit={this.fetchUser} user={user} />
                        </div>
                        <div className="SeparatedTop"> 
                            <ResearchFields requestUser={this.props.appState.user} reloadOnSubmit={this.fetchUser} user={user} />
                        </div>
                        
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Profile