import React, {Component} from 'react'
import UserBar from './UserBar'
import AppContext from '../../../AppContext'

class UserBarContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                { context  => <UserBar 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default UserBarContainer