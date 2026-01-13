import { sanityFetch } from '@/sanity/lib/live';
import { queryProjects, querySettings } from '@/sanity/lib/queries';
import { getRandomProjects } from '@/utils/utils';
import Intro from '../globals/Intro/Intro';
import Thumbnails from '../globals/Thumbnails/Thumbnails';

const Homepage = async () => {
  const [{ data: projects }] = await Promise.all([
    sanityFetch({ query: queryProjects }),
  ]);

  const randomProjects = getRandomProjects(projects, 10);

  return (
    <>
      <Intro projects={randomProjects} />
      <Thumbnails data={projects} />
    </>
  );
};

export default Homepage;
