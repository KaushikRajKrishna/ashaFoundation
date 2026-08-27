import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import ParallaxImage from "@/components/shared/ParallaxImage";
import MonogramAvatar from "@/components/shared/MonogramAvatar";
import { posts, type BlogPost } from "@/content/blogs/manifest";
import blog from "@/content/blog.json";

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const morePosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-maroon-deep">
        <ParallaxImage src={post.image} alt={post.imageAlt} className="absolute inset-0" strength={30} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10" />

        <Reveal className="relative mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 pt-32 pb-12">
          <Link
            href="/blog"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold tracking-[0.15em] text-cream/80 uppercase transition-colors hover:text-cream"
          >
            <ArrowLeft size={14} /> {blog.backLabel}
          </Link>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-cream/15 px-3 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-3xl leading-tight font-semibold text-cream sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 pt-1 text-sm text-cream/80">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} /> {post.readTime}
            </span>
          </div>
        </Reveal>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <Reveal className="mb-10 flex items-center gap-3 border-b border-blush pb-8">
          <MonogramAvatar name={post.author} />
          <div>
            <p className="font-display text-sm font-semibold text-ink">{post.author}</p>
            <p className="text-xs text-ink-soft">Asha Foundation</p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          {post.content.map((paragraph, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <p className="leading-relaxed text-ink-soft sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </article>

      {morePosts.length > 0 ? (
        <section className="border-t border-blush bg-blush/30 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">{blog.moreHeading}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {morePosts.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col gap-2 rounded-2xl bg-cream p-5 shadow-sm ring-1 ring-ink/5 transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="text-xs font-semibold tracking-wide text-maroon uppercase">{formatDate(p.date)}</span>
                    <h3 className="font-display text-base leading-snug font-semibold text-ink group-hover:text-maroon-deep">
                      {p.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-ink-soft">{p.excerpt}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
