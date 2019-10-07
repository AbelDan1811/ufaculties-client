import React, {Component} from 'react'
import Header from './Header'
import AppContext from '../../AppContext'

const HeaderContainer = (props) => {
        return (
            <AppContext.Consumer>
                { context  => <Header 
                    {...{
                        ...context,
                        ...props
                    }} 
                />}
            </AppContext.Consumer>
        )
}

export default HeaderContainer