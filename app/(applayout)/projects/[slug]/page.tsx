import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import {
  queryProjectBySlug,
  queryProjectSlugs,
  querySettings,
} from '@/sanity/lib/queries';

import ProjectPage from '@components/pages/ProjectPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [{ data: project }, { data: settings }] = await Promise.all([
    sanityFetch({
      query: queryProjectBySlug,
      params: { slug },
    }),
    sanityFetch({ query: querySettings }),
  ]);

  const title =
    `Simon Birk – ${project?.title}` || settings?.seo?.seoTitle || 'Simon Birk';
  const description = settings?.seo?.seoDescription;
  const ogImage = project?.thumbnail
    ? urlFor(project.thumbnail).width(1200).url()
    : settings?.seo?.seoImage
      ? urlFor(settings.seo.seoImage).width(1200).url()
      : undefined;

  return {
    title,
    description,
    openGraph: ogImage ? { images: [{ url: ogImage }] } : {},
  };
}

export const generateStaticParams = async () => {
  const { data: projects } = await sanityFetch({
    query: queryProjectSlugs,
    perspective: 'published',
    stega: false,
  });

  return projects
    .filter((project: any) => project.slug?.current)
    .map((project: any) => ({
      slug: project.slug!.current,
    }));
};

const ProjectRoute = async ({ params }: Props) => {
  const { slug } = await params;
  const { data: project } = await sanityFetch({
    query: queryProjectBySlug,
    params: { slug },
  });

  if (!project) {
    return notFound();
  }

  return <ProjectPage project={project} />;
};

export default ProjectRoute;
