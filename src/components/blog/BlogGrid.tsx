"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { posts } from "@/content/blogs/manifest";
import blog from "@/content/blog.json";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BlogGrid() {
  if (posts.length === 0) {
    return <div className="mx-auto max-w-xl rounded-2xl bg-blush/40 p-10 text-center text-ink-soft">{blog.emptyState}</div>;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal key={post.slug} delay={(i % 3) * 0.08}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
              {post.tags[0] ? (
                <span className="absolute top-4 left-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold tracking-wide text-maroon-deep uppercase">
                  {post.tags[0]}
                </span>
              ) : null}
              <span className="absolute bottom-4 left-4 text-xs font-medium text-cream/90">
                {formatDate(post.date)} · {post.readTime}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2 p-6">
              <h3 className="font-display text-lg leading-snug font-semibold text-ink">{post.title}</h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-maroon transition-transform group-hover:translate-x-1">
                Read more <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
