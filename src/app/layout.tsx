import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";

// const inter = Karla({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "boxd-pics",
  description:
    "Get a prettier image of your letterboxd review. Just provide the URL.",
};

const fh: React.CSSProperties = {
  height: "100vh", // Set the height value here
  // You can add more CSS properties as needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth">
      {/* <body className={inter.className}> */}
      <body>
        <div
          className="flex flex-col h-screen justify-between"
          style={fh}>
          <div>
            <Header />
            <div className="mb-auto">
              <div className="w-96 sm:w-3/4 md:w-4/5 lg:w-4/6 xl:w-1/3 box-border m-auto px-7 py-5">
                <p className="text-neutral-100 text-base font-medium md:text-lg lg:text-center">
                  Paste your review’s link and click submit to get a pretty little image
                  of your review.
                </p>
                <SearchBox />
                {children}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
