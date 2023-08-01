import React from 'react'

export default function Footer () {
  return (
    <div className='w-full bg-slate-100'>
      <div className=''>
        <div className='mx-auto md:px-4 lg:px-8 p-8 xl:w-4/5 grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className=''>
            <h1 className='p-1 py-2 font-bold text-xl'>BlockGallery</h1>
            <p>The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items with low to no cost.</p>
          </div>
          <div className=''>
            <h1 className='p-1 py-2 font-bold text-xl'>Navigate</h1>
            <a href="" className='p-1 hover:text-yelloww'>Explore</a><br />
            <a href="" className='p-1 hover:text-yelloww'>Buy NFT</a><br />
            <a href="" className='p-1 hover:text-yelloww'>Create NFT</a><br />
            <a href="" className='p-1 hover:text-yelloww'>Profile</a><br />
            <a href="" className='p-1 hover:text-yelloww'>Logout</a><br />
          </div>
          <div className=''>
            <h1 className='p-1 py-2 font-bold text-xl'>Learn</h1>
            <a href="" className='p-1 hover:text-yelloww'>What is NFT?</a><br />
            <a href="" className='p-1 hover:text-yelloww'>How to buy an NFT?</a><br />
            <a href="" className='p-1 hover:text-yelloww'>What is a crypto wallet?</a><br />
            <a href="" className='p-1 hover:text-yelloww'>What is cryptocurrency?</a><br />
            <a href="" className='p-1 hover:text-yelloww'>What are blockchain gas fees?</a><br />
            <a href="" className='p-1 hover:text-yelloww'>What is web3?</a>
          </div>
          <div className=''>
            <h1 className='p-1 py-2 font-bold text-xl'>Referal Resources</h1>
            <a href="" className='p-1 hover:text-yelloww'>Get Metamask</a><br />
            <a href="" className='p-1 hover:text-yelloww'>Signup on Binance</a><br />
            <a href="" className='p-1 hover:text-yelloww'>TradingView</a><br />
            <a href="" className='p-1 hover:text-yelloww'>Coinbase</a>
          </div>
        </div>
        <h1 className='p-4 flex items-center justify-center'>Copyright &copy; 2023. All Right Reserved</h1>
      </div>
    </div>
  )
}
