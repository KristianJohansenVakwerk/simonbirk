import { sanityFetch } from '@/sanity/lib/live';
import HeaderClient from './HeaderClient';
import { queryProjects, querySettings } from '@/sanity/lib/queries';
import { draftMode } from 'next/headers';
export const HeaderServer = async () => {
  const [{ data: projects }, { data: settings }] = await Promise.all([
    sanityFetch({ query: queryProjects }),
    sanityFetch({ query: querySettings }),
  ]);

  return (
    <HeaderClient
      projects={projects}
      settings={settings}
    />
  );
};
