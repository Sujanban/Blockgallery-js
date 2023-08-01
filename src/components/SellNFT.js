import Navbar from "./Navbar";
import profile from "../images/userprofile.jpg";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import Marketplace from "../Marketplace.json";
import { useLocation } from "react-router";
import Hero_banner from "./Hero_banner";
import { ToastContainer, toast } from "react-toastify";

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require("ethers");
  const [message, updateMessage] = useState("");
  const location = useLocation();

  async function disableButton() {
    const listButton = document.getElementById("list-button");
    listButton.disabled = true;
    listButton.style.backgroundColor = "grey";
    listButton.style.opacity = 0.3;
  }

  async function enableButton() {
    const listButton = document.getElementById("list-button");
    listButton.disabled = false;
    listButton.style.backgroundColor = "#A500FF";
    listButton.style.opacity = 1;
  }

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      disableButton();
      updateMessage("Uploading image.. please dont click anything!");

      // (function () {
      //   toast("Uploading Image to IPFS", {
      //     position: toast.POSITION.TOP_CENTER,
      //     closeButton: false,
      //     hideProgressBar: true,
      //   });
      // })();

      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        enableButton();
        updateMessage("");
        // console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) {
      // updateMessage("Please fill all the fields!");

      (function () {
        toast.warning("Please fill all required field", {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
          hideProgressBar: true,
        });
      })();


      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      disableButton();
      updateMessage(
        "Uploading NFT(takes 5 mins).. please dont click anything!"
      );

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, "ether");
      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      // alert("Successfully listed your NFT!");
      (function () {
        toast.success("NFT Listed Sucessfully", {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
          hideProgressBar: true,
        });
      })();

      enableButton();
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      window.location.replace("/");
    } catch (e) {
      (function () {
        toast.error("Error Listing NFT", {
          position: toast.POSITION.TOP_CENTER,
          closeButton: false,
          hideProgressBar: true,
        });
      })();
    }
  }

  console.log("Working", process.env);
  return (
    <div className="">
      <Navbar></Navbar>

      <div className="mt-[10vh]">
        <Hero_banner text={"Create NFTs"} />
        <div className=" mx-auto md:px-4 lg:px-8 p-4 sm:p-8 xl:w-4/5">
          <h1 className="p-4 text-2xl font-bold text-txt">
            Fillup your details and start selling
          </h1>
          <div className="grid md:grid-cols-2 sm:gap-4">
            <div className="">
              <form
                action=""
                className="mx-auto p-4 space-y-3 border rounded border-gray-900/10 "
              >
                <div>
                  <h1 className="py-2">NFT Title</h1>
                  <input
                    type="text"
                    required
                    className="w-full  border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 "
                    placeholder="NFT Title..."
                    onChange={(e) =>
                      updateFormParams({ ...formParams, name: e.target.value })
                    }
                    value={formParams.name}
                  />

                  {/* <input type="text" className='text-slate-900 border-2 border-slate-300 outline-none rounded p-1 focus:ring-1 focus:border-collapse' placeholder='Enter NFT Title Here' /> */}
                </div>
                <div>
                  <h1 className="py-2">NFT Discription</h1>
                  <textarea
                    rows="4"
                    required
                    className="w-full  border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 "
                    placeholder="NFT Discription..."
                    value={formParams.description}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                  <ToastContainer />
                </div>
                <div>
                  <h1 className="py-2">Listing Price (Eth)</h1>
                  <input
                    type="number"
                    required
                    min="0.001"
                    step="0.001"
                    className="w-full  border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 "
                    placeholder="Listing Price..."
                    onChange={(e) =>
                      updateFormParams({ ...formParams, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <h1 className="py-2">Upload File (jpg,jpeg,png,webp)</h1>
                  <input
                    accept="image/*"
                    required
                    type="file"
                    min="0.001"
                    step="0.001"
                    className="w-full  border border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 bg-transparent placeholder-gray-500 text-gray-500 "
                    onChange={OnChangeFile}
                  />
                </div>
                <div className="py-2 mx-auto ">
                  <div className="text-red-500 text-center">{message}</div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 mx-auto bg-yelloww hover:bg-yellow-500 text-txt rounded"
                    onClick={listNFT}
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center md:relative">
              <div className="p-8  md:96 lg:w-[30rem] rounded bg-slate-100 md:absolute -top-36">
                <h1 className="flex justify-center font-bold text-blue-700 text-5xl">
                  20k+
                </h1>
                <h2 className="py-4 text-bold text-2xl">
                  Gain on viewership. Our platform generates a lots of views.
                </h2>
                <p className="text-slate-600">
                  Blockgallery is relatively new and is actively working on
                  integration on many others chains. Due to which it is gaining
                  popularity among thousands of visitors every day.
                </p>

                <div className="py-8">
                  <h1 className="text-2xl font-semibold">
                    Need help creating your NFT?
                  </h1>
                  <img
                    className="my-4 h-20 w-20 object-cover rounded-full"
                    src={profile}
                    alt=""
                  />
                  <h2 className="my-4">
                    Sujan Ban
                    <br /> <b>CEO Manager Assistant</b>
                  </h2>
                  <p className=" text-slate-600">
                    Quick support this is a very important elements of this
                    platform. If you have any question please leave us a
                    message. We will respond back as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>

      {/* <div className="flex flex-col place-items-center mt-10" id="nftForm">
        <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className="text-center font-bold text-purple-500 mb-8">
            Upload your NFT to the marketplace
          </h3>
          <div className="mb-4">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="name"
            >
              NFT Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Axie#4563"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="description"
            >
              NFT Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Axie Infinity Collection"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price (in ETH)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Min 0.01 ETH"
              step="0.01"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
            ></input>
          </div>
          <div>
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image (&lt;500 KB)
            </label>
            <input type={"file"} onChange={OnChangeFile}></input>
          </div>
          <br></br>
          <div className="text-red-500 text-center">{message}</div>
          <button
            onClick={listNFT}
            className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
            id="list-button"
          >
            List NFT
          </button>
        </form>
      </div> */}
    </div>
  );
}
