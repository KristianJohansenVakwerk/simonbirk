import { sanityFetch } from '@/sanity/lib/live';
import { queryProjectBySlug, queryProjects } from '@/sanity/lib/queries';
import ProjectPage from '@components/pages/ProjectPage';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = async () => {
  const { data: projects } = await sanityFetch({
    query: queryProjects,
    perspective: 'published',
    stega: false,
  });

  return projects.map((project: any) => ({
    slug: project.slug.current,
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
