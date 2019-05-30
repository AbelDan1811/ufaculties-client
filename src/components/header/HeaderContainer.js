import React, {Component} from 'react'
import Header from './Header'
import AppContext from '../../AppContext'

class HeaderContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                { context  => <Header 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default HeaderContainer