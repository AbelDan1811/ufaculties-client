import React, {Component} from 'react'
import UserBar from './UserBar'
import AppContext from '../../../AppContext'

const UserBarContainer = (props) => {
        return (
            <AppContext.Consumer>
                { context  => <UserBar 
                    {...{
                        ...context,
                        ...props
                    }} 
                />}
            </AppContext.Consumer>
        )
}

export default UserBarContainer