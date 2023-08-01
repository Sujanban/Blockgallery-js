import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import Hero_banner from "../components/Hero_banner";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import profile from "../images/userprofile.jpg";
import { BiLinkExternal } from "react-icons/bi";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    // <div className="profileClass" style={{"min-height":"100vh"}}>
    //     <Navbar></Navbar>
    //     <div className="profileClass">
    //     <div className="flex text-center flex-col mt-11 md:text-2xl ">
    //         <div className="mb-5">
    //             <h2 className="font-bold">Wallet Address</h2>
    //             {address}
    //         </div>
    //     </div>
    //     <div className="flex flex-row text-center justify-center mt-10 md:text-2xl ">
    //             <div>
    //                 <h2 className="font-bold">No. of NFTs</h2>
    //                 {data.length}
    //             </div>
    //             <div className="ml-20">
    //                 <h2 className="font-bold">Total Value</h2>
    //                 {totalPrice} ETH
    //             </div>
    //     </div>
    //     <div className="flex flex-col text-center items-center mt-11 ">
    //         <h2 className="font-bold">Your NFTs</h2>
    //         <div className="flex justify-center flex-wrap max-w-screen-xl">
    //             {data.map((value, index) => {
    //             return <NFTTile data={value} key={index}></NFTTile>;
    //             })}
    //         </div>
    //         <div className="mt-10 text-xl">
    //             {data.length == 0 ? "Oops, No NFT data to display (Are you logged in?)":""}
    //         </div>
    //     </div>
    //     </div>
    // </div>
    <div>
      <Navbar></Navbar>
      <div className="mt-[10vh]">
        <Hero_banner text={"User Profile"} />
        <div className="mx-auto md:px-4 lg:px-8 p-8 xl:w-4/5">
          <h1 className="text-2xl font-bold text-txt">Hello Creator!</h1>
          <div className="my-4">
            <div className="m-4  sm:flex items-center">
              <img
                src={profile}
                className="h-28 w-28 sm:h-48 sm:w-48 object-cover rounded-full ring-4 ring-yelloww"
                alt=""
              />
              <div>
                <h1 className="m-4 text-lg">Wallet Address : {address}</h1>
                <h1 className="m-4 text-lg">No. of NFTs : {data.length}</h1>
                <h1 className="m-4 text-lg">Total Value : {totalPrice} ETH</h1>
                <p className="m-4 flex">
                  View your account activity on 
                  <a target="_blank" href={'https://goerli.etherscan.io/address/'+ address } className="flex items-center "><b className="flex items-center mx-2 p-1 text-sm bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 hover:text-blue-800 ">Block exploler <BiLinkExternal/></b></a>
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Your NFTs</h2>
              <div className="grid sm:grid-cols-2 gap-x-14 md:grid-cols-3 xl:grid-cols-4">
                {data.map((nft, i) => {
                  return <NFTTile data={nft} key={i} />;
                })}
              </div>
              <div>
                {data.length == 0
                  ? "Oops, No NFT data to display (Are you logged in?)"
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
