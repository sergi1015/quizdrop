import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import Image from "next/image";
import { Page } from "components/index";
import theme from "theme/index";
import CircleTimer from "components/CircleTimer";
import { useRouter } from 'next/router';
import { useWeb3React } from "@web3-react/core";
import { injected } from "components/wallet/connectors";
import Spinner from "components/Spinner";

type Question = {
    _id: string,
    question: string,
    options: Array<string>,
    time: number,
    question_number: number
}

const Game: NextPage = () => {
    const { account, activate } = useWeb3React();
    const router = useRouter();
    const { qid } = router.query;
    const [question, setQuestion] = useState < Question > ();
    const [gameStarted, setGameStarted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [answer, setAnswer] = useState<string>();

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    const handleAnswer = (chosen: string) => {
        setAnswer(chosen);
    }

    const handleSubmit = async () => {
        setIsSubmitted(true);
        const response = await fetch(`/api/quiz/submit`, {
            method: 'POST',
            body: JSON.stringify({
                account,
                quiz: qid,
                question: question?._id,
                answer: answer,
             }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        nextQuestion();
    }

    const nextQuestion = () => {
        router.reload();
    }

    useEffect(() => {
        (async () => {
            connect();
            if (qid && account) {
                try {
                    const response = await fetch(`/api/quiz/${qid}`, {
                        method: 'POST',
                        body: JSON.stringify({ account }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const qstn = await response.json();
                    if (!response.ok) throw new Error(qstn.message);

                    if (qstn?.isDone)
                        router.push(`/completed/${qid}`);
                    else
                        setQuestion(qstn);
                } catch (error) {

                }
            }
        })();
    }, [qid, account]);

    return (
        <Page>
            <main className="flex w-full h-full">
                <div className="relative flex flex-col py-10 px-10 md:px-32 w-full overflow-auto rounded-md" style={{ backgroundColor: theme.colors.blue }}>
                    <div className="absolute top-6 left-6">
                        <div className="flex flex-row items-center justify-center">
                            <Image src="/images/quizdrop.png" width={80} height={80} alt="Quizdrop logo" />
                            <div className="flex flex-col hidden md:block">
                                <div className="text-white text-2xl ml-4">QUIZDROP</div>
                                <div className="text-gray-600 text-2xl ml-4 -mt-2">QUIZDROP</div>
                            </div>
                        </div>
                    </div>
                    {gameStarted ?
                        (question ?
                        <>
                            <div className="fixed right-6 top-6 md:right-16 md:top-16">
                                <CircleTimer onComplete={() => { nextQuestion() }} time={question.time} isPlaying={!isSubmitted} />
                            </div>
                            <div className="mt-24 md:mt-2 flex md:flex-grow flex-col items-center justify-center">
                                <div className="text-gray-400 text-lg md:text-xl mb-4">Question # {question.question_number} / 10</div>
                                <div className="text-white text-xl md:text-3xl">{question?.question}</div>
                                <div className="flex flex-col md:flex-row mt-10">
                                    {question?.options.map((option, index) => (
                                        <div onClick={() => handleAnswer(option)} key={index} className={`text-lg cursor-pointer px-6 py-4 border-2  rounded-md mx-6 border-qblue hover:bg-qblue hover:text-white mt-4 md:mt-0 ${(option === answer) ? 'text-white bg-qblue' : 'text-qblue'}`}>
                                            <span className="text-qviolet">{(index + 10).toString(36).toUpperCase()}.</span> {option}
                                        </div>
                                    ))}
                                </div>
                                <div className="my-16">
                                    <button onClick={handleSubmit} className="rounded-full px-10 py-4 bg-qviolet text-white hover:bg-purple-500">Submit</button>
                                </div>
                            </div>
                        </> : null)
                        : <Spinner onCompleted={() => setGameStarted(true) } />
                    }
                </div>
            </main>
        </Page>
    )
}

export default Game
