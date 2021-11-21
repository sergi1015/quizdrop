import type { NextPage } from 'next';
import Head from 'next/head';

const Page: NextPage = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Quizdrop</title>
                <meta name="description" content="A revolutionary play-to-earn quiz game on a BSC chain." />
                <link rel="icon" href="images/quizdrop.png"></link>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;1,100&display=swap" rel="stylesheet" />
            </Head>

            <main className="p-8 flex w-full sm:flex-row h-screen">
                { children }
            </main>
        </div>
    )
}

export default Page;
