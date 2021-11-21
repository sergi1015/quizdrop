/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        mongodburl: "mongodb://127.0.0.1:27017/quizdrop",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
    }
}
