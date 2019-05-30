import React, {Component} from 'react'
import SignIn from './SignIn'
import AppContext from '../../AppContext'

class SignInContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                { context  => <SignIn 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default SignInContainer