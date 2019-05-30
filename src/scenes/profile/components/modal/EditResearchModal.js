import React from 'react'
import { Modal, Button,Tree, Alert, Icon, Card} from 'antd'
import {updateResearchFields} from '../../../../services/apis/UserService'
import {findRootNodes, findChildrenNodes} from '../../../../services/apis/FieldService'
import { notification} from 'antd'

const {TreeNode} = Tree
class EditResearchModal extends React.Component {
    state = { 
        visible: false ,
        error : null,
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
    onCheck = checkedKeys => {
        this.setState({
            checkedKeys
        })
    }

    showModal = async () => {
        const fulfilledNodes = await this._getAllNodes()
        this.setState({
            visible : true,
            expandedKeys : this.props.user.interestedFields.map( f => f._id),
            checkedKeys : this.props.user.researchFields.map( f => f._id),
            items : fulfilledNodes
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


    renderTreeNodes = items => {
        return items.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} dataRef={item}/>
        })
    }


    handleSubmit = async e => {
        e.preventDefault()
        this.setState({
            error : null,
        });

        const { checkedKeys } = this.state
        const { success, data, message} = await updateResearchFields({
            userId : this.props.user._id,
            fieldIds : checkedKeys
        })

        if (!success)
            return this.setState({
                error : message
            })
        
        notification.open({
            message : "Successfully edited the research fields !" ,
            icon : <Icon type="check-circle" style={{ color : "green"}} />
        })

        this.setState({
            visible : false
        })
        await this.props.reloadOnSubmit()
    };

    

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    render() {
        const {error,visible, expandedKeys , autoExpandParent, checkedKeys, items } = this.state
        return (
            <div>
                <Button icon="edit" type="primary" onClick={this.showModal} />
                <Modal
                    centered
                    title="CHỈNH SỬA LĨNH VỰC NGHIÊN CỨU"
                    okText="Sửa"
                    cancelText="Hủy"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    maskClosable={true}
                >
                    <div >
                        { error ?
                            <div className = "SeparatedBottom">
                                <Alert type ="error" closable showIcon message = { error } /> 
                            </div>
                        : null }
                        
                        <Card title="Các lĩnh vực nghiên cứu">
                            <Tree
                                checkable
                                onExpand={this.onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                onCheck={this.onCheck}
                                checkedKeys={checkedKeys}
                                >
                                {this.renderTreeNodes(items)}
                            </Tree>
                        </Card>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default EditResearchModal