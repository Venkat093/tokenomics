import React, { useState } from 'react';
import '../css/stake.css';
const Stake = () => {
	const [stake, setStake] = useState(false);
	return (
		<div className='signup'>
			<div className='container'>
				<div className='content'>
					<p className='sub-title'>Socity Coin</p>
					<h1 className='title'>Staking</h1>
					<p className='description mb-5'>
						Staking gives you the power to earn rewards on your Socity Coin
						Holdings. Start ataking in just couple of kicks and automatically
						earn rewards twice a week. Instantly unstake at any time with no
						penalties
					</p>
				</div>
				<div className='py-5 Stake '>
					<div className='px-3 py-5 gap-4 text-center card stake-card text-light'>
						<div>
							<span>
								<b>Socity Coin</b>
							</span>
						</div>
						<div>
							<span>Yearly rewards</span>
						</div>
						<div>
							<span>4-6%</span>
						</div>
						<div>
							{stake ? (
								<button
									onClick={() => {
										setStake(false);
									}}>
									Stake
								</button>
							) : (
								<button
									onClick={() => {
										setStake(true);
									}}>
									Unstake
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stake;
