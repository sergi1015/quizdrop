import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Image from "next/image";
import { Page } from "components/index";
import theme from "theme/index";
import { useRouter } from 'next/router';
import { useWeb3React } from "@web3-react/core";
import { injected } from "components/wallet/connectors";
import { Fireworks } from 'fireworks-js/dist/react';

type ScoreType = {
    points: Number,
    reward: Number
}

const Completed: NextPage = () => {
    const [score, setScore] = useState<ScoreType>();
    const [fireworkStop, setFireworkStop] = useState(false);
    const { account, activate } = useWeb3React();
    const router = useRouter();
    const { qid } = router.query;

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    useEffect(() => {
        (async () => {
            connect();

            if (qid && account) {
                try {
                    const response = await fetch(`/api/score/calculate`, {
                        method: 'POST',
                        body: JSON.stringify({
                            account,
                            quiz: qid
                         }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const score = await response.json();
                    if (!response.ok) throw new Error(score.message);
                    setScore(score);
                } catch (error) {
                    console.log(error)
                    // router.push('/dashboard');
                }
            }
        })();
    }, [qid, account]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFireworkStop(true);
        }, 10000);
    }, []);

    return (
        <Page>
            {!fireworkStop ? <Fireworks options={{ speed: 3 }} style={{
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                }} />: null }
            <main className="flex w-full h-full justify-center items-center">
                <div className="flex flex-col w-11/12 md:w-2/6">
                    <div className="flex items-center justify-center">
                        <Image src="/images/quizdrop.png" width={80} height={80} alt="Quizdrop logo" />
                    </div>
                    <div style={{ backgroundColor: theme.colors.blue }} className="mt-10 flex flex-col w-full items-center justify-center p-10 rounded-md">
                        <div className="text-white text-xl md:text-3xl text-center">Thank you for playing!</div>
                        {score ?
                            <>
                                <div className="mt-4 text-gray-300 text-lg md:text-xl text-center">Here is you score:</div>
                                <div className="mt-10 text-6xl" style={{ color: theme.colors.lightblue }}>
                                    {score.points} / 10
                                </div>
                                <div className="mt-10 text-gray-300 text-lg md:text-xl">
                                    Rewards: <span style={{ color: theme.colors.violet }}>{score.reward} QDROP</span>
                                </div>
                            </>: null}
                    </div>
                    <div className="mt-10 flex justify-center">
                        <a href="/dashboard" className="rounded-full px-10 py-4 bg-qviolet text-white hover:bg-purple-500">Go back to Dashboard</a>
                    </div>
                </div>
            </main>
        </Page>
    )
}

export default Completed
