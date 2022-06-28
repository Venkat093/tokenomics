import React, { useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import release1 from '../assets/images/assets/release1.png';
import release2 from '../assets/images/assets/release2.png';
import Card from '../components/Card';
import '../css/Release.css';
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(Tooltip, Title, ArcElement, Legend);
const data = {
	datasets: [
		{
			data: [10, 20, 30],
			backgroundColor: ['red', 'blue', 'yellow'],
		},
	],
	// These labels appear in the legend and in the tooltips when hovering different arcs
	labels: ['Red', 'Yellow', 'Blue'],
};
export default function Release() {
	const [data, setData] = useState({
		datasets: [
			{
				data: [15, 35, 15, 15, 20],
				backgroundColor: [
					'#FF5757',
					'#D91665',
					'#A2006F',
					'#62006D',
					'#000161',
				],
			},
		],
		// These labels appear in the legend and in the tooltips when hovering different arcs
		labels: [
			`Staking & Rewards ${'15%'}`,
			`Presale ${'35%'}`,
			`Development & Team ${'15%'}`,
			`Tresurey & ecosystem ${'15%'}`,
			`Ineqyuty ${'20%'}`,
		],
	});
	return (
		<div className='releases'>
			<div className='release green '>
				<div className='card-container  '>
					<div className='App py-2' style={{ width: '400px', height: '400px' }}>
						<Doughnut className='chart' data={data} />
					</div>
					<div className='ellipse orange'></div>
				</div>
			</div>
		</div>
	);
}
