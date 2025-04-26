import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import PredictionCard from "./Component/PredictionCard.js";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import PredictionPage from './PredictionPage';
import './App.css';


//////////////////Web3 Imports///////////////////////
import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts, useWriteContract } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { formatEther, parseEther } from 'viem';
import type { Address, Abi } from 'viem';
import { form } from 'wagmi/chains';


gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const liquiditySectionRef = useRef<HTMLDivElement | null>(null);
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const predictionSectionRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  ////////////////Web3 Constants///////////////////

  const ROUTER_ADDRESS: Address = '0xEC9Bf10d059Aa5307F1B721eA3036477127Df4bd';
  const ROUTER_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_WETH",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "WETH",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountADesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBDesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenDesired",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "addLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountIn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveOut",
          "type": "uint256"
        }
      ],
      "name": "getAmountOut",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsIn",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        }
      ],
      "name": "getAmountsOut",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "reserveB",
          "type": "uint256"
        }
      ],
      "name": "quote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidity",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "removeLiquidityETH",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountTokenMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETHMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "approveMax",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "removeLiquidityETHWithPermit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountToken",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountETH",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenA",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenB",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountAMin",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountBMin",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "approveMax",
          "type": "bool"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "removeLiquidityWithPermit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amountA",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountB",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapETHForExactTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactETHForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForETH",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountIn",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountOutMin",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapExactTokensForTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountInMax",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapTokensForExactETH",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amountOut",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountInMax",
          "type": "uint256"
        },
        {
          "internalType": "address[]",
          "name": "path",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        }
      ],
      "name": "swapTokensForExactTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "amounts",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ] as const;

  const TOKEN_SWAP_ADDRESS: Address = '0xb3996774f1f6c05ba5b2e1ed3be9f74b227dbc84';
  const TOKEN_SWAP_ABI = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Burn",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "name": "Mint",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1In",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "Swap",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve0",
          "type": "uint112"
        },
        {
          "indexed": false,
          "internalType": "uint112",
          "name": "reserve1",
          "type": "uint112"
        }
      ],
      "name": "Sync",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "DOMAIN_SEPARATOR",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "MINIMUM_LIQUIDITY",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "PERMIT_TYPEHASH",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount0",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "factory",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getReserves",
      "outputs": [
        {
          "internalType": "uint112",
          "name": "_reserve0",
          "type": "uint112"
        },
        {
          "internalType": "uint112",
          "name": "_reserve1",
          "type": "uint112"
        },
        {
          "internalType": "uint32",
          "name": "_blockTimestampLast",
          "type": "uint32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_token0",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_token1",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "kLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "mint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "liquidity",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "nonces",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "deadline",
          "type": "uint256"
        },
        {
          "internalType": "uint8",
          "name": "v",
          "type": "uint8"
        },
        {
          "internalType": "bytes32",
          "name": "r",
          "type": "bytes32"
        },
        {
          "internalType": "bytes32",
          "name": "s",
          "type": "bytes32"
        }
      ],
      "name": "permit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price0CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price1CumulativeLast",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "skim",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount0Out",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount1Out",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "swap",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "sync",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token0",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token1",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] as const;

  const TOKEN_A_ADDRESS: Address = '0x63599aE00A7A43FaDBc2B72E1390ccbCdd0d455B';
  const TOKEN_B_ADDRESS: Address = '0x81960374004ca95499a720027f76c04871e0DFC2';

  ////////////////Web3 Hooks///////////////////////
  const { address, isConnected, chain } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: writeContractResult, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();
  const { writeContractAsync } = useWriteContract();
  const [isCalculating, setIsCalculating] = useState(false);

  ////////////////Contract Component States///////////////////////
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [swapFromAmount, setSwapFromAmount] = useState('');
  const [swapFromToken, setSwapFromToken] = useState(TOKEN_A_ADDRESS);
  const [swapToToken, setSwapToToken] = useState(TOKEN_B_ADDRESS);
  const [swapToAmount, setSwapToAmount] = useState('');


  /////////////////Web3 Functions///////////////////////
  const { data: reserves, refetch: refetchAmountsOut } = useReadContract({
    abi: TOKEN_SWAP_ABI,
    address: TOKEN_SWAP_ADDRESS,
    functionName: 'getReserves',
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  });



  const { data: amountOutDataSwap, refetch: refetchAmountsOutSwap } = useReadContract({
    abi: ROUTER_ABI,
    address: ROUTER_ADDRESS,
    functionName: 'getAmountsOut',
    args: [
      swapFromAmount ? parseEther(swapFromAmount) : BigInt(0),
      [TOKEN_A_ADDRESS, TOKEN_B_ADDRESS],
    ],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  });

  const handleAddLiquidity = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!tokenAAmount || !tokenBAmount || isNaN(parseFloat(tokenAAmount)) || isNaN(parseFloat(tokenBAmount)) || parseFloat(tokenAAmount) <= 0 || parseFloat(tokenBAmount) <= 0) {
      alert("Please enter valid, positive amounts for both tokens.");
      return;
    }
    if (!ROUTER_ADDRESS || !TOKEN_A_ADDRESS || !TOKEN_B_ADDRESS) {
      alert("Contract details or token addresses are missing.");
      return;
    }

    console.log(`Attempting to add liquidity: ${tokenAAmount} Token A (${TOKEN_A_ADDRESS}), ${tokenBAmount} Token B (${TOKEN_B_ADDRESS})`);


    alert("Placeholder: In a real app, ensure token approvals are confirmed before proceeding."); // Remove this in production


    // Assuming approvals are done (needs proper implementation)
    try {
      // --- TODO: Adjust functionName and args based on your actual contract ---

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
      const amountADesired = parseEther(tokenAAmount); // Assumes 18 decimals
      const amountBDesired = parseEther(tokenBAmount); // Assumes 18 decimals
      // WARNING: Slippage calculation below is basic (1%). Needs proper price ratio check.
      const amountAMin = parseEther((parseFloat(tokenAAmount) * 0.99).toString());
      const amountBMin = parseEther((parseFloat(tokenBAmount) * 0.99).toString());

      const tx = await writeContractAsync({
        abi: ROUTER_ABI,
        address: ROUTER_ADDRESS,
        functionName: 'addLiquidity', // Replace with your contract's exact function name
        args: [
          TOKEN_A_ADDRESS, // Example arg: tokenA
          TOKEN_B_ADDRESS, // Example arg: tokenB
          amountADesired,
          amountBDesired,
          amountAMin,
          amountBMin,
          address, // Recipient of LP tokens
          BigInt(deadline)
        ],

        // chainId: chain?.id // Optional: specify chain if needed
      });

      console.log("Transaction", tx);
      console.log("Add liquidity transaction sent...");
      // Clear inputs on successful send (optional)
      // setTokenAAmount('');
      // setTokenBAmount('');

    } catch (error) {
      console.error("Error preparing add liquidity transaction:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleSwap = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!swapFromAmount || isNaN(parseFloat(swapFromAmount)) || parseFloat(swapFromAmount) <= 0 || !swapFromToken || !swapToToken) {
      alert("Please enter a valid positive amount and ensure both tokens are selected.");
      return;
    }

    if (swapFromToken === swapToToken) {
      alert("Cannot swap a token for itself.");
      return;
    }

    console.log(`Attempting to swap ${swapFromAmount} ${swapFromToken} for ${swapToToken}`);


    // }
    alert("Placeholder: In a real app, ensure token approval is confirmed before proceeding."); // Remove this in production


    try {

      const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
      const amountIn = parseEther(swapFromAmount); // Assumes 18 decimals

      const amountOutMin = parseEther("0"); // TODO: Replace with slippage calculation

      writeContract({
        abi: ROUTER_ABI,
        address: ROUTER_ADDRESS as `0x${string}`,
        functionName: 'swapExactTokensForTokens', // Replace with your contract's function name
        args: [
          amountIn,
          amountOutMin,
          [swapFromToken as `0x${string}`, swapToToken as `0x${string}`], // path (can be longer if multi-hop)
          address, // recipient
          BigInt(deadline),
        ],
        // --- TODO: Add `value` if swapping FROM native currency (e.g., ETH) ---

      });
      console.log("Swap transaction sent...");
      // Clear input on successful send (optional)
      // setSwapFromAmount('');

    } catch (error) {
      console.error("Error preparing swap transaction:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };


  useEffect(() => {
    // Navbar background change on scroll
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 100) {
        nav.style.backgroundColor = "rgba(10, 10, 20, 0.9)";
        (nav.style as any).backdropFilter = "blur(10px)";
      } else {
        nav.style.backgroundColor = "transparent";
        (nav.style as any).backdropFilter = "none";
      }
    };

    window.addEventListener('scroll', handleScroll);

    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.from('.hero-text span', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.8,
        ease: 'elastic.out(1, 0.5)'
      });

      gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.5,
        repeat: -1,
        yoyo: true
      });

      // Section animations
      ScrollTrigger.create({
        trigger: liquiditySectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.liquidity-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.liquidity-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: swapSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.swap-description', {
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
          });
          gsap.from('.swap-card', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.3
          });
        }
      });

      ScrollTrigger.create({
        trigger: predictionSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.from('.prediction-card', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        }
      });

    }, mainRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!swapFromAmount || swapFromAmount === '0' || swapFromAmount === '') {
      setTokenBAmount('');
      return;
    }
    const calculateTokenBAmount = async () => {
      try {
        setIsCalculating(true);
        await refetchAmountsOutSwap();
        console.log("sawp to amount", amountOutDataSwap);
        if (amountOutDataSwap && amountOutDataSwap.length > 1) {
          const amountB = formatEther(amountOutDataSwap[1]);
          setSwapToAmount(amountB);
        }
      } catch (error) {
        console.error("Error calculating Token B amount:", error);
        setSwapToAmount('');
      } finally {
        setIsCalculating(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      calculateTokenBAmount();
    }, 500); // Debounce to avoid too many requests

    return () => clearTimeout(debounceTimer);
  }, [swapFromAmount, amountOutDataSwap, refetchAmountsOut]);

  useEffect(() => {
    refetchAmountsOut();
    const [reserveA, reserveB] = reserves || [BigInt(0), BigInt(0)];
    const ratio = Number(reserveB) / Number(reserveA);
    console.log("Calculating Token B amount...");
    console.log("Token A Amount:", tokenAAmount);
    console.log("Reserve A:", reserveA);
    console.log("Reserve B:", reserveB);
    if (tokenAAmount && reserveA > 0 && reserveB > 0) {
      console.log("Calculating Token B amount with reserves...");
      const calculatedB = (parseFloat(tokenAAmount) * ratio).toFixed(18);
      setTokenBAmount(calculatedB);
    }
  }, [tokenAAmount]);


  const scrollToSection = (ref: any) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const handlePredictionCardClick = (asset: string) => {
    navigate(`/prediction/${encodeURIComponent(asset)}`);
  };


  //////////////////////////////Prediction Card Logic//////////////////////////////////////

  const CRYPTO_POOL_ABI = [
    {
      "type": "function",
      "name": "FEE_PERCENTAGE",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "PRECISION",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "STALE_PRICE_THRESHOLD",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "claimRewards",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "getConfig",
      "inputs": [],
      "outputs": [
        { "name": "predictAmount_", "type": "uint256", "internalType": "uint256" },
        { "name": "cryptoTargeted_", "type": "string", "internalType": "string" }, // Fixed typo: targated → targeted
        { "name": "oracleAdapter_", "type": "address", "internalType": "address" },
        { "name": "resolveTimestamp_", "type": "uint256", "internalType": "uint256" },
        { "name": "participationDeadline_", "type": "uint256", "internalType": "uint256" },
        { "name": "minStake_", "type": "uint256", "internalType": "uint256" },
        { "name": "initialized_", "type": "bool", "internalType": "bool" },
        { "name": "resolved_", "type": "bool", "internalType": "bool" },
        { "name": "greaterThan_", "type": "bool", "internalType": "bool" },
        { "name": "globalFee_", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getStats",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "userBetGreaterThan_", "type": "bool", "internalType": "bool" },
        { "name": "userStake_", "type": "uint256", "internalType": "uint256" },
        { "name": "totalFor_", "type": "uint128", "internalType": "uint128" },
        { "name": "totalAgainst_", "type": "uint128", "internalType": "uint128" },
        { "name": "stakeFor_", "type": "uint256", "internalType": "uint256" },
        { "name": "stakeAgainst_", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getTokens",
      "inputs": [],
      "outputs": [
        { "name": "highAddr_", "type": "address", "internalType": "address" },
        { "name": "highTotal_", "type": "uint256", "internalType": "uint256" },
        { "name": "highMax_", "type": "uint256", "internalType": "uint256" },
        { "name": "lowAddr_", "type": "address", "internalType": "address" },
        { "name": "lowTotal_", "type": "uint256", "internalType": "uint256" },
        { "name": "lowMax_", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "initialize",
      "inputs": [
        { "name": "predictAmount_", "type": "uint256", "internalType": "uint256" },
        { "name": "cryptoTargeted_", "type": "string", "internalType": "string" }, // Fixed typo
        { "name": "oracleAdapter_", "type": "address", "internalType": "address" },
        { "name": "resolveTimestamp_", "type": "uint256", "internalType": "uint256" },
        { "name": "participationDeadline_", "type": "uint256", "internalType": "uint256" },
        { "name": "minStake_", "type": "uint256", "internalType": "uint256" },
        { "name": "highBetTokenAddress_", "type": "address", "internalType": "address" },
        { "name": "lowBetTokenAddress_", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "predict",
      "inputs": [
        { "name": "prediction", "type": "bool", "internalType": "bool" },
        { "name": "stakeAmount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "resolve",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdrawFees",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    // Events
    {
      "type": "event",
      "name": "HighBetTokenAwarded",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "LowBetTokenAwarded",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Predicted",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "prediction", "type": "bool", "indexed": false, "internalType": "bool" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Resolved",
      "inputs": [
        { "name": "greaterThan", "type": "bool", "indexed": false, "internalType": "bool" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "RewardClaimed",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    // Errors
    { "type": "error", "name": "AlreadyInit", "inputs": [] },
    { "type": "error", "name": "AlreadyResolved", "inputs": [] },
    { "type": "error", "name": "AmountMismatch", "inputs": [] },
    { "type": "error", "name": "BelowMinStake", "inputs": [] },
    { "type": "error", "name": "DeadlinePassed", "inputs": [] },
    { "type": "error", "name": "MaxSupplyReached", "inputs": [] },
    { "type": "error", "name": "NoStake", "inputs": [] },
    { "type": "error", "name": "NoWinningStake", "inputs": [] },
    { "type": "error", "name": "NotInit", "inputs": [] },
    { "type": "error", "name": "NotOwner", "inputs": [] },
    { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] },
    { "type": "error", "name": "ResolveTooEarly", "inputs": [] },
    { "type": "error", "name": "RewardAlreadyClaimed", "inputs": [] },
    { "type": "error", "name": "ScaleOverflow", "inputs": [] },
    { "type": "error", "name": "StalePrice", "inputs": [] },
    { "type": "error", "name": "TransferFailed", "inputs": [] }
  ] as const;
  const CRYPTO_POOL_ADDRESSES = {
    "BTC": "0x20d39847f01386820e30bc0af5e5733147e363dc",
    "FLR": "0x3ede4e9ebc046eefe822189573d44e378577ef10",
    "DOGE": "0x6ac56d3767009f42d3ab849fdb1b088d1a9143fc",
  }

  const FTSO_ABI = [
    {
      type: "function",
      name: "getPriceFeed",
      inputs: [
        { name: "_feedName", type: "string", internalType: "string" }
      ],
      outputs: [
        { name: "_feedValue", type: "uint256", internalType: "uint256" },
        { name: "_decimal", type: "int8", internalType: "int8" },
        { name: "_timestamp", type: "uint64", internalType: "uint64" }
      ],
      stateMutability: "view" // Changed from nonpayable to view
    },
    // ... other ABI entries
  ] as const;
  const FTSO_ADDRESS = "0x9035681200aAA554E61B2D13319991c5ABCB92C8";

  const [prices, setPrices] = useState({
    BTC: '0.000',
    FLR: '0.000',
    DOGE: '0.000'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  //////////Price Fetching////////////////

  const { data: priceDataBTC, refetch: refetchPriceDataBTC } = useReadContract({
    abi: FTSO_ABI,
    address: FTSO_ADDRESS,
    functionName: 'getPriceFeed',
    args: ['BTC'],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  })
  const { data: priceDataFLR, refetch: refetchPriceDataFLR } = useReadContract({
    abi: FTSO_ABI,
    address: FTSO_ADDRESS,
    functionName: 'getPriceFeed',
    args: ['FLR'],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  })
  const { data: priceDataDOGE, refetch: refetchPriceDataDOGE } = useReadContract({
    abi: FTSO_ABI,
    address: FTSO_ADDRESS,
    functionName: 'getPriceFeed',
    args: ['DOGE'],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  })

  const formatPrice = (rawValue: bigint, decimals: number): string => {
    const adjustedValue = Number(rawValue) / (10 ** decimals);
    return (Math.floor(adjustedValue * 1000) / 1000).toFixed(3);
  };

  // Fetch and update prices
  const handleRefreshPrices = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Execute all price fetches in parallel
      const [btcResult, flrResult, dogeResult] = await Promise.all([
        refetchPriceDataBTC(),
        refetchPriceDataFLR(),
        refetchPriceDataDOGE()
      ]);

      // Update state with formatted values
      setPrices({
        BTC: formatPrice(btcResult.data?.[0] || 0n, priceDataBTC?.[1] ?? 8),
        FLR: formatPrice(flrResult.data?.[0] || 0n, priceDataFLR?.[1] ?? 8),
        DOGE: formatPrice(dogeResult.data?.[0] || 0n, priceDataDOGE?.[1] ?? 8)
      });
    } catch (err) {
      setError('Failed to fetch prices. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleRefreshPrices();
  }, []);


  ///////////End-in Fetching///////////////

  type PoolConfig = [
    predictAmount_: bigint,
    cryptoTargeted_: string,
    oracleAdapter_: Address,
    resolveTimestamp_: bigint,
    participationDeadline_: bigint,
    minStake_: bigint,
    initialized_: boolean,
    resolved_: boolean,
    greaterThan_: boolean,
    globalFee_: bigint
  ];

  const [deadlines, setDeadlines] = useState({
    BTC: "0",
    FLR: "0",
    DOGE: "0"
  })



  const { data: configDataBtc, refetch: refetchConfigDataBtc } = useReadContract({
    abi: CRYPTO_POOL_ABI,
    address: CRYPTO_POOL_ADDRESSES.BTC as Address,
    functionName: 'getConfig',
    query: {
      enabled: false
    }
  })

  const { data: configDataFlr, refetch: refetchConfigDataFlr } = useReadContract({
    abi: CRYPTO_POOL_ABI,
    address: CRYPTO_POOL_ADDRESSES.FLR as Address,
    functionName: 'getConfig',
    query: {
      enabled: false
    }
  })

  const { data: configDataDoge, refetch: refetchConfigDataDoge } = useReadContract({
    abi: CRYPTO_POOL_ABI,
    address: CRYPTO_POOL_ADDRESSES.DOGE as Address,
    functionName: 'getConfig',
    query: {
      enabled: false
    }
  })

  const handleTimestamps = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Execute all price fetches in parallel
      const [btcTime, flrTime, dogeTime] = await Promise.all([
        refetchConfigDataBtc(),
        refetchConfigDataFlr(),
        refetchConfigDataDoge()

      ]);
      // Update state with formatted values
      setDeadlines({
        BTC: formatTimestamp((btcTime.data as unknown as PoolConfig)?.[4]?.toString() || "0"),
        FLR: formatTimestamp((flrTime.data as unknown as PoolConfig)?.[4]?.toString() || "0"),
        DOGE: formatTimestamp((dogeTime.data as unknown as PoolConfig)?.[4]?.toString() || "0")
      });
    } catch (err) {
      setError('Failed to fetch prices. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (deadline: string) => {
    // Convert to numbers and validate
    const deadlineTimestamp = parseInt(deadline, 10);
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

    if (isNaN(deadlineTimestamp)) return 'Invalid deadline';

    const remainingSeconds = deadlineTimestamp - currentTimestamp;

    // Handle expired or invalid times
    if (remainingSeconds <= 0) return 'Expired';

    // Calculate time units
    const days = Math.floor(remainingSeconds / 86400); // 1 day = 86400 seconds
    const hours = Math.floor((remainingSeconds % 86400) / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);

    // Build human-readable format
    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`); // Always show minutes if no other units

    return parts.join(' ');
  };

  console.log("test for deadline", formatTimestamp("1720216800"))

  useEffect(() => {
    handleTimestamps();
    handleVolume();
  }, []);


  ////////////Progress fetching///////////////////////

  //@To-Do: Add progress fetching logic here after adding initializing timestamp to the contract


  ////////////////Volume fetching/////////////////////// 

  type PoolStats = [
    userBetGreaterThan_: boolean,
    userStake_: bigint,
    totalFor_: bigint,
    totalAgainst_: bigint,
    stakeFor_: bigint,
    stakeAgainst_: bigint
  ];

  const { data: volumeDataBtc, refetch: refetchVolumeDataBtc } = useReadContract({
    abi: CRYPTO_POOL_ABI,
    address: CRYPTO_POOL_ADDRESSES.BTC as Address,
    functionName: 'getStats',
    args: [address as Address],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  })

  const { data: volumeDataFlr, refetch: refetchVolumeDataFlr } = useReadContract({
    abi: CRYPTO_POOL_ABI,
    address: CRYPTO_POOL_ADDRESSES.FLR as Address,
    functionName: 'getStats',
    args: [address as Address],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  })

  const { data: volumeDataDoge, refetch: refetchVolumeDataDoge } = useReadContract({
    abi: CRYPTO_POOL_ABI,
    address: CRYPTO_POOL_ADDRESSES.DOGE as Address,
    functionName: 'getStats',
    args: [address as Address],
    query: {
      enabled: false // We'll manually trigger this when needed
    }
  })

  const [volumes, setVolumes] = useState({
    BTC: '0.000',
    FLR: '0.000',
    DOGE: '0.000'
  });

  const handleVolume = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [btcResult, flrResult, dogeResult] = await Promise.all([
        refetchVolumeDataBtc(),
        refetchVolumeDataFlr(),
        refetchVolumeDataDoge()
      ])

      setVolumes({
        BTC: formatEther((btcResult.data as unknown as PoolStats)[4]).toString(),
        FLR: formatEther((flrResult.data as unknown as PoolStats)[4]).toString(),
        DOGE: formatEther((dogeResult.data as unknown as PoolStats)[4]).toString()
      });
    } catch (err) {
      setError('Failed to fetch prices. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }



  return (
    <>
      <div ref={mainRef} className="app-container">
        {/* Navbar */}
        <nav ref={navRef} className="navbar">
          <div className="nav-content">
            <div className="nav-logo">WEB3</div>
            <div className="nav-links">
              <button onClick={() => scrollToSection(heroRef)}>Home</button>
              <button onClick={() => scrollToSection(liquiditySectionRef)}>Liquidity</button>
              <button onClick={() => scrollToSection(swapSectionRef)}>Swap Tokens</button>
              <button onClick={() => scrollToSection(predictionSectionRef)}>Prediction</button>
            </div>
       
            <div className="wallet-connect">
              {isConnected ? (
                <button
                  className="action-btn gradient-pulse connected"
                  onClick={() => disconnect()}
                >
                  <span className="truncated-address">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                  <span className="disconnect-label">Disconnect</span>
                </button>
              ) : (
                <button
                  className="action-btn gradient-pulse"
                  onClick={() => connect({ connector: injected() })}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </nav>

        <video autoPlay muted loop className="background-video">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-woman-using-her-credit-card-41596-large.mp4" type="video/mp4" />
        </video>

        {/* Hero Section */}
        <div ref={heroRef} className="hero-section">
          <div className="content-container">
            <header className="hero">
              <h1 className="hero-text">
                WEB3 REVOLUTION
              </h1>
              <p className="hero-description">
                The next evolution of the internet is here. Experience decentralized finance with our cutting-edge platform.
              </p>
              <div className="scroll-indicator">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </div>
            </header>
          </div>
        </div>

        {/* Liquidity Section */}
        <div ref={liquiditySectionRef} className="section-container">
          <div className="content-container">
            <div className="section-content">
              <div className="liquidity-description">
                <h2>Liquidity Pools</h2>
                <p>
                  Provide liquidity to decentralized exchanges and earn passive income through trading fees and yield farming rewards.
                  Our platform offers competitive APYs and minimal impermanent loss protection.
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">$42.8B</div>
                    <div className="stat-label">Total Value Locked</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">1.2M</div>
                    <div className="stat-label">Active Providers</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">12-48%</div>
                    <div className="stat-label">Average APY</div>
                  </div>
                </div>
              </div>
              <div className="liquidity-card section-card">
                <div className="card-content">
                  <h2>Add Liquidity</h2>
                  <p>Provide liquidity to earn passive income through trading fees and rewards</p>
                  <div className="card-actions">
                    <input type="number" placeholder="Token Amount" onKeyUp={(e) => { setTokenAAmount(e.target.value) }} />
                    <input type="number" placeholder="Token Amount" value={tokenBAmount} />
                    <button className="action-btn pulse" onClick={handleAddLiquidity}>Add Liquidity</button>
                  </div>
                  <div className="card-stats">
                    <div className="stat">
                      <span className="value">$42.8B</span>
                      <span className="label">Total Locked</span>
                    </div>
                    <div className="stat">
                      <span className="value">12-48%</span>
                      <span className="label">APY Range</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Section */}
        <div ref={swapSectionRef} className="section-container">
          <div className="content-container">
            <div className="section-content reverse">
              <div className="swap-description">
                <h2 className="gradient-text">Token Swaps</h2>
                <p className="glow-text">
                  Trade tokens instantly with optimal pricing and minimal slippage.
                  Our advanced routing algorithm scans multiple DEXs to find you the best rates.
                </p>
                <div className="stats-grid">
                  <div className="stat-item pulse-glow">
                    <div className="stat-value">$1.2B</div>
                    <div className="stat-label">24h Volume</div>
                  </div>
                  <div className="stat-item pulse-glow">
                    <div className="stat-value">0.05%</div>
                    <div className="stat-label">Average Fee</div>
                  </div>
                  <div className="stat-item pulse-glow">
                    <div className="stat-value">12s</div>
                    <div className="stat-label">Avg. Swap Time</div>
                  </div>
                </div>
              </div>

              <div className="swap-card section-card neo-glass">
                <div className="card-content">
                  <h2 className="card-title">Swap Tokens</h2>
                  <p className="card-subtitle">Get the best rates across DeFi</p>

                  <div className="card-actions">
                    <div className="swap-input-container neo-inset">
                      <input type="number" placeholder="0.0" className="swap-amount-input" onKeyUp={(e) => { setSwapFromAmount(e.target.value) }} />
                      <div className="token-select-wrapper">
                        <select className="token-select-right">
                          <option value="ETH">ETH</option>
                          <option value="BTC">BTC</option>
                          <option value="USDC">USDC</option>
                          <option value="DAI">DAI</option>
                        </select>
                        <div className="token-icon eth-icon"></div>
                      </div>
                    </div>

                    <div className="swap-arrow-container">
                      <div className="swap-arrow-circle">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="swap-arrow-icon">
                          <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    <div className="swap-input-container neo-inset">
                      <input type="number" placeholder="0.0" className="swap-amount-input" value={swapToAmount} />
                      <div className="token-select-wrapper">
                        <select className="token-select-right">
                          <option value="USDC">USDC</option>
                          <option value="ETH">ETH</option>
                          <option value="BTC">BTC</option>
                          <option value="DAI">DAI</option>
                        </select>
                        <div className="token-icon usdc-icon"></div>
                      </div>
                    </div>

                    <button className="action-btn gradient-pulse" onClick={handleSwap}> {isCalculating ? <span>Calculating...</span> : <span>Swap Now</span>}

                    </button>
                  </div>

                  <div className="rate-info">
                    <span className="rate-label">Best rate:</span>
                    <span className="rate-value">1 ETH = 1,850.42 USDC</span>
                  </div>

                  <div className="card-stats">
                    <div className="stat">
                      <span className="value">0.05%</span>
                      <span className="label">Fee</span>
                    </div>
                    <div className="stat">
                      <span className="value">$1.2B</span>
                      <span className="label">Volume 24h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Section */}


        {/* // Inside your component's return statement: */}
        <div ref={predictionSectionRef} className="section-container full-width">
          <div className="content-container">
            <h2 className="section-title">Prediction Markets</h2>
            <p className="section-subtitle">Trade on future price movements with AI-powered insights</p>

            <div className="prediction-cards-container">
              <PredictionCard
                asset="BTC"
                currentPrice={prices.BTC}
                priceChange={2.4}
                timeRemaining={deadlines.BTC}
                progress={30}
                volume={volumes.BTC}
              />

              <PredictionCard
                asset="FLR"
                currentPrice={prices.FLR}
                priceChange={1.8}
                timeRemaining={deadlines.FLR}
                progress={40}
                volume={volumes.FLR}
              />

              <PredictionCard
                asset="DOGE"
                currentPrice={prices.DOGE}
                priceChange={-3.2}
                timeRemaining={deadlines.DOGE}
                progress={25}
                volume={volumes.DOGE}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}