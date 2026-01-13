const { createClient } = require('next-sanity');
const { writeFile, mkdir } = require('fs/promises');
const { existsSync, readFileSync } = require('fs');
const { join } = require('path');

// Load environment variables from .env.local or .env
// Try dotenv first, then fallback to manual parsing
let envLoaded = false;
try {
  const dotenv = require('dotenv');
  const result1 = dotenv.config({ path: join(process.cwd(), '.env.local') });
  const result2 = dotenv.config({ path: join(process.cwd(), '.env') });
  envLoaded = !result1.error || !result2.error;
} catch (e) {
  // dotenv not available, try manual parsing
  try {
    const envFiles = ['.env.local', '.env'];
    for (const envFile of envFiles) {
      const envPath = join(process.cwd(), envFile);
      if (existsSync(envPath)) {
        const envContent = readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach((line) => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const [key, ...valueParts] = trimmed.split('=');
            const value = valueParts.join('=').replace(/^["']|["']$/g, '');
            if (key && value && !process.env[key]) {
              process.env[key] = value;
            }
          }
        });
        envLoaded = true;
      }
    }
  } catch (parseError) {
    console.warn('Could not load environment variables from .env files');
  }
}

// Import the image URL builder
const createImageUrlBuilder =
  require('@sanity/image-url').default || require('@sanity/image-url');

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-15';

if (!projectId || !dataset) {
  console.error(
    'Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder({ projectId, dataset });

const urlFor = (source) => {
  return builder.image(source);
};

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
