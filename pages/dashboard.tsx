import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import { Page } from "components/index";
import theme from "theme/index";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import { injected } from "components/wallet/connectors";
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import PreviousList from "components/quiz/PreviousList";
import StudyMaterial from "components/quiz/StudyMaterial";
import Web3 from "web3";
import dayjs from "dayjs";
import {
    lockService,
    unlockService,
    checkLockService,
    checkRewardService,
    balanceService,
    gameExpService,
    claimService,
    getClaimService
} from "common/service";

const textLimit = (text: string | undefined, count: number) => {
    if (text == undefined) return '';
    return text?.slice(0, count) + (text?.length > count ? "..." : "");
}

const Dashboard: NextPage = () => {
    const router = useRouter();
    const { account, connector, activate } = useWeb3React();
    const [balance, setBalance] = useState(0);
    const [lockedToken, setLockedToken] = useState(0);
    const [claimableRewards, setClaimableRewards] = useState(0);
    const [lastClaim, setLastClaim] = useState('');
    const [gameExp, setGameExp] = useState(0);
    const [claimHistory, setClaimHistory] = useState([]);

    async function connect() {
        try {
            await activate(injected, null, true);
        } catch (ex) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: ex.message
            })
        }
    }

    const play = async () => {
        try {
            const response = await (fetch('/api/check_available_quiz', {
                method: 'POST',
                body: JSON.stringify({account}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            const quiz = await response.json();
            if (! response.ok) throw new Error(quiz.message);

            Swal.fire({
                title: 'Game Time',
                text: "Press play to enter the game.",
                icon: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Play Now'
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push(`/game/${quiz.id}`);
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'You want to play the game?',
                text: error.message
            })
        }
    }

    const handleUpcomingQuiz = async () => {
        try {
            const response = await fetch('/api/upcoming_quiz');
            const duration = await response.json();
            if (!response.ok) throw new Error(duration.message);

            Swal.fire({
                icon: 'question',
                title: 'Upcoming Game?',
                text: `${duration.time} left for your next daily quiz.`
            })
        } catch (error) {

        }
    }

    const lock = async () => {
        const { value: numOfToken } = await Swal.fire({
            title: 'Select Number of Tokens',
            input: 'select',
            inputOptions: {
                2: '2 Qdrop',
                4: '4 Qdrop',
                6: '6 Qdrop',
                8: '8 Qdrop',
                10: '10 Qdrop'
            },
            inputPlaceholder: 'Select number of tokens',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value && value !== '') {
                        resolve(null);
                    } else {
                        resolve('You need to select number of tokens.');
                    }
                })
            }
        })

        if (numOfToken > 0) {
            const response = await lockService(connector, numOfToken, account);

            if (response) {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).fire({
                    icon: 'success',
                    title: 'Locked successfully'
                });

                setTimeout(function () {
                    getBalance();
                    getLockedToken();
                }, 5000);
            }
        }
    }

    const unlock = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to unlock your tokens?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await unlockService(connector, account);

                if (response) {
                    Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    }).fire({
                        icon: 'success',
                        title: 'Unlocked successfully'
                    });

                    setTimeout(function () {
                        getBalance();
                        getLockedToken();
                    }, 5000);
                }
            }
        })
    }

    const claim = async () => {
        if (claimableRewards > 0) {
            const response = await claimService(connector, claimableRewards, account);

            if (response) {
                Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                }).fire({
                    icon: 'success',
                    title: `Claimed ${claimableRewards} Qdrop successfully`
                });

                setTimeout(function () {
                    getBalance();
                    getClaimableRewards();
                 }, 5000);
            }
        }
    }

    const getBalance = async () => {
        const data = await balanceService(account);
        setBalance(data.balance);
    }

    const getGameExp = async () => {
        const data = await gameExpService(account);
        setGameExp(data.exp);
    }

    const getLockedToken = async () => {
        const token = await checkLockService(connector, account);
        setLockedToken(token);
    }

    const getClaimableRewards = async () => {
        const totalRewards = await checkRewardService(connector, account);
        const rewardsEther = Web3.utils.fromWei(totalRewards[0], 'ether');
        setClaimableRewards(Number.parseFloat(rewardsEther));
        console.log(totalRewards[1])
        setLastClaim(totalRewards[1]);
    }

    const getClaimHistory = async () => {
        const list = await getClaimService(account);
        setClaimHistory(list || []);
    }

    useEffect(() => {
        connect();
    }, []);

    useEffect(() => {
        (async () => {
            if (account) {
                try {
                    getBalance();
                    getGameExp();
                    getLockedToken();
                    getClaimableRewards();
                    getClaimHistory();
                } catch (error) {
                    console.log(error)
                }
            }
        })();
    }, [account]);

    return (
        <Page>
            <main className="flex w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
                    <div className="col-span-4">
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col w-full h-full mb-4 p-10" style={{ backgroundColor: theme.colors.blue }}>
                                <h1 className="flex flex-grow text-white text-2xl">Hi, Welcome!</h1>
                                <div>
                                    <div className="flex flex-row mt-6 px-4 py-4 border" style={{ borderColor: theme.colors.violet }}>
                                        <div className="flex flex-grow text-sm text-white">
                                            Account
                                        </div>
                                        <div className="text-right" style={{ color: theme.colors.lightblue }}>
                                            {textLimit(account?.toString(), 20)}
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-6 px-4 py-4 border" style={{ borderColor: theme.colors.violet }}>
                                        <div className="flex flex-grow text-sm text-white">
                                            Token Balance
                                        </div>
                                        <div className="text-right" style={{ color: theme.colors.lightblue }}>
                                            Qdrop {balance}
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-6 px-4 py-4 border" style={{ borderColor: theme.colors.violet }}>
                                        <div className="flex flex-grow text-sm text-white">
                                            Locked Token
                                        </div>
                                        <div className="text-right" style={{ color: theme.colors.lightblue }}>
                                            Qdrop {lockedToken && (lockedToken[0] ? (lockedToken[1] * 2) : 0)}
                                        </div>
                                    </div>
                                    <div className="flex flex-row mt-6 px-4 py-4 border" style={{ borderColor: theme.colors.violet }}>
                                        <div className="flex flex-grow text-sm text-white">
                                            Game Exp
                                        </div>
                                        <div className="text-right" style={{ color: theme.colors.lightblue }}>
                                            {gameExp}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full h-full p-10" style={{ backgroundColor: theme.colors.blue }}>
                                <h1 className="flex text-white text-2xl mb-4">Claim History</h1>
                                {claimHistory.map((claim) => (
                                    <div key={claim.datetime} className="flex flex-row px-4 py-2" style={{ borderColor: theme.colors.violet }}>
                                        <div className="flex flex-grow text-sm text-white">
                                            {dayjs(claim.datetime).format('YYYY-MM-DD HH:mm:ss')}
                                        </div>
                                        <div className="flex flex-grow text-sm text-white ml-4">
                                            <span style={{ color: theme.colors.lightblue }}>{claim.tokens}</span> &nbsp;Qdrop
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 order-first md:order-none" style={{ backgroundColor: theme.colors.blue }}>
                        <div className="flex flex-col w-full h-full p-10 items-center justify-center" style={{ backgroundColor: theme.colors.blue }}>
                            <div className="w-full flex items-center justify-center">
                                <Image src="/images/quizdrop.png" width={150} height={150} alt="Quizdrop logo" />
                            </div>
                            <div className="w-full">
                                <button className="rounded-full w-full py-4 text-white">Learn, play and earn.</button>
                            </div>
                            {account ?
                            <>
                            <div className="w-full mt-10">
                                <button className="rounded-full w-full py-4 border-4 text-qblue hover:bg-qblue hover:text-white" style={{ borderColor: theme.colors.lightblue }} onClick={play}>Play</button>
                            </div>
                            <div className="w-full mt-6">
                                {lockedToken && lockedToken[0] ?
                                <button className="rounded-full w-full py-4 border-4 text-qblue hover:bg-qblue hover:text-white" style={{ borderColor: theme.colors.lightblue }} onClick={unlock}>Unlock Token</button> :
                                <button className="rounded-full w-full py-4 border-4 text-qblue hover:bg-qblue hover:text-white" style={{ borderColor: theme.colors.lightblue }} onClick={lock}>Lock Token</button>
                                }
                            </div>
                            <div className="w-full mt-6">
                                <button onClick={claim} className="rounded-full w-full py-4 border-4 text-qblue hover:bg-qblue hover:text-white" style={{ borderColor: theme.colors.lightblue }}>
                                    <div>Claim {claimableRewards} Qdrop</div>
                                    { lastClaim ?
                                    <div style={{ color: theme.colors.violet }} className="text-sm">Last Claim: {dayjs(Number.parseInt(lastClaim) * 1000).format('MMM DD, YYYY  - HH:mm')}</div>
                                    : null
                                    }
                                </button>
                            </div>
                            <div className="w-full mt-6">
                                <button onClick={handleUpcomingQuiz} className="rounded-full w-full py-4 border-4 text-qblue hover:bg-qblue hover:text-white" style={{ borderColor: theme.colors.lightblue }}>Upcoming quizzes</button>
                            </div>
                            </> :
                            <div className="w-full mt-10">
                                <button onClick={connect} className="rounded-full w-full py-4 border-4 text-qblue hover:bg-qblue hover:text-white" style={{ borderColor: theme.colors.lightblue }}>Connect</button>
                            </div>}

                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col h-full">
                            <div className="flex flex-col w-full h-full mb-4 p-10" style={{ backgroundColor: theme.colors.blue }}>
                                <h1 className="flex text-white text-2xl">Study Sources</h1>
                                <StudyMaterial />
                            </div>
                            <div className="flex flex-col w-full h-full p-10" style={{ backgroundColor: theme.colors.blue }}>
                                <h1 className="flex text-white text-2xl">Your Previous Quizzes</h1>
                                <PreviousList account={account} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Page>
    )
}

export default Dashboard
