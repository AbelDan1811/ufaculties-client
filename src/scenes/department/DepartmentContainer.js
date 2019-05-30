import React, {Component} from 'react'
import Department from './Department'
import AppContext from '../../AppContext'

class DepartmentContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                { context  => <Department 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default DepartmentContainer