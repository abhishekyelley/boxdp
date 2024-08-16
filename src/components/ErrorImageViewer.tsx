"use client";
export default function ErrorImageViewer({ text }: { text?: string }) {
  return (
    <div className="m-3">
      <h1 className="text-5xl font-bold text-white text-center">
        {text
          ? text
          : "Bad URL, why dont you try again with your eyes open eh?"}
      </h1>
    </div>
  );
}
