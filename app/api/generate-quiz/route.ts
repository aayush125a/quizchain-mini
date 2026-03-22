import { NextRequest, NextResponse } from "next/server";

const sampleQuestions: Record<string, object[]> = {
  blockchain: [
    { question: "What is Bitcoin?", options: ["A social network", "A decentralized digital currency", "A bank", "A credit card"], answer: 1, explanation: "Bitcoin is the first decentralized cryptocurrency created in 2009." },
    { question: "What is a blockchain?", options: ["A type of database", "A chain of physical blocks", "A banking system", "A social media platform"], answer: 0, explanation: "A blockchain is a distributed database that stores data in linked blocks." },
    { question: "What does ETH stand for?", options: ["Electronic Transfer Hub", "Ether", "Ethereum Hash", "Digital Token"], answer: 1, explanation: "ETH is the native cryptocurrency of the Ethereum network, called Ether." },
    { question: "What is a crypto wallet?", options: ["A physical wallet", "Software to store crypto keys", "A bank account", "An exchange"], answer: 1, explanation: "A crypto wallet stores your private and public keys to access your crypto." },
    { question: "What is DeFi?", options: ["Decentralized Finance", "Digital Files", "Defense Finance", "Default Finance"], answer: 0, explanation: "DeFi stands for Decentralized Finance — financial services without banks." },
  ],
  world: [
    { question: "What is the largest ocean?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2, explanation: "The Pacific Ocean is the largest, covering more than 30% of Earth's surface." },
    { question: "What is the capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"], answer: 2, explanation: "Tokyo is the capital and largest city of Japan." },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2, explanation: "There are 7 continents on Earth." },
    { question: "What is the longest river?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1, explanation: "The Nile River in Africa is the longest river in the world." },
    { question: "What is the smallest country?", options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"], answer: 2, explanation: "Vatican City is the smallest country in the world." },
  ],
  coins: [
    { question: "Who created Bitcoin?", options: ["Elon Musk", "Satoshi Nakamoto", "Vitalik Buterin", "Charles Hoskinson"], answer: 1, explanation: "Bitcoin was created by the pseudonymous Satoshi Nakamoto in 2009." },
    { question: "What is the max supply of Bitcoin?", options: ["18 million", "100 million", "21 million", "Unlimited"], answer: 2, explanation: "Bitcoin has a fixed maximum supply of 21 million coins." },
    { question: "What is Ethereum used for?", options: ["Only payments", "Smart contracts and dApps", "Gaming only", "Social media"], answer: 1, explanation: "Ethereum is a platform for smart contracts and decentralized applications." },
    { question: "What is a stablecoin?", options: ["A coin that never moves", "A crypto pegged to a stable asset", "A government coin", "A mining coin"], answer: 1, explanation: "Stablecoins are cryptocurrencies pegged to stable assets like the US dollar." },
    { question: "What is an altcoin?", options: ["A fake coin", "Any crypto other than Bitcoin", "A gold coin", "A stable coin"], answer: 1, explanation: "Altcoins are all cryptocurrencies other than Bitcoin." },
  ],
  trading: [
    { question: "What is a bull market?", options: ["Market going down", "Market going up", "Stable market", "Volatile market"], answer: 1, explanation: "A bull market refers to a period when prices are rising or expected to rise." },
    { question: "What does HODL mean?", options: ["Hold On for Dear Life", "A typo of Hold", "Both A and B", "Neither"], answer: 2, explanation: "HODL originated as a typo of hold and became Hold On for Dear Life in crypto." },
    { question: "What is a stop loss?", options: ["A profit target", "An order to limit losses", "A trading fee", "A market order"], answer: 1, explanation: "A stop loss is an order to sell when price reaches a certain level to limit losses." },
    { question: "What is market cap?", options: ["Maximum price", "Total value of all coins", "Daily trading volume", "Price per coin"], answer: 1, explanation: "Market cap is the total value calculated by multiplying price by total supply." },
    { question: "What is a candlestick chart?", options: ["A price chart type", "A trading strategy", "A coin type", "An exchange"], answer: 0, explanation: "Candlestick charts display price movement showing open, close, high and low prices." },
  ],
  forex: [
    { question: "What does Forex stand for?", options: ["Foreign Exchange", "Forward Exchange", "Fixed Exchange", "Financial Exchange"], answer: 0, explanation: "Forex stands for Foreign Exchange — the global market for trading currencies." },
    { question: "What is the most traded currency pair?", options: ["GBP/USD", "EUR/USD", "USD/JPY", "AUD/USD"], answer: 1, explanation: "EUR/USD is the most traded currency pair in the world." },
    { question: "What is a pip in forex?", options: ["A trading platform", "Smallest price movement", "A type of order", "A currency"], answer: 1, explanation: "A pip is the smallest price move in a forex pair, usually 0.0001." },
    { question: "What is leverage in trading?", options: ["A type of chart", "Borrowing to increase position size", "A trading fee", "A market order"], answer: 1, explanation: "Leverage allows traders to control larger positions with smaller capital." },
    { question: "When is the forex market open?", options: ["Weekdays only", "24 hours on weekdays", "24/7", "Weekends only"], answer: 1, explanation: "The forex market operates 24 hours a day, 5 days a week." },
  ],
};

export async function POST(req: NextRequest) {
  const { topic } = await req.json();
  const questions = sampleQuestions[topic] || sampleQuestions.blockchain;
  return NextResponse.json({ questions });
}