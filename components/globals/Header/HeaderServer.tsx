import { sanityFetch } from '@/sanity/lib/live';
import HeaderClient from './HeaderClient';
import { queryProjects, querySettings } from '@/sanity/lib/queries';
import Thumbnails from '../Thumbnails/Thumbnails';

export const HeaderServer = async () => {
  const [{ data: projects }, { data: settings }] = await Promise.all([
    sanityFetch({ query: queryProjects }),
    sanityFetch({ query: querySettings }),
  ]);

  return (
    <>
      <HeaderClient
        projects={projects}
        settings={settings}
      />
      <Thumbnails data={projects} />
    </>
  );
};
