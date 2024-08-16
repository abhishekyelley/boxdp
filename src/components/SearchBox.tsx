"use client";
import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const navigate = useCallback((path: string) => {
    startTransition(() => {
      router.push(path);
    });
  }, [router]);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/review?url=${url}&img=1`);
  }

  return (
    <form
      className="flex w-full font-medium m-auto items-center h-fit"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full rounded-full rounded-r-none my-5 py-3 pl-5 
        bg-neutral-900 active:bg-neutral-900 placeholder:text-neutral-400 
        text-neutral-100 text-base md:text-lg focus:outline-none h-fit"
        type="text"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        // autoFocus
        placeholder="Paste your link here."
      />
      <button
        className={`bg-neutral-900 text-neutral-400 font-medium pr-10 pl-5
          py-3 md:py-3.5 text-xl md:text-2xl ${url ? 'block' : 'hidden'}`}
        onClick={() => setUrl('')}
      >
        <img src="/xmark-solid.svg" alt="clear" className="h-6 w-6" />
      </button>
      <button
        className={`bg-blue-400 text-neutral-900 font-bold px-5
        py-3 rounded-full text-base md:text-lg  right-3 md:right-5
        relative disabled:bg-neutral-600 disabled:text-neutral-100 ${isPending ? 'cursor-wait' : 'cursor-pointer'}`}
        type="submit"
        disabled={isPending}
      >
        {"Submit!"}
      </button>
    </form>
  );
}
