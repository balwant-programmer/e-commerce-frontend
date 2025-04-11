import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emojiaction } from "../redux/Slice/CategryFilterSlice";
import { useLazyGetAllProductEmojiQuery } from "../rtkQuery/productServices";
import useWindresize from "../Hook/useWindresize";
import { emojiFilterDataAction } from "../redux/FilterDataSlice";
import { categoryaction } from "../redux/Slice/CategorySlice";
const EmojiFilter = () => {
  const dispatch = useDispatch();
  const emoji = useSelector((state) => state?.categoryFilterReducer?.emoji);
  const priceData = useSelector((state) => state?.categoryFilterReducer?.price);
  const { searchQuery } = useSelector((state) => state?.searchreducer);
  const [triggerEmojiFun, { data: emojiData }] =
    useLazyGetAllProductEmojiQuery();

  const { callapi } = useSelector((state) => state?.modelReducer);
  const { category } = useSelector((state) => state?.categoryFilterReducer);
  const { width } = useWindresize();
  const [loading, setLaoding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (width <= 762 && callapi === true && emoji) {
        setLaoding(true);
        const [minPrice, maxPrice] = priceData;
        const { data } = await triggerEmojiFun({ minPrice, maxPrice, emoji });
        if (data.success) {
          setLaoding(false);
          dispatch(dispatch(categoryaction("All")));
        }
      }
    };
    fetchData();
  }, [callapi]);

  useEffect(() => {
    const fetchData = async () => {
      if (width > 762 && callapi === false && emoji) {
        setLaoding(true);
        const [minPrice, maxPrice] = priceData;
        const { data } = await triggerEmojiFun({ minPrice, maxPrice, emoji });
        if (data.success) {
          setLaoding(false);
          dispatch(dispatch(categoryaction("All")));
        }
      }

      if (width > 762 && callapi === false && !emoji) {
        setTimeout(() => {
          const selectedCategories = [""];
          triggerEmojiFun({ selectedCategories });
        }, 0);
      }
    };
    fetchData();
  }, [emoji]);

  useEffect(() => {
    if (emojiData?.data.length > 0) {
      dispatch(emojiFilterDataAction(emojiData?.data));
    }
  }, [emojiData, dispatch]);

  const HandleEmoji = (emoji) => {
    dispatch(emojiaction(emoji));
  };

  if (searchQuery) return;
  if (category.length > 0) return;

  return (
    <div className="grid grid-cols-5 mx-2 ">
      {["👜", "👚", "📱", "🎧", "💻", "😂"].map((emo, index) => (
        <button
          key={index}
          className={`size-8 flex justify-center items-center  bg-gray-300 rounded mb-2 ${
            emoji === emo ? "bg-red-600" : ""
          }`}
          onClick={() => HandleEmoji(emo)}
        >
          {emo}
        </button>
      ))}
      {loading && (
        <div className="size-8 border-b-2 absolute top-52 md:-right-96 left-40 border-b-red-600 flex justify-center items-center animate-spin rounded-full mx-auto">
          <div className="size-6  border-b-2 border-b-red-600 animate-spin rounded-full mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default EmojiFilter;
