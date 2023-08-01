import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Hero from "./Hero";
import Socials from "./Socials";
import Footer from "./Footer";
import { ColorRing, TailSpin } from "react-loader-spinner";

export default function Marketplace() {
  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      seller: "0x3010975Eb501aF87CB5cB64C61A0fc1e5E59dFD1",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      seller: "0x3010975Eb501aF87CB5cB64C61A0fc1e5E59dFD1",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      seller: "0x3010975Eb501aF87CB5cB64C61A0fc1e5E59dFD1",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  const [data, updateData] = useState("");
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
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
        return item;
      })
    );

    updateFetched(true);
    updateData(items);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div>
      <Navbar />
      <Hero />
      <div className="bg-slate-100">
        <div className="mx-auto md:px-4 lg:px-8 p-8 xl:w-4/5">
          <h1 className="py-16 text-4xl font-bold text-txt flex justify-center">
            Popular Listings
          </h1>
          <div className="flex items-center justify-center">
            {!data ? (
              <TailSpin className='p-20 m-16'
                height="320"
                width="120"
                color="#F9BE00"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />

            ) : (
              ""
            )}
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {data &&
              data.slice(0, 4).map((nft, i) => (
                <NFTTile
                  data={nft}
                  key={i}
                />
              ))}
          </div>
          <div className="p-4 flex justify-end">
            {data.length > 4 ? (
              <NavLink
                to="/explore"
                className="px-4 py-2 flex items-center bg-yelloww rounded-full hover:bg-yellow-500"
              >
                View More <BsArrowRight className="m-1" />
              </NavLink>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Socials />
      <Footer />
    </div>
  );
}
