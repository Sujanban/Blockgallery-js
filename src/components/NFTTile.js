import { GetIpfsUrlFromPinata } from "../utils";
import { NavLink } from "react-router-dom";
import cover_img from "../images/userprofile.jpg";

function NFTTile(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

  return (
    <div>
      <NavLink to={newTo}>
        <div className="mx-auto">
          <div className="m-2 shadow rounded mx-auto">
            <img
              className="mx-auto w-60 h-60 object-cover rounded"
              src={IPFSUrl}
              alt=""
            />
            <div className="p-4">
              <div className="flex items-center">
                <img
                  className="my-4 mr-2 w-8 h-8 object-cover rounded-full "
                  src={cover_img}
                  alt=""
                />
                <div className="text-left">
                  <h1 className="font-bold capitalize">{data.data.name}</h1>
                  <p className="text-slate-600">{data.data.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default NFTTile;
