import React, {Component} from 'react'
import DashBoard from './DashBoard'
import AppContext from '../../AppContext'

class DashBoardContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                { context  => <DashBoard 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default DashBoardContainer