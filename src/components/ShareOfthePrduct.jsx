import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ productIdForShare, description }) => {
  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/product/${productIdForShare}`;

  return (
    <div className=" text-sm flex  justify-start  mt-2 mb-2 text-green-700">
      <div
        className="
        flex gap-x-3   rounded-full"
      >
        <div className="bg-slate-200 p-2 rounded-md ">
          <FacebookShareButton url={shareUrl} quote={description}>
            <FacebookIcon
              fontSize="small"
              className=" 
              hover:scale-110 transition-all duration-200 hover:text-rose-600  "
            />
          </FacebookShareButton>
        </div>
        <div className="bg-slate-200 p-2 rounded-md ">
          <TwitterShareButton url={shareUrl} title={description}>
            <TwitterIcon
              fontSize="small"
              className=" rounded-full shadow-lg shadow-red-400
             hover:scale-110 transition-all duration-200 hover:text-rose-500 "
            />
          </TwitterShareButton>
        </div>
        <div className="bg-slate-200 p-2 rounded-md ">
          <WhatsappShareButton url={shareUrl} title={description}>
            <WhatsAppIcon
              fontSize="small"
              className=" rounded-full shadow-lg shadow-red-400 hover:scale-110
           transition-all duration-200  hover:text-pink-600 "
            />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
