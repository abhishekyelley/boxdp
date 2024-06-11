"use client";
import FormData from "@/utils/FormData";

import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useState,
  useRef
} from "react";

export default function SearchBox() {
  const router = useRouter();
  const gay = useRef<any>(null);

  // const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<FormData>({
    url: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = formData.url.trim();
    const hasSpaces = /\s/g.test(url);
    if (hasSpaces) {
      console.log("has spaces");
      return;
    }
    setFormData({ url: url });
    gay.current.click();
    /*startTransition(() => {
      router.push(`/review/?url=${url}&img=1`);
      });*/
  };

  const handleClear = () => {
    setFormData({ url: "" });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <a href={`/review/?url=${formData.url}&img=1`} ref={gay} hidden></a>
      <form
        className="flex w-full font-medium m-auto items-center"
        onSubmit={handleSubmit}>
        <input
          className="w-full rounded-full rounded-r-none my-5 py-3 pl-5 
        bg-neutral-900 active:bg-neutral-900 placeholder:text-neutral-400 
        text-neutral-100 text-base md:text-lg focus:outline-none h-fit"
          value={formData.url}
          onChange={handleInputChange}
          type="text"
          name="url"
          required
          // autoFocus
          placeholder="Paste your link here."
        />
        <button
          className={`bg-neutral-900 text-neutral-400 font-medium pr-10 pl-5
          py-3 md:py-3.5 text-xl md:text-2xl ${formData.url === "" ? "hidden" : ""
            }`}
          type="button"
          onClick={handleClear}>
          <img
            src="/xmark-solid.svg"
            alt="clear"
            className="h-6 w-6"
          />
        </button>
        <button
          className="bg-blue-400 text-neutral-900 font-bold px-5
        py-3 rounded-full text-base md:text-lg  right-3 md:right-5
        relative disabled:bg-neutral-600 disabled:text-neutral-100"
          type="submit" >
          {"Submit!"}
        </button>
      </form>
    </>
  );
}
