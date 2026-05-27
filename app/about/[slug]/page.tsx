import { notFound } from "next/navigation";
import MarkdownPage from "@/components/content/MarkdownPage";
import {
  getAbout,
  getAboutPageBySlug,
} from "@/lib/contentful";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const aboutPages = await getAbout();

  return aboutPages.map((page: any) => ({
    slug: page.fields.slug,
  }));
}

export const revalidate = 60;

export default async function AboutPage({ params }: PageProps) {
  const { slug } = await params;

  const aboutData = await getAboutPageBySlug(slug);
  const page = aboutData.items?.[0];

  if (!page) return notFound();

  return (
    <MarkdownPage
      title={page.fields.title}
      body={page.fields.pageContent ?? ""}
    />
  );
}