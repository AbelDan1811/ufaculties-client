import React from 'react'
import { Row, Col, Button, Icon, List, Card} from 'antd'
import EditResearchModal from './modal/EditResearchModal'

class ResearchFields extends React.Component {

    render() {  
        const {user, reloadOnSubmit, requestUser} = this.props
    
        return (
            <Row> 
                <Col offset={2} span={10}>
                    <Card>
                        <List 
                            header={
                                <Row>
                                    <Col span={16}>
                                        <span><Icon type="experiment"/>&nbsp;<b>LĨNH VỰC NGHIÊN CỨU</b></span>
                                    </Col>
                                    {
                                        requestUser._id === user._id ? 
                                        <Col offset = {6} span={2}>
                                            <EditResearchModal user={user} reloadOnSubmit={reloadOnSubmit} />
                                        </Col>
                                        : null
                                    }   
                                </Row>
                            }
                            style={{ fontSize : "16px"}}
                            dataSource={user.researchFields}
                            renderItem = { item => (
                                <List.Item >
                                    {"- "+item.name}
                                </List.Item>
                            )}
                        />
                    </Card>
                    <Card className="SeparatedTop">
                        <List 
                            header={
                                <Row>
                                    <Col span={16}>
                                        <span><Icon type="star"/>&nbsp;<b>LĨNH VỰC QUAN TÂM</b></span>
                                    </Col>
                                </Row>
                            }
                            style={{ fontSize : "16px"}}
                            dataSource={user.interestedFields}
                            renderItem = { item => (
                                <List.Item >
                                    {"- "+item.name}
                                </List.Item>
                            )}
                        />
                    </Card>
                    
                </Col>
            </Row>
        )
    }
}

export default ResearchFields