import TestComp, { TestCompProps } from "@/components/TestComp";
import { NextRequest } from "next/server";
import React from "react";
import satori from "satori";
import fs from "node:fs/promises";


export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams
  const props: TestCompProps = {
    image: searchParams.get("img") as string,
    imagePosition: searchParams.get("pos") as string,
    filmName: searchParams.get("fname") as string,
    filmYear: searchParams.get("fyear") as string,
    reviewerName: searchParams.get("uname") as string,
    reviewerId: searchParams.get("uid") as string,
    reviewContent: searchParams.get("content") as string,
    reviewRating: Number(searchParams.get("rating")) as number,
  };
  const fontBuffer = await fs.readFile("./public/fonts/Karla-Regular.ttf");
  const svg = await satori(React.createElement(TestComp, props),
    {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: 'Karla',
          data: fontBuffer,
          weight: 400,
          style: 'normal',
        },
      ],
    },
  );
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    }
  });

}