import { defineConfig } from 'tinacms';
import { tags } from '../lib/data/tags.data';
import { categories } from '../lib/data/category.data';

const allTags = tags?.map((tag) => ({
  label: tag.name,
  value: tag.id,
}));

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main';

export default defineConfig({
  branch,
  clientId: '95d8bf63-1f30-4689-9ba5-6f0eca69c94b', // Get this from tina.io
  token: 'aed6276be4ded866a8c015fe1f6fa6b615a992e3', // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'products',
        label: 'Products',
        path: 'products/',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            isBody: true,
          },
          {
            type: 'datetime',
            name: 'createdDate',
            label: 'Created date',
            ui: {
              dateFormat: 'MMM DD, YYYY',
            },
          },
          {
            type: 'image',
            name: 'imgUrl',
            label: 'Image URL',
            description: 'The thumbnail image, should be 256x256px',
          },
          {
            type: 'string',
            name: 'storeUrl',
            label: 'URL',
            description: 'The link to the buy site, if any',
          },
        ],
        ui: {
          router: ({ document }) => `/store/${document._sys.filename}`,
        },
      },
      {
        name: 'projects',
        label: 'Projects',
        path: 'projects/',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'linkUrl',
            label: 'Link URL',
            description: 'The link to the live site, if any',
          },
          {
            type: 'string',
            name: 'repoUrl',
            label: 'Repo URL',
            description: 'The link to the repository, if any',
          },
          {
            type: 'string',
            name: 'demoUrl',
            label: 'Demo URL',
            description: 'The link to the demo site, if any',
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            description: 'The tags that this project has',
            options: allTags,
            list: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Categories',
            description: 'The categories of this project',
            options: categories,
            list: true,
          },
          {
            type: 'image',
            name: 'imgUrl',
            label: 'Image URL',
            description: 'The thumbnail image',
          },
          {
            type: 'datetime',
            name: 'createdDate',
            label: 'Created date',
            ui: {
              dateFormat: 'MMM DD, YYYY',
            },
          },
          {
            type: 'rich-text',
            label: 'Post Body',
            name: 'body',
            isBody: true,
            templates: [
              {
                name: 'Video',
                label: 'Video',
                fields: [
                  {
                    name: 'width',
                    label: 'Video width',
                    type: 'number',
                  },
                  {
                    name: 'height',
                    label: 'Video height',
                    type: 'number',
                  },
                  {
                    name: 'src',
                    label: 'Video src',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/projects/${document._sys.filename}`,
        },
      },
    ],
  },
});
