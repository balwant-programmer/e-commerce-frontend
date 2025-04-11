import React from "react";
import { useDispatch } from "react-redux";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import {
  rescateory,
  reseteemojiaction,
  resprice,
} from "../redux/Slice/CategryFilterSlice";
import { resetqueryAction } from "../redux/Slice/searchSlice";

const ResetAllFilter = () => {
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(rescateory(""));
    dispatch(reseteemojiaction(null));
    dispatch(resprice(""));
    dispatch(resetqueryAction(""));
    dispatch(dispatch(categoryaction("All")));
  };

  return (
    <div className="flex items-center justify-start mx-2 px-2  ">
      <button
        onClick={handleReset}
        className="bg-gray-100 px-4 font-serif text-sm py-2 border-2 active:scale-110 hover:bg-gray-200 flex justify-center items-center gap-1"
      >
        Reset filter
        <RestartAltIcon fontSize="small" />
      </button>
    </div>
  );
};

export default ResetAllFilter;
