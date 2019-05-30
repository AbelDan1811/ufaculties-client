import React, {Component} from 'react'
import Profile from './Profile'
import AppContext from '../../AppContext'

class ProfileContainer extends Component {
    render() {
        return (
            <AppContext.Consumer>
                { context  => <Profile 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default ProfileContainer