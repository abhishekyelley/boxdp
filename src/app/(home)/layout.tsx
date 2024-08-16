import SearchBox from "@/components/SearchBox";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-auto">
      <div className="w-96 sm:w-3/4 md:w-4/5 lg:w-4/6 xl:w-1/3 box-border m-auto px-7 py-5">
        <p className="text-neutral-100 text-base font-medium md:text-lg lg:text-center">
          Paste your review{"’"}s link and click submit to get a pretty little
          image of your review.
        </p>
        <SearchBox />
        {children}
      </div>
    </div>
  );
}
