import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import profile from "../images/userprofile.jpg";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";

export default function NFTPage(props) {
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  const ownPurchase = () => {
    toast.error("Can't Puchase own NFT", {
      position: toast.POSITION.TOP_CENTER,
      closeButton: false,
      hideProgressBar: true,
    });
  };

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
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
    var tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    console.log(listedToken);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr);
    updateCurrAddress(addr);
  }

  async function buyNFT(tokenId) {
    try {
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
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      // alert("You successfully bought the NFT!");

      (function () {
        toast.success("NFT bought sucessfully!", {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
          hideProgressBar: true,
        });
      })();
      updateMessage("");
    } catch (e) {
      
      // alert("Upload Error" + e);
      (function () {
        toast.warning("Error Buing NFT", {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
          hideProgressBar: true,
        });
      })();
    }
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);
  if (typeof data.image == "string")
    data.image = GetIpfsUrlFromPinata(data.image);

  return (
    <div className="mt-[10vh]" style={{ "min-height": "100vh" }}>
      <Navbar />
      <ToastContainer />
      <div className="mx-auto md:px-4 lg:px-8 p-8 xl:w-4/5">
        <div className="">
          <div className="py-2 flex items-center">
            <h1 className="py-4 text-txt font-bold text-xl sm:text-2xl">
              Product Details
            </h1>
            <p className="m-2 p-1 px-2 text-sm bg-blue-100 rounded-full text-blue-600 ">
              Best choice
            </p>
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-4 border">
            <div className="p-2 sm:p-4">
              <img src={data.image} alt="" />
              <div className="p-2 sm:p-8">
                <div className="flex items-center">
                  <img
                    src={profile}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="p-4">{data.seller}</p>
                </div>
                <p className="py-2 text-slate-500">
                  Management of the application in terms of proper functioning
                  and appearance with a greate emphasis on correct user
                  experiance.
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <p className="py-2 px-4 text-sm text-blue-600 bg-blue-100 rounded-full">
                  Creative Work
                </p>
                <span className="flex items-center">
                  <BsTwitter className="m-1" />
                  <BsFacebook className="m-1" />
                </span>
              </div>
              <h1 className="py-2 font-bold text-2xl">{data.name}</h1>
              <p className="py-2 text-slate-500">{data.description}</p>
              <div className="my-4 border-2 rounded border-blue-600">
                <p className="p-2 text-center">Art Price</p>
                <p className="p-2 font-bold text-4xl text-center">
                  {data.price} ETH
                </p>
                <div className="py-4 flex justify-center ">
                  {currAddress != data.owner && currAddress != data.seller ? (
                    <button
                      className="py-2 px-12 sm:px-20 border-2 rounded bg-blue-600 text-white hover:bg-blue-500 duration-200"
                      onClick={() => buyNFT(tokenId)}
                    >
                      Purchase NFT
                    </button>
                  ) : (
                    // <div className="text-emerald-700">
                    //   You are the owner of this NFT
                    // </div>
                    <button
                      className="py-2 px-12 sm:px-20 border-2 rounded bg-blue-600 text-white hover:bg-blue-500 duration-200"
                      onClick={ownPurchase}
                    >
                      Purchase NFT
                    </button>
                  )}
                </div>
                <div className="text-green text-center mt-3">{message}</div>
              </div>
              <div className="py-2 flex items-center justify-between">
                <h1 className="font-bold text-lg">Project category</h1>
                <p className="text-slate-500">Digital Artwork</p>
              </div>
              <div className="py-2 flex items-center justify-between">
                <h1 className="font-bold text-lg">File Type</h1>
                <p className="text-slate-500">Image</p>
              </div>
            </div>
          </div>
        </div>
        {/* <h1 className='p-4 font-bold text-txt text-2xl'>Listed Nfts</h1> */}
        {/* <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {
            nfts.slice(0, 4).map((nft, i) => (
              <Card
                name={nft.name}
                discription={nft.discription}
                image={nft.image}
                owner_img={nft.owner_img}
                owner={nft.owner}
              />
            ))
          }
        </div> */}
        {/* <div className='p-4 flex justify-end'>
          <NavLink to="/explore" className='px-4 py-2 flex items-center bg-yelloww rounded-full hover:bg-yellow-500'>View More <BsArrowRight className='m-1' /></NavLink>
        </div> */}
      </div>
      <Footer />

      {/* <Navbar></Navbar>
            <div className="flex ml-20 mt-20">
                <img src={data.image} alt="" className="w-2/5" />
                <div className="text-xl ml-20 space-y-8 text-white shadow-2xl rounded-lg border-2 p-5">
                    <div>
                        Name: {data.name}
                    </div>
                    <div>
                        Description: {data.description}
                    </div>
                    <div>
                        Price: <span className="">{data.price + " ETH"}</span>
                    </div>
                    <div>
                        Owner: <span className="text-sm">{data.owner}</span>
                    </div>
                    <div>
                        Seller: <span className="text-sm">{data.seller}</span>
                    </div>
                    <div>
                    { currAddress != data.owner && currAddress != data.seller ?
                        <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={() => buyNFT(tokenId)}>Buy this NFT</button>
                        : <div className="text-emerald-700">You are the owner of this NFT</div>
                    }
                    
                    <div className="text-green text-center mt-3">{message}</div>
                    </div>
                </div>
            </div> */}
    </div>
  );
}
