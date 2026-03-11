import { IconType } from "react-icons";

export type PageSectionItem = {
  icon: IconType;
  heading: string;
  path: string;
};

export enum PagesFilter {
  ALL = "all",
  MY_PAGES = "my_pages",
  MANAGED_PAGES = "managed_pages",
  FOLLOWED_PAGES = "followed_pages",
}

export enum PagesSort {
  ASC = "asc",
  DESC = "desc",
}

export enum PageCategory {
  COMPANY = "company",
  EVENT = "event",
  COMMUNITY = "community",
  GENERAL = "general",
}

export type CreatePageFormData = {
  name: string;
  category: PageCategory | "";
  bio?: string;
  coverImage?: File | null;
  profileImage?: File | null;
  website?: string;
  state?: string;
  zip?: string;
  country?: string;
  companyName?: string;
  officialWebsite?: string;
  companyBio?: string;
  cin?: string;
  eventName?: string;
  description?: string;
  tags?: string;
  communityDetails?: string;
};

export type CreatePagePayload = {
  page_name: string;
  category: PageCategory;
  bio?: string;
  website?: string;
  state?: string;
  zip?: string;
  country?: string;
  company_name?: string;
  official_website?: string;
  company_bio?: string;
  cin?: string;
  event_name?: string;
  event_description?: string;
  tags?: string;
  community_details?: string;
};

export type CreatePageFormErrors = {
  [K in keyof CreatePageFormData]?: string;
};

export type AllPagesItem = {
  id: number;
  page_name: string;
  category: PageCategory;
  company_name: string | null;
  official_website: string | null;
  company_bio: string | null;
  cin: string | null;
  event_name: string | null;
  event_description: string | null;
  tags: string[];
  community_details: string | null;
  bio: string | null;
  cover_image: string | null;
  profile_image: string | null;
  cover_image_url: string | null;
  profile_image_url: string | null;
  website: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  created_at: string;
};

export type PageDetails = {
  id: number;
  owner: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_image_url: string | null;
    is_following: boolean;
  };
  followers_count: number;
  is_following: boolean;
  cover_image_url: string | null;
  profile_image_url: string | null;
  page_name: string;
  category: PageCategory;
  company_name: string | null;
  official_website: string | null;
  company_bio: string | null;
  cin: string | null;
  event_name: string | null;
  event_description: string | null;
  tags: string[] | null;
  community_details: string | null;
  bio: string | null;
  cover_image: string | null;
  profile_image: string | null;
  website: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  created_at: string;
};
