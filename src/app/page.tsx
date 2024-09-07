import { Metadata, ResolvingMetadata } from "next";
import Home from "@/components/Home";
export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "Boxdp",
    openGraph: {
      images: ["/api/image", ...previousImages],
    },
  };
}

export default function Page() {
  return <Home />;
}
