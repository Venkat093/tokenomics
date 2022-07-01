import React, { useState, useEffect } from 'react';
import '../css/stake.css';
import Web3 from 'web3';
import Stakee from '../abi/Stakee.json';
import stake2 from '../abi/Stake2.json';
import fromExponential from 'from-exponential';
import ERC20 from '../abi/ERC20.json';
import { Button, Modal } from 'react-bootstrap';
import logo from '../assets/images/holycity.png';
import societycoinlog from '../assets/images/SOCIETYCOINLOGO.png';
const Stake = ({ auc, acc, web3main }) => {
	const [stake, setStake] = useState(true);
	const [accountid, setaccountid] = useState();
	const [rewards, setRewards] = useState();
	const [_amount, setAmout] = useState();
	const [staketokenBalance, setStakeTokentBalance] = useState();
	const [show, setShow] = useState(false);
	const [hashValue, setHashValue] = useState();

	const [balence, setBalence] = useState();
	const [socitybal, setSocietybal] = useState();
	const [staketokenBalancee, setStakeTokentBalancee] = useState();
	const [balencee, setBalencee] = useState();
	const [showw, setShoww] = useState(false);
	const [rewardss, setRewardss] = useState();
	const [_amountt, setAmoutt] = useState();
	const [hashValuee, setHashValuee] = useState();
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

			const stakingCOntract = '0x56C10DFA766015b58d0831193a7DFE017e65729a';

			let approveAMount = web3main.utils.toBN(
				fromExponential(parseFloat(bal) * Math.pow(10, 25))
			);

			token.methods
				.approve(stakingCOntract, approveAMount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					stakeAmount(bal);
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

			const stakingCOntract = '0x56C10DFA766015b58d0831193a7DFE017e65729a';

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
				'0x56C10DFA766015b58d0831193a7DFE017e65729a'
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
				'0x56C10DFA766015b58d0831193a7DFE017e65729a'
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
			societybalance();
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
				'0x56C10DFA766015b58d0831193a7DFE017e65729a'
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
				'0x56C10DFA766015b58d0831193a7DFE017e65729a'
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
				'0x56C10DFA766015b58d0831193a7DFE017e65729a'
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
					StakeToken(fromExponential(result));
				})
				.catch();
		}
	};
	const societybalance = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let erc20Token = new web3main.eth.Contract(
				ERC20,
				'0xadc22D2bF20d69243c039306bF2c301Ea2c49F14'
			);
			// console.log(
			// 	(25333330000000000000 / 10 ** 18).toLocaleString('fullwide', {
			// 		useGrouping: false,
			// 	})
			// );

			erc20Token.methods
				.balanceOf(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((result) => {
					console.log('balence of society coin ', result);
					//	StakeToken(Number(result));
					setBalence(
						(result / 10 ** 18).toLocaleString('fullwide', {
							useGrouping: false,
						})
					);
				})
				.catch();
		}
	};

	const approveTokenn = async (bal) => {
		if (window.ethereum) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			// window.web3 = new Web3(window.ethereum);
			let token = new web3main.eth.Contract(
				ERC20,
				'0x314E34BBA56f38ef08577a55EFF0aC4FEe65d1CB'
			);

			const stakingCOntract = '0xBaeC09961FD6b56d1301830108f5628E340b4F6D';

			let approveAMount = web3main.utils.toBN(
				fromExponential(parseFloat(bal) * Math.pow(10, 25))
			);

			token.methods
				.approve(stakingCOntract, approveAMount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					stakeAmountt(bal);
				})
				.catch();
		}
	};

	const StakeTokenn = async (bal) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let token = new web3main.eth.Contract(
				ERC20,
				'0x314E34BBA56f38ef08577a55EFF0aC4FEe65d1CB'
			);

			const stakingCOntract = '0xBaeC09961FD6b56d1301830108f5628E340b4F6D';

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
						console.log('stake amount', bal);
						stakeAmountt(bal); // stake amount function call
					} else {
						approveTokenn(bal); // approve token  function call
					}
				})
				.catch();
		}
	};

	const stakeAmountt = async (bal) => {
		console.log('calling');
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];
			console.log('ack', accounts);
			// window.web3 = new Web3(window.ethereum);
			console.log('ccc', userwalletaddresss);
			let staking = new web3main.eth.Contract(
				stake2,
				'0xBaeC09961FD6b56d1301830108f5628E340b4F6D'
			);

			let amount = web3main.utils.toBN(fromExponential(parseFloat(bal)));

			staking.methods
				.stake(amount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					setHashValuee(length);
					setAmoutt('');
				})
				.catch();
		}
	};
	const withdrawAmountt = async () => {
		if (acc && web3main) {
			setShoww(false);
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				stake2,
				'0xBaeC09961FD6b56d1301830108f5628E340b4F6D'
			);

			let amount = web3main.utils.toBN(
				fromExponential(parseFloat(_amountt) * Math.pow(10, 18))
			);
			console.log(amount);
			staking.methods
				.withdraw(amount)
				.send({ from: userwalletaddresss })
				.then((length) => {
					console.log(length);
					setHashValue(length);
					setAmoutt('');
				})
				.catch();
		}
	};

	// useEffect(() => {
	// 	console.log('earned rewards');
	// 	if (acc && web3main) {
	// 		earnedRewards();
	// 		stakeTokenBalance();
	// 		societybalance();
	// 	}
	// }, [hashValue, acc, web3main]);

	// useEffect(() => {
	// 	console.log('earned rewards');
	// 	if (acc && web3main) {
	// 		balanceOf();
	// 	}
	// }, [acc, web3main]);
	const earnedRewardss = async () => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				stake2,
				'0xBaeC09961FD6b56d1301830108f5628E340b4F6D'
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
						? setRewardss()
						: setRewardss(
								(length / 10 ** 18).toLocaleString('fullwide', {
									useGrouping: false,
								})
						  );
				})
				.catch();
		}
	};
	const stakeTokenBalancee = async () => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			let userwalletaddresss = accounts[0];
			let staking = new web3main.eth.Contract(
				stake2,
				'0xBaeC09961FD6b56d1301830108f5628E340b4F6D'
			);
			staking.methods
				.stakeBalanceOfUser(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((length) => {
					setStakeTokentBalancee((length / 10 ** 18).toFixed(2));
				})
				.catch();
		}
	};
	const claimRewardss = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let staking = new web3main.eth.Contract(
				stake2,
				'0xBaeC09961FD6b56d1301830108f5628E340b4F6D'
			);

			staking.methods
				.getReward()
				.send({ from: userwalletaddresss })
				.then((result) => {
					console.log(result);
					setHashValuee(result);
					setAmoutt('');
				})
				.catch();
		}
	};
	const balanceOff = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let erc20Token = new web3main.eth.Contract(
				ERC20,
				'0x314E34BBA56f38ef08577a55EFF0aC4FEe65d1CB'
			);

			erc20Token.methods
				.balanceOf(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((result) => {
					console.log('balence of ', result);
					StakeTokenn(fromExponential(result));
				})
				.catch();
		}
	};
	const societybalancee = async (e) => {
		if (acc && web3main) {
			const accounts = await web3main.eth.getAccounts();
			//  console.log(accounts);
			let userwalletaddresss = accounts[0];

			let erc20Token = new web3main.eth.Contract(
				ERC20,
				'0x314E34BBA56f38ef08577a55EFF0aC4FEe65d1CB'
			);
			// console.log(
			// 	(25333330000000000000 / 10 ** 18).toLocaleString('fullwide', {
			// 		useGrouping: false,
			// 	})
			// );

			erc20Token.methods
				.balanceOf(userwalletaddresss)
				.call({ from: userwalletaddresss })
				.then((result) => {
					console.log('balence of society coin ', result);
					//	StakeToken(Number(result));
					setBalencee(
						(result / 10 ** 18).toLocaleString('fullwide', {
							useGrouping: false,
						})
					);
				})
				.catch();
		}
	};
	useEffect(() => {
		console.log('earned rewards');
		if (acc && web3main) {
			earnedRewardss();
			stakeTokenBalancee();
			societybalancee();
		}
	}, [hashValuee, acc, web3main]);
	return (
		<div className='signup'>
			<div className='container'>
				<div className='py-5 Stake d-flex gap-5  px-4 '>
					<div className='py-3 gap-4 px-1 text-center card stake-card text-light'>
						<div className='SOCIETY-CONTENT '>
							<div className='SCOIETY-ICON'>
								<span className='nav-logo'>
									<img className='logo-img' src={societycoinlog} />
								</span>
							</div>
							<div className='SCOIETY-CONTENT mx-5'>
								<div className='COINHEADER'>
									<div className='COIN_NAME'>
										<span>SOCIETYCOIN</span>
									</div>
									<div className='COIN_VALUE'>
										<span style={{ width: '10%' }}>
											{' '}
											{balence ? balence : ''}
										</span>
									</div>
								</div>
								<div className='STAKEBALANCE my-2'>
									<div className='STAKE_NAME'>
										<span> STORED SOCIETYCOIN </span>
									</div>
									<div className='STAKE_VALUE'>
										<span> {staketokenBalance ? staketokenBalance : ''}</span>
									</div>
								</div>
								<div className='STAKEBALANCE my-2'>
									<div className='STAKE_NAME'>
										<span> REWARDS </span>
									</div>
									<div className='STAKE_VALUE'>
										<span> {rewards ? rewards : ''}</span>
									</div>
								</div>

								<div className='STAK-CONTENT my-3'>
									<div className=' '>
										<button onClick={claimRewards}>RECEIVE GIFTS</button>
									</div>
									<div className='Stake'>
										<button onClick={balanceOf}>STORE COINS</button>
									</div>
									<div className='unstake'>
										<button
											onClick={() => {
												setShow(true);
												//withdrawAmount();
											}}>
											REMOVE COINS FROM VAULT TO SEND
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='py-5 Stake d-flex gap-5  px-4 '>
					<div className='py-3 gap-4 px-1 text-center card stake-card text-light'>
						<div className='SOCIETY-CONTENT '>
							<div className='SCOIETY-ICON'>
								<span className='nav-logo'>
									<img className='logo-imgg' src={logo} />
								</span>
							</div>
							<div className='SCOIETY-CONTENT mx-5'>
								<div className='COINHEADER'>
									<div className='COIN_NAME'>
										<span>SOCIETYKEY</span>
									</div>
									<div className='COIN_VALUE d-flex flex-wrap'>
										<span> {balencee ? balencee : ''}</span>
									</div>
								</div>
								<div className='STAKEBALANCE my-2'>
									<div className='STAKE_NAME'>
										<span> STORED SOCIETYKEY </span>
									</div>
									<div className='STAKE_VALUE'>
										<span> {staketokenBalancee ? staketokenBalancee : ''}</span>
									</div>
								</div>
								<div className='STAKEBALANCE my-2'>
									<div className='STAKE_NAME'>
										<span> REWARDS </span>
									</div>
									<div className='STAKE_VALUE'>
										<span> {rewardss ? rewardss : ''}</span>
									</div>
								</div>

								<div className='STAK-CONTENT '>
									<div className=' '>
										<button onClick={claimRewardss}>RECEIVE GIFTS</button>
									</div>
									<div className='Stake'>
										<button onClick={balanceOff}>STORE COINS</button>
									</div>
									<div className='unstake'>
										<button
											onClick={() => {
												setShoww(true);
												//withdrawAmount();
											}}>
											REMOVE COINS FROM VAULT TO SEND
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
				<Modal
					show={showw}
					onHide={(e) => {
						setShoww(false);
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
									value={_amountt}
									name='amaount'
									onChange={(e) => {
										setAmoutt(e.target.value);
									}}
								/>
							</div>
							<div className='modalbutton'>
								<button
									onClick={() => {
										withdrawAmountt();
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
								//withdrawAmountt();
								setShoww(false);
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
