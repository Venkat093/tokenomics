import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';
import Landing from './Routes/Home.jsx';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navbar copy';
import Stake from './components/Stake.jsx';
import Release from './components/Release';
function App() {
	const [theme, setTheme] = useState('dark');
	const changeTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};
	//<Navbar changeTheme={changeTheme} currentTheme={theme} />
	return (
		// <div data-theme={theme} className='app-container'>
		// 	<Navbar />
		// 	<Home />
		// 	<Release />
		// 	<Footer />
		// </div>
		<div data-theme={theme} className='app-container'>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Landing />
					</Route>
					<Route exact path='/Stake' component={Stake}></Route>
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
