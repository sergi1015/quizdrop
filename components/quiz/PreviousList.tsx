import React, { useState, useEffect } from "react";
import theme from "theme/index";
import dayjs from "dayjs";

interface PreviousListType {
    account: string
}

const PreviousList: React.FC<PreviousListType> = ({ account }) => {
    const [quizzes, setQuizzes] = useState([]);

    const getPreviousQuizzes = async () => {
        try {
            const response = await (fetch('/api/previous_quizzes', {
                method: 'POST',
                body: JSON.stringify({ account }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            const quiz = await response.json();
            if (!response.ok) throw new Error(quiz.message);

            setQuizzes(quiz);
        } catch (error) {

        }
    }

    useEffect(() => {
        if (account) {
            getPreviousQuizzes();
        }
    }, [account]);

    return (
        <div className="mt-4">
            {quizzes.map((quiz) => (
                <div key={quiz.quiz} className="flex flex-row px-4 py-2" style={{ borderColor: theme.colors.violet }}>
                    <div className="flex flex-grow text-sm text-white">
                        {dayjs(quiz.date).format('YYYY-MM-DD')}
                    </div>
                    <div className="flex flex-grow text-sm text-white ml-4">
                        <span style={{ color: theme.colors.lightblue }}>{quiz.reward}</span> &nbsp;Qdrop Rewards
                    </div>
                    <div>
                        {/* <a className="border rounded-full py-1 px-6 cursor-pointer text-qviolet hover:bg-qviolet hover:text-white" style={{ borderColor: theme.colors.violet }}>View</a> */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PreviousList;