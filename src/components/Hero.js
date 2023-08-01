import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import axiemelon from "../images/axiemelon.avif";
import axiewhite from "../images/axie-default.png";
import boredape from "../images/boredape.png";
import cryptopunk from "../images/cyberpunk.webp";
import axieanimate from "../images/axieanimate.gif";

export default function Hero() {
  return (
    <div>
      <div>
        <div className="px-8 md:px-4 lg:px-8 mt-[10vh] w-full h-[90vh]">
          <div className="xl:w-4/5 mx-auto h-full">
            <div className="h-full my-auto sm:grid grid-cols-2">
              <div className="flex items-center my-auto h-full">
                <div>
                  <h1 className="py-6 md:py-0 text-txt text-5xl md:text-7xl xl:text-8xl font-bold my-auto">
                    Discover Rare Collection of Art and NFT's.
                  </h1>
                  <h1 className="text-txt py-3 md:py-6 text-xl font-semibold">
                    Digital Marketplace for crypto collectionles and
                    non-fungible token. NFT's
                  </h1>
                  <Link to="/sellNFT">
                    <button className="my-4 md:my-0 px-4 py-2 bg-yelloww hover:bg-yellow-500 rounded-full text-txt flex items-center">
                      Create NFT
                      <HiArrowNarrowRight />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="hidden sm:flex justify-center items-center">
                <div className="relative">
                  <img className=" h-full  object-cover" src={axieanimate} />
                  {/* <img className=" h-120 w-120 object-cover" src={axiewhite} /> */}
                  
                  <div className="absolute top-[10%] right-[10%] h-20 w-20 rounded-full border-2 border-yellow-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
