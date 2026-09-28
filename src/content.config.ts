import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),
      canonical: z.url().optional(),
      robots: z.object({ index: z.boolean().optional(), follow: z.boolean().optional() }).optional(),
      description: z.string().optional(),
      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z.array(z.object({ url: z.string(), width: z.number().optional(), height: z.number().optional() })).optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),
      twitter: z.object({ handle: z.string().optional(), site: z.string().optional(), cardType: z.string().optional() }).optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    metadata: metadataDefinition(),
  }),
});

const baseVebpartnerSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().min(40),
  excerpt: z.string().min(20),
  status: z.enum(['draft', 'published']).default('draft'),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  lastVerifiedAt: z.string(),
  sourceUrl: z.url(),
  sourceLabel: z.string().min(1),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  related: z.array(z.object({ title: z.string(), href: z.string() })).default([]),
});

const startCollection = defineCollection({
  loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/start' }),
  schema: baseVebpartnerSchema.extend({
    provider: z.string().min(1),
    businessModel: z.string().min(1),
    whiteLabel: z.boolean(),
    ownPricing: z.boolean(),
    customerRelationship: z.boolean(),
    recurringRevenuePotential: z.boolean(),
    providerManagedHosting: z.boolean(),
    providerManagedUpdates: z.boolean(),
  }),
});

const buildCollection = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/build' }), schema: baseVebpartnerSchema });
const servicesCollection = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/services' }), schema: baseVebpartnerSchema });
const learnCollection = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/learn' }), schema: baseVebpartnerSchema });
const toolsCollection = defineCollection({ loader: glob({ pattern: ['*.md', '*.mdx'], base: 'src/data/tools' }), schema: baseVebpartnerSchema });

export const collections = {
  post: postCollection,
  start: startCollection,
  build: buildCollection,
  services: servicesCollection,
  learn: learnCollection,
  tools: toolsCollection,
};
