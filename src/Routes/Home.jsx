import React, { useState } from 'react';
import Home from '../components/Home';
import Release from '../components/Release';

const Landing = () => {
	const [theme, setTheme] = useState('dark');
	const changeTheme = () => {
		theme === 'dark' ? setTheme('light') : setTheme('dark');
	};
	return (
		<div>
			<Home />
			<Release />
		</div>
	);
};

export default Landing;
