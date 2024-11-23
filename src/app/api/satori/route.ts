// import TestComp, { TestCompProps } from "@/components/TestComp";
import NewTemplate, { NewTemplateProps } from "@/components/NewTemplate";
import { NextRequest } from "next/server";
import React from "react";
import satori from "satori";
import fs from "node:fs/promises";
import sharp from "sharp";
import axios from "axios";

// Function to get image brightness
async function getImageBrightness(imageUrl: string): Promise<number> {
  try {
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });

    const image = sharp(response.data).greyscale();
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    let totalBrightness = 0;
    for (let i = 0; i < data.length; i++) {
      totalBrightness += data[i];
    }

    const avgBrightness = totalBrightness / (info.width * info.height);
    const brightness = Math.round((avgBrightness / 255) * 100);
    return brightness;
  } catch (error) {
    console.error("Error processing image:", error);
    return -1;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const brightness = await getImageBrightness(
    searchParams.get("img") as string
  );
  const props: NewTemplateProps = {
    image: searchParams.get("img") as string,
    imagePosition: searchParams.get("pos") as string,
    filmName: searchParams.get("fname") as string,
    filmYear: searchParams.get("fyear") as string,
    reviewerName: searchParams.get("uname") as string,
    reviewerId: searchParams.get("uid") as string,
    reviewContent: searchParams.get("content") as string,
    reviewRating: Number(searchParams.get("rating")) as number,
    userImage: searchParams.get("userImage") as string,
    haveImage: searchParams.get("haveImage") as string,
    haveTitle: searchParams.get("haveTitle") as string,
    brightness: brightness as number,
  };
  const fontRegular = await fs.readFile("./public/fonts/Karla-Regular.ttf");
  const fontMedium = await fs.readFile("./public/fonts/Karla-Medium.ttf");
  const fontBold = await fs.readFile("./public/fonts/Karla-Bold.ttf");
  const svg = await satori(React.createElement(NewTemplate, props), {
    width: 1080,
    height: 1080,
    fonts: [
      {
        name: "Karla",
        data: fontRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Karla",
        data: fontMedium,
        weight: 500,
        style: "normal",
      },
      {
        name: "Karla",
        data: fontBold,
        weight: 700,
        style: "normal",
      },
    ],
  });

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
