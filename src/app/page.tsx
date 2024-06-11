import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center w-auto">
      <h3 className="text-2xl md:text-4xl font-bold text-center mb-5">
        Hello!
      </h3>
      <Image
        alt="preview"
        height={1080}
        width={1080}
        src="/preview.png"
        className="rounded-xl" />
    </div>
  );
}
