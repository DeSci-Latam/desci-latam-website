import { defineCollection, z } from 'astro:content';
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.enum(CATEGORIES),
      tags: z.array(z.string()),
      draft: z.boolean().default(false),
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
      /* cover: z.object({
        src: image(),
        alt: z.string(),
      }), */

      cover: image()
      .refine((img) => img.width >= 600, {
        message: "cover must be at least 600px wide",
      }),
      // Transform string to Date object
      date: z.coerce.date(),
    }),
});



export const collections = { blog , changelog };
