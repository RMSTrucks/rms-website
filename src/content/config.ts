import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('RMS Truck Insurance'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const states = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    state: z.string(),
    stateAbbrev: z.string().length(2),
    metaDescription: z.string().max(160),
    ogImage: z.string().optional(),
    corridors: z.array(z.object({ name: z.string(), slug: z.string(), description: z.string() })),
    subpages: z.array(z.object({ title: z.string(), slug: z.string() })),
    relatedStates: z.array(z.object({ name: z.string(), abbrev: z.string().length(2), descriptor: z.string() })),
    faqItems: z.array(z.object({ question: z.string(), answer: z.string() })),
    insuranceMinimums: z.object({ biPerPerson: z.string(), biPerAccident: z.string(), pdPerAccident: z.string() }),
    federalMinimum: z.string(),
    coverageOptions: z.array(z.object({ name: z.string(), slug: z.string(), description: z.string() })).optional(),
    freightHubs: z.array(z.object({ name: z.string(), description: z.string() })).optional(),
    regulations: z.array(z.object({ category: z.string(), detail: z.string() })).optional(),
  }),
});

const stateSubpages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    state: z.string(),
    stateAbbrev: z.string().length(2),
    parentHub: z.string(),
    metaDescription: z.string().max(160),
    topic: z.string(),
    lastUpdated: z.string(),
    ogImage: z.string().optional(),
    subpages: z.array(z.object({ title: z.string(), slug: z.string() })).optional(),
  }),
});

export const collections = { blog, states, 'state-subpages': stateSubpages };
