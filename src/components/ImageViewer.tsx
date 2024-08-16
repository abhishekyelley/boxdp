"use client";
import { useSearchParams } from "next/navigation";

import ApiData from "@/utils/ApiData";

import { useState, Dispatch, SetStateAction, useRef } from "react";

import DefaultReviewStyle from "./DefaultReviewStyle";

interface ImageViewerProps {
  apiData: ApiData;
  queryURL?: string | null;
  myRef?: React.MutableRefObject<HTMLCanvasElement | null>;
  BASE_URL?: string;
  IMAGE_URL?: string;
  isFetching?: boolean;
  setIsFetching?: Dispatch<SetStateAction<boolean>>;
}

// -------- FUNCTION ---------
export default function ImageViewer({ apiData }: ImageViewerProps) {
  const myRef = useRef<HTMLCanvasElement | null>(null);

  const searchParams = useSearchParams();

  const parsedImgNum = parseInt(searchParams.get("img") as string);

  const [curImgNum, setCurImgNum] = useState<number>(
    !Number.isNaN(parsedImgNum)
      ? apiData?.images.length
        ? Math.max(1, Math.min(parsedImgNum, apiData.images.length))
        : 1
      : 1
  );
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [accordionToggle, setAccordionToggle] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-5">
        Result
      </h3>
      <DefaultReviewStyle
        apiData={apiData}
        myRef={myRef}
        curImgNum={curImgNum}
        sliderValue={sliderValue}
      />
      <div className="mt-5">
        <p
          className="text-lg text-center md:text-2xl font-medium text-neutral-200"
          title={String(apiData?.images.length)}
        >
          Pick an Image
        </p>
        <div className="flex flex-row gap-6 justify-center items-center mt-2">
          <button
            className={`px-8 py-2 rounded-full bg-blue-400 select-none
            ${curImgNum === 1 ? "pointer-events-none bg-neutral-600" : ""}`}
            onClick={() => setCurImgNum((prevNum) => Math.max(prevNum - 1, 1))}
            disabled={curImgNum === 1}
          >
            <img
              alt="prev"
              src="/chevron-right-solid.svg"
              className="w-4 rotate-180"
            ></img>
          </button>
          <p className="text-center self-center border-2 px-3 py-3 border-blue-400 text-neutral-300 rounded-xl text-xl font-bold md:text-2xl select-none">
            {curImgNum} / {apiData.images.length}
          </p>
          <button
            className={`px-8 py-2 rounded-full bg-blue-400 select-none ${
              curImgNum === apiData.images.length
                ? "pointer-events-none bg-neutral-600"
                : ""
            }`}
            onClick={() =>
              setCurImgNum((prevNum) =>
                Math.min(prevNum + 1, apiData.images.length || 1)
              )
            }
          >
            <img
              alt="next"
              src="/chevron-right-solid.svg"
              className="w-4"
            ></img>
          </button>
        </div>
      </div>
      <button
        className="bg-blue-400 px-4 text-neutral-900 font-bold text-base rounded-full mt-5 w-fit py-3 self-center md:text-xl select-none"
        onClick={async () => {
          if (!myRef.current) return;
          const link = document.createElement("a");
          link.download = `${apiData.filmName}-${apiData.reviewerId}.png`;
          link.href = myRef.current.toDataURL("image/png") as string; // Type assertion
          link.click();
        }}
      >
        Download!
      </button>
      <button
        className={`bg-neutral-900 w-full text-left py-4 px-6 mt-5 select-none
        cursor-pointer ${accordionToggle ? "rounded-3xl" : "rounded-full"}`}
        onClick={(e) => setAccordionToggle(!accordionToggle)}
      >
        <div className="flex justify-between items-center">
          <p className="text-base font-medium md:text-lg text-neutral-200">
            More options (Pick an Image, Change Image Position)
          </p>
          <img
            src="/chevron-light.svg"
            className={`w-4 md:w-5 transform origin-center transition duration-300 ease-out
                ${accordionToggle && "rotate-180"}
                `}
          />
        </div>
        <div
          className={`h-fit justify-between items-center mt-5 gap-5 flex-col sm:flex-row
          ${accordionToggle ? "flex" : "hidden"}
          }`}
        >
          <p className="grow-0 shrink-0 text-neutral-200 text-base md:text-lg">
            Change Image Position
          </p>
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <input
              type="range"
              min={-1}
              max={1}
              value={sliderValue}
              onChange={(e) => setSliderValue(parseFloat(e.target.value))}
              step={0.01}
              list="markers"
              className="grow shrink w-full accent-blue-400"
            />
            <datalist id="markers">
              <option value="0"></option>
            </datalist>
          </div>
        </div>
      </button>
    </div>
  );
}
