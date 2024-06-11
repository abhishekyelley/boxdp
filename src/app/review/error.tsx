"use client";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-5xl text-center m-5">This should{"'"}t have happened...</h1>
            <div className="flex flex-row justify-around">
                <button className="bg-black border p-3 rounded" onClick={() => reset()}>Try again</button>
                <a className="bg-black border p-3 rounded" href="/">Go Home</a>
            </div>
        </div>
    );
} 