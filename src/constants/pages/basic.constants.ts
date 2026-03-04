import { MdOutlinePages } from "react-icons/md";
import { RiChatFollowUpLine, RiPagesLine } from "react-icons/ri";
import { APP_ROUTES } from "../app/routes";
import { PageSectionItem } from "../../types/pages/basic.types";

export const PAGE_SECTION_ITEMS: PageSectionItem[] = [
  {
    icon: RiPagesLine,
    heading: "All Pages",
    path: APP_ROUTES.PAGES.ROOT,
  },
  {
    icon: RiPagesLine,
    heading: "My Pages",
    path: APP_ROUTES.PAGES.MY_PAGES,
  },
  {
    icon: MdOutlinePages,
    heading: "Managed Pages",
    path: APP_ROUTES.PAGES.MANAGED_PAGES,
  },
  {
    icon: RiChatFollowUpLine,
    heading: "Followed Pages",
    path: APP_ROUTES.PAGES.FOLLOWED_PAGES,
  },
];
