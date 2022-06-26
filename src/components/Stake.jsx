import React, { useState, useEffect } from 'react';
import '../css/stake.css';
import Web3 from 'web3';
import Stakee from '../abi/Stakee.json';
import fromExponential from 'from-exponential';
import ERC20 from '../abi/ERC20.json';
import { Button, Modal } from 'react-bootstrap';
import logo from '../assets/images/holycity.png';
const Stake = ({ auc, acc, web3main }) => {
	const [stake, setStake] = useState(true);
	const [accountid, setaccountid] = useState();
	const [rewards, setRewards] = useState();
	const [_amount, setAmout] = useState();
	const [staketokenBalance, setStakeTokentBalance] = useState();
	const [show, setShow] = useState(false);
	const [hashValue, setHashValue] = useState();
	const [balence, setBalence] = useState();
	useEffect(async () => {
		if (acc && web3main) {
			// const accounts1 = await window.ethereum.request({ method: 'eth_requestAccounts' });
			const accounts1 = await web3main.eth.getAccounts();
			setaccountid(accounts1[0]);
			// const chainId = await window.ethereum.request({ method: 'eth_chainId' });

			// setchainid(chainId)
		}
	}, [acc, web3main]);
	const approveToken = async (bal) => {
		if (window.ethereum) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			// window.web3 = new Web3(window.ethereum);
			let token = new web3main.eth.Contract(
				ERC20,
				'0xadc22D2bF20d69243c039306bF2c301Ea2c49F14'
			);

			const stakingCOntract = '0x313279fc206E0640DF0e12477A985C41A918f5B6';

			let approveAMount = web3main.utils.toBN(
				fromExponential(parseFloat(bal) * Math.pow(10, 25))
			);

			token.methods
				.approve(stakingCOntract, approveAMount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					stakeAmount('');
				})
				.catch();
		}
	};

	const StakeToken = async (bal) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let token = new web3main.eth.Contract(
				ERC20,
				'0xadc22D2bF20d69243c039306bF2c301Ea2c49F14'
			);

			const stakingCOntract = '0x313279fc206E0640DF0e12477A985C41A918f5B6';

			// let amount = web3main.utils.toBN(
			// 	fromExponential(parseFloat(balence) * Math.pow(10, 18))
			// );
			console.log('bal', bal);
			let amount = web3main.utils.toBN(fromExponential(bal));

			token.methods
				.allowance(userwalletaddresss, stakingCOntract)
				.call({ from: userwalletaddresss })
				.then((result) => {
					if (result >= amount) {
						console.log('stake amount');
						stakeAmount(bal); // stake amount function call
					} else {
						approveToken(bal); // approve token  function call
					}
				})
				.catch();
		}
	};

	const stakeAmount = async (bal) => {
		console.log('calling');
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];
			console.log('ack', accounts);
			// window.web3 = new Web3(window.ethereum);
			console.log('ccc', userwalletaddresss);
			let staking = new web3main.eth.Contract(
				Stakee,
				'0x313279fc206E0640DF0e12477A985C41A918f5B6'
			);

			let amount = web3main.utils.toBN(fromExponential(parseFloat(bal)));

			staking.methods
				.stake(amount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					setHashValue(length);
					setAmout('');
				})
				.catch();
		}
	};
	const withdrawAmount = async () => {
		if (acc && web3main) {
			setShow(false);
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				Stakee,
				'0x313279fc206E0640DF0e12477A985C41A918f5B6'
			);

			let amount = web3main.utils.toBN(
				fromExponential(parseFloat(_amount) * Math.pow(10, 18))
			);
			console.log(amount);
			staking.methods
				.withdraw(amount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					setHashValue(length);
					setAmout('');
				})
				.catch();
		}
	};

	useEffect(() => {
		console.log('earned rewards');
		if (acc && web3main) {
			earnedRewards();
			stakeTokenBalance();
		}
	}, [hashValue, acc, web3main]);

	// useEffect(() => {
	// 	console.log('earned rewards');
	// 	if (acc && web3main) {
	// 		balanceOf();
	// 	}
	// }, [acc, web3main]);
	const earnedRewards = async () => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				Stakee,
				'0x313279fc206E0640DF0e12477A985C41A918f5B6'
			);

			staking.methods
				.earned(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((length) => {
					console.log('data - >', length);
					let value = Math.round(length / 10 ** 18);

					// console.log(
					// 	(25333330000000000000 / 10 ** 18).toLocaleString('fullwide', {
					// 		useGrouping: false,
					// 	})
					// );
					length === '0'
						? setRewards()
						: setRewards(
								(length / 10 ** 18).toLocaleString('fullwide', {
									useGrouping: false,
								})
						  );
				})
				.catch();
		}
	};
	const stakeTokenBalance = async () => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];
			let staking = new web3main.eth.Contract(
				Stakee,
				'0x313279fc206E0640DF0e12477A985C41A918f5B6'
			);
			staking.methods
				.stakeBalanceOfUser(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((length) => {
					setStakeTokentBalance((length / 10 ** 18).toFixed(2));
				})
				.catch();
		}
	};
	const claimRewards = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				Stakee,
				'0x313279fc206E0640DF0e12477A985C41A918f5B6'
			);

			staking.methods
				.getReward()
				.send({ from: userwalletaddresss })
				.then((result) => {
					console.log(result);
					setHashValue(result);
					setAmout('');
				})
				.catch();
		}
	};
	const balanceOf = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let erc20Token = new web3main.eth.Contract(
				ERC20,
				'0xadc22D2bF20d69243c039306bF2c301Ea2c49F14'
			);

			erc20Token.methods
				.balanceOf(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((result) => {
					console.log('balence of ', result);
					StakeToken(Number(result));
					setBalence(Number(result));
				})
				.catch();
		}
	};
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
					<div className='py-3 gap-4 px-1 text-center card stake-card text-light'>
						<div className='SOCIETY-CONTENT'>
							<div className='SCOIETY-ICON'>
								<span className='nav-logo'>
									<img className='logo-img' src={logo} />
								</span>
							</div>
							<div className='SCOIETY-CONTENT'>
								<div className='COINHEADER'>
									<div className='COIN_NAME'>
										<span>Socity Coin</span>
									</div>
									<div className='COIN_VALUE'>
										<span> 20</span>
									</div>
								</div>
								<div className='STAKEBALANCE my-2'>
									<div className='STAKE_NAME'>
										<span> StakeTokenBalanc </span>
									</div>
									<div className='STAKE_VALUE'>
										<span> {staketokenBalance ? staketokenBalance : ''}</span>
									</div>
								</div>
								<div className='STAKEBALANCE my-2'>
									<div className='STAKE_NAME'>
										<span> Rewards </span>
									</div>
									<div className='STAKE_VALUE'>
										<span> {rewards ? rewards : ''}</span>
									</div>
								</div>

								<div className='STAK-CONTENT'>
									<div className=' '>
										<button onClick={claimRewards}>Claim</button>
									</div>
									<div className='Stake'>
										<button onClick={balanceOf}>Stake</button>
									</div>
									<div className='unstake'>
										<button
											onClick={() => {
												setShow(true);
												//withdrawAmount();
											}}>
											Unstake
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div>
				<Modal
					show={show}
					onHide={(e) => {
						setShow(false);
					}}
					backdrop='static'>
					<Modal.Body className=''>
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							className='unstake-modal'>
							<div>
								<input
									type='text'
									placeholder='Amount'
									className='inp '
									value={_amount}
									name='amaount'
									onChange={(e) => {
										setAmout(e.target.value);
									}}
								/>
							</div>
							<div className='modalbutton'>
								<button
									onClick={() => {
										withdrawAmount();
									}}>
									Unstake
								</button>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant='secondary'
							onClick={(e) => {
								withdrawAmount();
								setShow(false);
							}}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default Stake;
