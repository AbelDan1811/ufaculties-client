import React from 'react'
import {Card, Tree, Row, Col, Button } from 'antd'
import {findUsersByField} from '../../../services/apis/FieldService'
import AddModal from './modal/AddModal'
import EditModal from './modal/EditModal'
import RemoveModal from './modal/RemoveModal'

const {TreeNode} = Tree

class FieldTree extends React.Component {
    state = {
        expandedKeys : [],
        autoExpandParent : true,
        checkedKeys : [],
        items : []
    }

    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
      };
    
    
    
    onSelect = async (selectedKeys, info) => {
        const fieldId = selectedKeys[0]
        const {success, data, message} = await findUsersByField(fieldId)
        if (success) {
            this.setState({
                selectedKey : fieldId
            })
            return this.props.changeState({
                selectedKeys,
                users : data 
            })
        }        
    }

    onCheck = checkedKeys => {
        this.props.changeState({
            checkedKeys
        })
    }

    renderTreeNodes = items => {
        return items.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={this.nodeTitle(item)} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} dataRef={item}/>
        })
    }

    nodeTitle = (item) =>{
        const {role} = this.props.user
        return (
            <Row gutter={16}>
                <Col span={15}>
                    <span>{item.name}</span>
                </Col>
                {item.id === this.state.selectedKey && role === "admin" ? 
                    <Col offset={3} span={6}>
                        <div>
                            <AddModal parentField={item} reloadOnSubmit={this.props.reloadOnSubmit} />
                            <EditModal field={item} reloadOnSubmit={this.props.reloadOnSubmit} />
                            <RemoveModal field={item} reloadOnSubmit={this.props.reloadOnSubmit} />
                        </div>
                        
                    </Col>
                    
                    : null 
                }
            </Row>
        )
    }

    cardTitle = (checkable) => {
        if (checkable) 
            return (
                <div>
                    <Row gutter={16}> 
                        <Col span={12}>
                           <div>Lĩnh vực nghiên cứu</div>
                        </Col>
                        <Col offset={7} span = {3}>
                            <AddModal reloadOnSubmit={this.props.reloadOnSubmit} />
                        </Col>
                    </Row>
                </div>
            )
        return (
            <p>Lĩnh vực nghiên cứu</p>
        )
    }

    render(){
        const {items, checkable, selectedKeys, checkedKeys} = this.props 
        return (
            <Card title={this.cardTitle(checkable)}>
                <Tree
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    onSelect={this.onSelect}
                    selectedKeys={selectedKeys}
                    >
                    {this.renderTreeNodes(items)}
                </Tree>
            </Card>
        )
    }
}

export default FieldTree