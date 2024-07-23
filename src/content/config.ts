import { defineCollection, z } from 'astro:content';
import { CATEGORIES } from '@/data/categories'

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


 const blog2 = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
      category: z.enum(CATEGORIES),
      tags: z.array(z.string()),
      draft: z.boolean().default(false),
   /*    cover: z.string(), */
     cover: image()
        .refine((img) => img.width >= 600, {
          message: "cover must be at least 600px wide",
        })
        .optional(), 
    }),
}); 


 const changelog= defineCollection({

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      versionNumber: z.string(),
      cover: image()
      .refine((img) => img.width >= 600, {
        message: "cover must be at least 600px wide",
      }),
     
      date: z.coerce.date(),
    }),
});



const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: z.string(),
      category: z.string(),
      locale: z.enum(['es', 'pt' , 'en']),
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
    }),
});





const docs = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const guides = defineCollection({
  schema: z.object({
    title: z.string(),
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
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      versionNumber: z.string(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      // Transform string to Date object
      date: z.date({ coerce: true }),
    }),
});

export const collections = {  authors: authorsCollection,  posts: postsCollection, blog, blog2, changelog, docs, guides, releases };


/* export const collections = { blog , changelog };
 */