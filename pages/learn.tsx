import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Game: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,400;1,100&display=swap" rel="stylesheet" />
            </Head>

            <main className="p-8 flex w-full flex-col sm:flex-row">
                <aside className="flex w-full sm:w-3/12 mr-6">
                    <div className="flex w-full border border-black p-10 rounded-md">
                        hesatn
                    </div>
                </aside>
                <main className="flex w-full">
                    <div className="flex border border-black p-10 w-full rounded-md">
                        htsaetn
                    </div>
                </main>
            </main>
        </div>
    )
}

export default Game
