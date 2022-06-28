import React from 'react';
import '../css/Links.css';
import { IoIosWallet } from 'react-icons/io';
import { MdAddLocationAlt } from 'react-icons/md';
import { MdDinnerDining } from 'react-icons/md';
import { BiStoreAlt } from 'react-icons/bi';
const Linkcards = () => {
	const linkdata = [
		{
			title: 'Society Rides',
			subtitle: 'Nonprofit Rideshare',
			logo: 'xdawew',
			link: '/Rides',
		},
		{
			title: 'Society Local List',
			subtitle: 'Certified Local list stakers',
			logo: 'xdawew',
			link: '/Locallist',
		},
		{
			title: 'Society Fare',
			subtitle: '',
			logo: 'xdawew',
			link: '/fare',
		},
		{
			title: 'Society Wallet',
			subtitle: '',
			logo: '<GiWallet/>',
			link: '/Societywallet',
		},
	];
	return (
		<div>
			<div className='d-flex flex-column justify-content-center align-items-center py-5 px-5'>
				<div className='d-flex flex-wrap gap-5'>
					{linkdata.map((item, index) => (
						<a
							href={item.link}
							className='px-3 py-5 gap-2 text-center card link-card text-decoration-none'
							key={index}>
							<div>
								{item.title.toLowerCase() === 'society wallet' && (
									<IoIosWallet size={40} />
								)}
								{item.title.toLowerCase() === 'society fare' && (
									<MdDinnerDining size={40} />
								)}
								{item.title.toLowerCase() === 'society local list' && (
									<BiStoreAlt size={40} />
								)}
								{item.title.toLowerCase() === 'society rides' && (
									<MdAddLocationAlt size={40} className='text-light' />
								)}
							</div>
							<div>
								<span>{item.title}</span>
							</div>
							<div>
								<span>{item.subtitle}</span>
							</div>
						</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Linkcards;
