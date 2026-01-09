import { defineQuery } from 'next-sanity';

export const querySettings = defineQuery(`
  *[_type == 'settings' ][0]`);

export const queryProjects = defineQuery(`
  *[_type == 'project' ] | order(year desc) {
    _id,
    _type,
    title,
    slug,
    year,
    "thumbnail": thumbnail.asset->{
      ...
    },
    "media": media[0...2] {
      _type,
      asset->{
        ...
      }
    }
  }
`);

export const queryProjectSlugs = defineQuery(`
  *[_type == 'project' ] | order(year desc) {
    slug
  }
`);

export const queryProjectBySlug = defineQuery(`
  *[_type == 'project' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    year,
    media[] {
      _type,
      asset->{
        ...
      }
    },
     "nextProjectSlug": *[_type == 'project' && slug.current != $slug && year < year] | order(year desc)[0].slug.current
  }
`);
