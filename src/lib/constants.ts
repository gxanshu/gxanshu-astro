import type { z } from "astro/zod";
import MetaDefaultImage from "@/assets/images/meta-default.jpg";
import avatar from "@/assets/images/avatar.jpeg";
import type { seoSchemaWithoutImage } from "@/content.config";
import astroConfig from "astro.config.mjs";

export type AuthorInfo = {
  name: string;
  avatar: any;
  headline: string;
  username?: string;
  location?: string;
  pronouns?: string;
};

export type Seo = z.infer<typeof seoSchemaWithoutImage> & {
  image?: any;
};

type DefaultConfigurationType = {
  baseUrl: string;
  author: AuthorInfo;
  seo: Seo;
};

export const DEFAULT_CONFIGURATION: DefaultConfigurationType = {
  baseUrl: astroConfig.site || "https://gxanshu.in",
  author: {
    avatar,
    name: "Anshu Meena",
    headline: "Philosophy & Engineering",
    username: "gxanshu",
    location: "India",
    pronouns: "He/Him",
  },
  seo: {
    title: "Gxanshu - Software Engineer Portfolio",
    description:
      "gxanshu is a portfolio website showcasing impressive web development projects created by GX Anshu with his expertise in software development and web design",
    type: "website",
    image: MetaDefaultImage,
    twitter: {
      creator: "@gxanshu",
    },
    robots: "index, follow",
  },
};
