import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import blog from "@/content/blog.json";

export const metadata: Metadata = {
  title: "Blog",
  description: "Reflections on mental health, recovery, and community from the Asha Foundation team.",
};

export default function BlogPage() {
  const { header } = blog;
  return (
    <>
      <PageHeader eyebrow={header.eyebrow} title={header.title} subtitle={header.subtitle} />
      <section className="mx-auto max-w-6xl px-6 py-20">
        <BlogGrid />
      </section>
    </>
  );
}
