import React from 'react'
import { Row, Col, Descriptions, Card} from 'antd'
import EditInfoModal from './modal/EditInfoModal'
import EditAvatarModal from './modal/EditAvatarModal'
import Meta from 'antd/lib/card/Meta';

class UserInfo extends React.Component {
    
    render() {  
        const {user, requestUser, reloadOnSubmit} = this.props
        if (!user)
            return (
                <div>N/A</div>
            )
        return (
            <>
                <Row>
                    <Col offset={2} span={10}>
                        <Descriptions title={
                                <Row>
                                    <Col span={16}>
                                    <h1><b>{ user.degree ? user.degree.toUpperCase() + ". "  : null}{ user.lastName + " " + user.firstName}</b></h1>
                                    </Col>
                                    {
                                        requestUser._id === user._id ? 
                                        <Col offset={6} span={2}>
                                            <EditInfoModal user={user} reloadOnSubmit={reloadOnSubmit}/>
                                        </Col>
                                        : null
                                    }   
                                    
                                </Row>
                            } bordered
                            >
                            <Descriptions.Item label="Mã CB" span={24}>{user.officerCode}</Descriptions.Item>
                            <Descriptions.Item label="Chức vụ" span={24}>{user.officerType}</Descriptions.Item>
                            <Descriptions.Item label="Học vị" span={24}>{user.degree || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Đơn vị" span={24}>{user.department ? user.department.name : "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Email" span={24}>{user.email || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Trang web" span={24}>{user.website || "N/A"}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại" span={24}>{user.phoneNumber || "N/A"}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col offset={2} span={8}>
                        <Card
                            hoverable
                            style={{ width: "100%", height : "70%"}}
                            cover={<img src={ user.avatarUrl ? user.avatarUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />}
                        >
                            <Meta title ={                                    
                                requestUser._id === user._id ? 
                                <Row>
                                    <Col offset={18} span={2}>
                                        <EditAvatarModal user={user} reloadOnSubmit={reloadOnSubmit}/>
                                    </Col>
                                </Row>
                                : null
                            } />
                            
                        </Card>
                    </Col>
                </Row>
            </>
        )
    }
}

export default UserInfo