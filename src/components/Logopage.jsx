import React from 'react';
import image from '../assets/images/holyy.png';
import '../css/logo.css';
const Logopage = () => {
	return (
		<div className='py-5 text-light'>
			<div className='logo-image'>
				<img src={image} alt='super1' />
			</div>
		</div>
	);
};

export default Logopage;
