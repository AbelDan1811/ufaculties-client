import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import AppContext from './AppContext'
import {getCookie} from './helpers/cookies'
import HeaderContainer from './components/header/HeaderContainer'
import SignInContainer from './scenes/signin/SignInContainer'
import DashBoardContainer from './scenes/dashboard/DashBoardContainer'
import DepartmentContainer from './scenes/department/DepartmentContainer'
import FieldContainer from './scenes/field/FieldContainer'
import ProfileContainer from './scenes/profile/ProfileContainer'

import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './App.css'

class App extends Component {
	
	state = {
		user : getCookie('user'),
		token : getCookie('token'),
		current : 'dashboard',
	}

	setGlobalState = (newState) =>{
		this.setState(newState)
	}

	render() {
		const { Content, Footer } = Layout
		return (
			<AppContext.Provider value = {{
				appState : this.state,
				setGlobalState : this.setGlobalState		
			}}>
				<Layout className="TotalLayout layout">
					<HeaderContainer />
					<Content className = "ContentOuter">
						<div className = "ContentInner">
							<Switch>
								<Route exact path='/signin' component={SignInContainer}/>
								<Route exact path={['/dashboard','/']} component={DashBoardContainer}/>
								<Route exact path={'/departments'} component={DepartmentContainer} />
								<Route exact path={'/fields'} component={FieldContainer} />
								<Route path='/profile/:userId' component={ProfileContainer} />
							</Switch>
						</div>
					</Content>
					<Footer className = "Footer">Đại học Công nghệ - Đại học Quốc gia Hà Nội</Footer>
				</Layout>
			</AppContext.Provider>
		)
		
	}
}

export default App;
