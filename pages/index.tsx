import type { NextPage } from 'next';
import { Page } from "components/index";
import theme from "theme/index";

const Home: NextPage = () => {
    return (
        <Page>
            <main className="flex w-full h-full items-center justify-center">
                <div className="w-3/5 h-4/5">
                    <div className="rounded-xl w-full h-full flex flex-col items-center justify-center" style={{ backgroundColor: theme.colors.darkblue }}>
                        <h1 className="text-white text-6xl">
                            Welcome to <a href="https://quizdrop.net" style={{ color: theme.colors.lightblue }}>Quizdrop</a>
                        </h1>
                        <div className="mt-4 text-xl" style={{ color: theme.colors.gray }}>A revolutionary play-to-earn quiz game on a BSC chain.</div>
                        {/* <div className="flex flex-col my-10">
                            <button className="border py-3 px-8 rounded-md border-black hover:bg-black hover:text-white">Play</button>
                            <button className="border py-3 px-8 rounded-md border-black hover:bg-black hover:text-white mt-2">Learn</button>
                        </div> */}
                    </div>
                </div>
            </main>
        </Page>
    )
}

export default Home
