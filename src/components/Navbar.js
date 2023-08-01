import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(false);

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    // ethereumButton.classList.remove("hover:bg-blue-70");
    // ethereumButton.classList.remove("bg-blue-500");
    // ethereumButton.classList.add("hover:bg-green-70");
    // ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum == undefined) return;
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <div className="">
      <header className="drop-shadow-md fixed top-0 left-0 z-50 md:px-4 lg:px-8 px-8 w-full h-[10vh] bg-white items-center md:flex justify-between">
        <div className="w-full h-[10vh] xl:fixed xl:w-4/5 xl:left-1/2 xl:-translate-x-1/2 items-center md:flex justify-between">
          <NavLink to="/">
            <svg
              width="130"
              className="h-full w-28 lg:w-36 xl:w-40"
              height="66.54756632201179"
              viewBox="0 0 369.65517241379314 70.68662101878013"
              class="css-1j8o68f"
            >
              <defs id="SvgjsDefs1546"></defs>
              <g
                id="SvgjsG1547"
                featurekey="odWo6G-0"
                transform="matrix(0.8620326052814011,0,0,0.8620326052814011,-12.927946329007264,-8.620377022912056)"
                fill="#111111"
              >
                <rect
                  xmlns="http://www.w3.org/2000/svg"
                  x="25.249"
                  y="20.252"
                  transform="matrix(0.7071 0.7071 -0.7071 0.7071 46.463 -22.1737)"
                  fill="none"
                  stroke="#111111"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  width="49.499"
                  height="49.497"
                ></rect>
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#111111"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  d="M49.999,69.395  l24.394-24.392L50,20.608L25.608,45.002L49.999,69.395z M63.785,45.002L49.999,58.787L36.214,45.002L50,31.215L63.785,45.002z"
                ></path>
                <rect
                  xmlns="http://www.w3.org/2000/svg"
                  x="47.754"
                  y="42.754"
                  transform="matrix(-0.707 0.7072 -0.7072 -0.707 117.1804 41.4576)"
                  stroke="#111111"
                  stroke-width=""
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  width="4.496"
                  height="4.497"
                ></rect>
                <polygon
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#111111"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  points="  49.999,80 20,50.004 15.002,55 49.999,90 85,55 80,50 "
                ></polygon>
              </g>
              <g
                id="SvgjsG1548"
                featurekey="VGK2BT-0"
                transform="matrix(2.84668073237976,0,0,2.84668073237976,77.34643735322675,-9.998398846026337)"
                fill="#111111"
              >
                <path d="M8.4576 12.7798 c1.4068 0.64407 2.2881 1.9324 2.2881 3.4408 c0 2.2373 -1.9661 3.7795 -4.0508 3.7795 l-5.4746 0 c-0.16949 0 -0.28814 -0.11864 -0.28814 -0.28814 l0 -13 c0 -0.15254 0.10169 -0.27119 0.27119 -0.27119 l5.051 0 c2.1524 0 3.7625 1.8814 3.7625 3.5763 c0 1.2373 -0.66102 2.2034 -1.5593 2.7627 z M5.8814 12.2207 c2.8136 0 2.8644 -3.9322 0.033898 -3.9322 l-3.0678 0 l0 3.9322 l3.0339 0 z M6.2542 18.1529 c3.322 0 3.339 -4.1356 -0.033898 -4.1356 l-3.3729 0 l0.016949 4.1356 l3.3898 0 z M14.49156779661017 6.441000000000001 l-1.3053 0 c-0.16933 0 -0.27119 0.11864 -0.27119 0.27119 l0 12.61 c0 0.38983 0.23746 0.6778 0.66119 0.6778 l0.91525 0 c0.16949 0 0.27119 -0.10153 0.27119 -0.28797 l0 -13 c0 -0.15254 -0.11864 -0.27119 -0.27119 -0.27119 z M20.982901694915256 20.11864 c2.3729 0 4.339 -1.8812 4.339 -4.3049 c0 -2.4746 -1.9661 -4.322 -4.339 -4.322 s-4.339 1.8475 -4.339 4.322 c0 2.4237 1.9661 4.3049 4.339 4.3049 z M20.982901694915256 18.39 c-1.4576 0 -2.5424 -1.2034 -2.5424 -2.5593 c0 -1.4068 1.0847 -2.6102 2.5424 -2.6102 s2.5424 1.2034 2.5424 2.6102 c0 1.3559 -1.0847 2.5593 -2.5424 2.5593 z M33.949 18.4746 c0.10169 0.15254 0.10136 0.27119 -0.01728 0.39 c-0.74576 0.71186 -1.7288 1.2541 -2.9153 1.2541 c-2.339 0 -4.339 -1.8812 -4.339 -4.288 c0 -2.4237 2 -4.339 4.339 -4.339 c1.1864 0 2.1525 0.49153 2.8475 1.1864 c0.11864 0.11881 0.11864 0.25441 0.016949 0.38983 l-0.64407 0.81356 c-0.10169 0.13559 -0.20339 0.15254 -0.40678 0.016949 c-0.42373 -0.42373 -1 -0.67797 -1.7627 -0.67797 c-1.61 0 -2.61 1.2542 -2.61 2.5932 c0 1.322 1 2.5932 2.6271 2.5932 c0.76271 0 1.3051 -0.28814 1.7966 -0.77966 c0.18644 -0.15254 0.30525 -0.10169 0.4239 0.033898 z M43.660815254237285 19.44085 c0.22034 0.23729 0.11848 0.54271 -0.20356 0.54271 l-1.3729 0 c-0.15254 0 -0.23729 -0.033898 -0.33898 -0.15254 l-4.0339 -4.0339 l0 3.9322 c0 0.15238 -0.11864 0.27102 -0.27119 0.27102 l-1.2881 0 c-0.16949 0 -0.28814 -0.11864 -0.28814 -0.27102 l0 -11.848 c0 -0.57627 -0.084746 -0.83051 -0.13559 -1.0847 c-0.033732 -0.18661 0.017115 -0.3561 0.18661 -0.3561 l1.1525 0 c0.38983 0 0.64407 0.25424 0.64407 0.61017 l0 8.2881 l3.4068 -3.5932 c0.10169 -0.10169 0.20339 -0.13559 0.32203 -0.13559 l1.3559 0 c0.27119 0 0.42373 0.33898 0.22034 0.55932 l-3.339 3.4068 z M56.94857627118644 13.9663 c0.20339 0 0.28847 0.10203 0.28847 0.28847 l0 3.5085 c0 0.084746 -0.050847 0.16949 -0.11864 0.23712 c-1.2542 1.3222 -2.9661 2.1186 -5 2.1186 c-3.7627 0 -6.8814 -3.0168 -6.8814 -6.8642 s3.1186 -6.9322 6.8814 -6.9322 c2 0 3.7625 0.79661 5.0337 2.1356 c0.15254 0.15238 0.15254 0.30492 0.016949 0.40661 l-1.0847 0.88119 c-0.13559 0.11881 -0.25424 0.11881 -0.38983 -0.016784 c-0.72881 -0.76271 -1.9831 -1.5593 -3.5085 -1.5593 c-3.0508 0 -5.0339 2.5424 -5.0339 5.0847 c0 2.5593 1.9831 5.0169 5.0339 5.0169 c1.322 0 2.4068 -0.57627 3.1525 -1.2203 l0 -1.2542 l-3.1017 0 c-0.18644 0 -0.28831 -0.084746 -0.28831 -0.27119 l0 -1.2544 c0 -0.20339 0.084746 -0.30508 0.27119 -0.30508 l4.7288 0 z M66.28794745762711 19.62712 c-0.22034 -1.661 -0.2368 -3.2032 -0.16916 -4.8302 c0.084746 -2 -1.0169 -3.2881 -3.0847 -3.2881 c-1.3559 0 -2.7627 0.40678 -3.5932 0.86441 c-0.15254 0.084746 -0.25424 0.23712 -0.18644 0.38966 l0.42373 0.98305 c0.067797 0.16949 0.18644 0.22034 0.40678 0.11864 c1.0847 -0.49153 1.9661 -0.72881 2.8305 -0.72881 c0.91525 0 1.4576 0.35593 1.4237 1.322 c-3.1356 0.5422 -5.5254 1.1015 -5.5254 3.3049 c0 1.4746 1.0678 2.3219 2.7966 2.3219 c1.4408 0 2.1864 -0.44051 2.8983 -0.98288 c0.08458 0.50847 0.23712 0.89831 0.5761 0.89831 l1.0169 0 c0.15238 0 0.20322 -0.18644 0.18627 -0.37288 z M61.93234745762712 18.627299999999998 c-0.69492 0 -1.2373 -0.23729 -1.2373 -0.88136 c0 -1.0339 1.8981 -1.3729 3.6102 -1.7288 c-0.016949 0.55932 -0.016949 1.3051 0 1.7966 c-0.55932 0.42373 -1.5085 0.81356 -2.3729 0.81356 z M70.1525847457627 6.441000000000001 l-1.3053 0 c-0.16933 0 -0.27119 0.11864 -0.27119 0.27119 l0 12.61 c0 0.38983 0.23746 0.6778 0.66119 0.6778 l0.91525 0 c0.16949 0 0.27119 -0.10153 0.27119 -0.28797 l0 -13 c0 -0.15254 -0.11864 -0.27119 -0.27119 -0.27119 z M74.47461864406777 6.441000000000001 l-1.3053 0 c-0.16933 0 -0.27119 0.11864 -0.27119 0.27119 l0 12.61 c0 0.38983 0.23746 0.6778 0.66119 0.6778 l0.91525 0 c0.16949 0 0.27119 -0.10153 0.27119 -0.28797 l0 -13 c0 -0.15254 -0.11864 -0.27119 -0.27119 -0.27119 z M83.81355254237286 16.4915 c0.61 0 1.0336 -0.30508 1.0336 -1.0169 c0 -2.0847 -1.6102 -3.9831 -4.0847 -3.9831 c-2.3559 0 -4.2034 1.8644 -4.2034 4.3051 c0 2.5422 1.9322 4.288 4.3051 4.288 c1.5085 0 2.6949 -0.61017 3.4237 -1.5932 c0.10186 -0.13559 0.067963 -0.23729 -0.033568 -0.37288 l-0.32203 -0.42373 c-0.13559 -0.16933 -0.27119 -0.15254 -0.44085 -0.050847 c-0.5422 0.44068 -1.4405 0.81373 -2.4236 0.81373 c-1.3898 0 -2.3729 -0.84746 -2.5593 -1.9661 l5.3051 0 z M78.50835254237286 15.050799999999999 c0.067797 -0.81356 0.83051 -1.8644 2.2203 -1.8644 c1.4068 0 2.1356 1.0678 2.1864 1.8644 l-4.4068 0 z M92.42357627118642 12.034099999999999 c0.18644 0.11864 0.23729 0.22017 0.11848 0.40661 l-0.69475 1.0169 c-0.084746 0.11864 -0.20339 0.15254 -0.35593 0.11864 c-0.35593 -0.16949 -0.66102 -0.32203 -1.2203 -0.32203 s-1.4407 0.23729 -1.9153 1.2881 l0 5.1866 c0 0.15238 -0.10169 0.27102 -0.25424 0.27102 l-1.339 0 c-0.15254 0 -0.25424 -0.11864 -0.25424 -0.27102 l0 -7.8476 c0 -0.15238 0.11864 -0.27119 0.25424 -0.27119 l0.9322 0 c0.40678 0 0.66102 0.42373 0.66102 0.72881 l0 0.11881 c0.59322 -0.54237 1.3051 -0.91525 2.2373 -0.91525 c0.86441 0 1.5085 0.27119 1.8305 0.49153 z M102.44063389830507 11.6102 c0.20339 0 0.30525 0.13543 0.20356 0.32203 l-3.3559 6.8983 c-1.678 3.4914 -3.1525 5.5083 -3.9492 6.288 c-0.15254 0.13559 -0.33898 0.067797 -0.50847 -0.10169 l-0.72881 -0.72881 c-0.18644 -0.16949 -0.15254 -0.33898 0.016949 -0.54237 c1.0339 -1.1695 2.3729 -3.1017 3.2373 -5.0507 l-3.5254 -6.7797 c-0.084746 -0.16949 0 -0.30508 0.18644 -0.30508 l1.4915 0 c0.15238 0 0.23712 0.067797 0.30492 0.18661 l2.4915 5.0846 l2.3729 -5.0678 c0.067797 -0.13559 0.16949 -0.20339 0.32203 -0.20339 l1.4407 0 z"></path>
              </g>
            </svg>
          </NavLink>
          <nav
            className={
              toggle
                ? " h-screen px-8 md:px-0 bg-white md:bg-transparent absolute md:relative w-full md:w-max left-0 font-medium list-none items-center hiddden md:flex"
                : "hidden px-8 md:px-0 bg-white md:bg-transparent absolute md:relative w-full md:w-max left-0 font-medium list-none items-center hiddden md:flex"
            }
          >
            <li className=" md:px-2 lg:px-4 my-6 text-gray-600 hover:text-stone-800 ">
              <NavLink className=" text-sm lg:text-md font-bold" to="/sellNFT">
                Create
              </NavLink>
            </li>
            <li className="md:px-2 lg:px-4 my-6 text-gray-600 hover:text-stone-800 ">
              <NavLink className=" text-sm lg:text-md font-bold" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="md:px-2 lg:px-4 mt-4 md:mt-0 py-4">
              <button
                className="enableEthereumButton text-sm lg:text-md md:ml-0 rounded-full bg-yelloww text-txt px-3 py-2.5 shadow-sm hover:bg-yellow-500 duration-300 font-bold"
                onClick={connectWebsite}
              >
                {connected ? "Connected" : "Connect Wallet"}
              </button>
            </li>
          </nav>
          <div
            onClick={() => setToggle(!toggle)}
            className="md:hidden fixed h-[10vh] flex justify-center items-center top-0 right-0 pr-8"
          >
            <GiHamburgerMenu />
          </div>
        </div>
        {/* <div className="absolute bottom-0 right-0 text-bold text-right mr-10 text-sm">
          {currAddress !== "0x"
            ? "Connected to"
            : "Not Connected. Please login to view NFTs"}{" "}
          {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
        </div> */}
      </header>
    </div>
  );
}

export default Navbar;
