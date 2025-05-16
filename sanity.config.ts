'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';

import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from 'sanity/presentation';

// Define the home location for the presentation tool
const homeLocation = {
  title: 'Home',
  href: '/',
} satisfies DocumentLocation;

function resolveHref(documentType?: string, slug?: string): string | undefined {
  switch (documentType) {
    case 'project':
      return slug ? `/projects/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  mediaLibrary: {
    enabled: true,
  },
  plugins: [
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000/',
        previewMode: { enable: '/api/draft-mode/enable' },
      },
      resolve: {
        // mainDocuments: defineDocuments([
        //   {
        //     route: '/',
        //     type: 'settings',
        //   },
        //   {
        //     route: '/projects/:slug',
        //     filter: `_type == "project" && slug.current == $slug`,
        //   },
        // ]),
        // locations: {
        //   settings: defineLocations({
        //     locations: [homeLocation],
        //     message: 'Test test test',
        //     tone: 'positive',
        //   }),
        //   project: defineLocations({
        //     select: {
        //       title: 'title',
        //       slug: 'slug.current',
        //     },
        //     resolve: (doc) => ({
        //       locations: [
        //         {
        //           title: doc?.title || 'Untitled',
        //           href: resolveHref('post', doc?.slug)!,
        //         },
        //         {
        //           title: 'Home',
        //           href: '/',
        //         } satisfies DocumentLocation,
        //       ].filter(Boolean) as DocumentLocation[],
        //     }),
        //   }),
        // },
      },
    }),
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
});
