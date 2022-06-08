import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navbar copy';
import Release from './components/Release';
function App() {
	const [theme, setTheme] = useState('dark');
	const changeTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};
	//<Navbar changeTheme={changeTheme} currentTheme={theme} />
	return (
		<div data-theme={theme} className='app-container'>
			<Navbar />
			<Home />
			<Release />
			<Footer />
		</div>
	);
}

export default App;
