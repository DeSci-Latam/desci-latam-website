import { defineCollection, z } from 'astro:content';
import { CATEGORY_IDS } from '@/data/categories';

// Post collection schema
const postsCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    authors: z.array(z.string()).default(["admin"]),
    categories: z.array(z.string()).default(["others"]),
    tags: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
  }),
});

// Author collection schema
const authorsCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .object({
        facebook: z.string().optional(),
        twitter: z.string().optional(),
        instagram: z.string().optional(),
      })
      .optional(),
    draft: z.boolean().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.enum(CATEGORY_IDS),
      tags: z.array(z.string()),
      draft: z.boolean().default(false),
      cover: image()
        .refine((img) => img.width >= 600, {
          message: "cover must be at least 600px wide",
        })
        .optional(),
    }),
}); 

const funding = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      type: z.string(),
      category: z.enum(CATEGORY_IDS),
      tags: z.array(z.string()),
      description: z.string(),
      draft: z.boolean().optional(),
      cover: image()
        .refine((img) => img.width >= 600, {
          message: "cover must be at least 600px wide",
        }),
      amount: z.string(),
      projectTypes: z.array(z.string()),
      website: z.string().url(),
      seo: z.object({
        title: z.string(),
        description: z.string(),
      }).optional(),
    }),
});

const changelog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tags: z.string(),
      description: z.string(),
      versionNumber: z.string(),
      draft: z.boolean().optional(),
      cover: image()
        .refine((img) => img.width >= 600, {
          message: "cover must be at least 600px wide",
        }),
      date: z.coerce.date(),
    }),
});

const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    description: z.string(),
  }),
});

const guides = defineCollection({
  schema: z.object({
    title: z.string(),
    draft: z.boolean().optional(),
    description: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const releases = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      versionNumber: z.string(),
      draft: z.boolean().optional(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      date: z.date({ coerce: true }),
    }),
});

export const collections = {
  authors: authorsCollection,
  posts: postsCollection,
  blog,
  changelog,
  docs,
  guides,
  releases,
  funding
};
