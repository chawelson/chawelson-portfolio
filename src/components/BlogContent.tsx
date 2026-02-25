"use client";
import { PortableText } from "@portabletext/react";
import dynamic from "next/dynamic";
import urlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client";

const builder = urlBuilder(client);
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const components = {
  types: {
    // 1. Render standard Images
    image: ({ value }: any) => (
      <div className="my-10 overflow-hidden rounded-xl border border-white/10">
        <img
          src={builder.image(value).url()}
          alt={value.alt || "Josh Chawelson Portfolio Image"}
          className="w-full object-cover"
        />
      </div>
    ),

    // 2. Render the Image Gallery
    gallery: ({ value }: any) => (
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {value.images?.map((img: any, index: number) => (
          <img
            key={index}
            src={builder.image(img).url()}
            className="rounded-lg border border-white/5 hover:scale-[1.02] transition-transform duration-500"
            alt="Gallery item"
          />
        ))}
      </div>
    ),

    // 3. Render Video Embeds (YouTube, TikTok, Vimeo)
    videoEmbed: ({ value }: any) => (
      <div className="my-12 aspect-video overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900 shadow-2xl shadow-blue-500/5">
        <ReactPlayer
          src={value.url}
          width="100%"
          height="100%"
          controls
        />
      </div>
    ),
  },
  block: {
    // Styling standard text elements
    h2: ({ children }: any) => <h2 className="text-4xl font-black italic mt-16 mb-6 text-white uppercase tracking-tighter">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-10 mb-4 text-blue-400 italic">{children}</h3>,
    normal: ({ children }: any) => <p className="text-slate-400 text-lg leading-relaxed mb-6 font-light">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 py-2 my-10 italic text-2xl text-slate-200 bg-white/5 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
};

export default function BlogContent({ value }: { value: any }) {
  return (
    <div className="max-w-3xl mx-auto prose prose-invert">
      <PortableText value={value} components={components} />
    </div>
  );
}

