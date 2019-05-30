import React, {Component} from 'react'
import Field from './Field'
import AppContext from '../../AppContext'

class FieldContainer extends Component {
    render() {

        return (
            <AppContext.Consumer>
                { context  => <Field 
                    {...{
                        ...context,
                        ...this.props
                    }} 
                />}
            </AppContext.Consumer>
        )
    }
}

export default FieldContainer