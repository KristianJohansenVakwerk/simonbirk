import { createClient } from 'next-sanity';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { urlFor } from '../sanity/lib/image';
import { projectId, dataset, apiVersion } from '../sanity/env';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

async function fetchFavicons() {
  try {
    // Fetch all projects with thumbnails
    const projects = await client.fetch(`
      *[_type == 'project' && defined(thumbnail)] {
        _id,
        "slug": slug.current,
        thumbnail {
          _type,
          asset->{
            ...
          }
        }
      }
    `);

    if (!projects || projects.length === 0) {
      console.log('No projects with thumbnails found.');
      return;
    }

    // Create favicons directory if it doesn't exist
    const faviconsDir = join(process.cwd(), 'public', 'favicons');
    if (!existsSync(faviconsDir)) {
      await mkdir(faviconsDir, { recursive: true });
      console.log(`Created directory: ${faviconsDir}`);
    }

    console.log(`Found ${projects.length} projects with thumbnails.`);

    // Fetch and save each favicon
    for (const project of projects) {
      if (!project.slug || !project.thumbnail) {
        console.warn(
          `Skipping project ${project._id}: missing slug or thumbnail`,
        );
        continue;
      }

      try {
        // Generate 32x32 favicon URL using Sanity's image URL builder
        const faviconUrl = urlFor(project.thumbnail)
          .width(32)
          .height(32)
          .format('png')
          .url();

        if (!faviconUrl) {
          console.warn(`Could not generate URL for project: ${project.slug}`);
          continue;
        }

        // Download the image
        const response = await fetch(faviconUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        const filename = `project-${project.slug}.png`;
        const filepath = join(faviconsDir, filename);

        // Save the file
        await writeFile(filepath, Buffer.from(buffer));
        console.log(`✓ Saved: ${filename}`);
      } catch (error) {
        console.error(`Error processing project ${project.slug}:`, error);
      }
    }

    console.log(`\n✅ Successfully fetched ${projects.length} favicons!`);
  } catch (error) {
    console.error('Error fetching favicons:', error);
    process.exit(1);
  }
}

// Run the script
fetchFavicons();
