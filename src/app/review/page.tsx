import ErrorImageViewer from "@/components/ErrorImageViewer";
import ImageViewer from "@/components/ImageViewer";
import ApiData from "@/utils/ApiData";
import ApiDataError from "@/utils/ApiDataError";

const BASE_URL = "http://localhost:3000/api/review?url=";

export const dynamic = 'force-dynamic';

function fetcher(url: string) {
    return new Promise<ApiData | ApiDataError>(async (resolve, reject) => {
        try{
            const response = await fetch(url, { method: "GET" })
            const res: ApiData | ApiDataError = await response.json();
            if ("error" in res) {
                throw res;
            }
            resolve(res as ApiData);
        } catch(error: any | ApiDataError) {
            console.error("fetchFail", error);
            reject(error as ApiDataError);
        }
});
}

export default async function Review({ searchParams }: { searchParams: { url: string } }) {

    const queryURL = searchParams.url;

    if (!queryURL) {
        return (
            <ErrorImageViewer text={"Don't make my life any more miserable..."} />
        );
    }
    try {
        const res = await fetcher(BASE_URL + queryURL);
        if ("error" in res) {
            throw res;
        }
        return (
            <ImageViewer apiData={res} queryURL={queryURL} />
        );

    } catch (err) {
        console.error("componentFail:", err);
        return (
            <ErrorImageViewer />
        );
    }
}