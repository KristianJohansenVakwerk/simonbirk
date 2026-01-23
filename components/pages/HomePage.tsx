import { sanityFetch } from '@/sanity/lib/live';
import { queryProjects } from '@/sanity/lib/queries';

import Intro from '../globals/Intro/Intro';
import Thumbnails from '../globals/Thumbnails/Thumbnails';

const Homepage = async () => {
  const [{ data: projects }] = await Promise.all([
    sanityFetch({ query: queryProjects }),
  ]);

  return (
    <>
      <Intro data={projects} />
      <Thumbnails data={projects} />
    </>
  );
};

export default Homepage;
