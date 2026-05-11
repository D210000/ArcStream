import { notFound } from "next/navigation";

import { StreamRoom } from "@/components/stream/stream-room";
import { featuredStreams, getStreamBySlug } from "@/lib/stream/fixtures";

type StreamPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredStreams.map((stream) => ({ slug: stream.slug }));
}

export default async function StreamPage({ params }: StreamPageProps) {
  const { slug } = await params;
  const stream = getStreamBySlug(slug);

  if (!stream) {
    notFound();
  }

  return <StreamRoom stream={stream} />;
}
