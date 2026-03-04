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
  COMPANY = "COMPANY",
  EVENT = "EVENT",
  COMMUNITY = "COMMUNITY",
  GENERAL = "GENERAL",
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

export type CreatePageFormErrors = {
  [K in keyof CreatePageFormData]?: string;
};
