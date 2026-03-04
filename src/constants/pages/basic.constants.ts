import { GrDocumentUser } from "react-icons/gr";
import { MdOutlinePages } from "react-icons/md";
import { RiChatFollowUpLine, RiPagesLine } from "react-icons/ri";
import { PageSectionItem } from "../../types/pages/basic.types";
import { APP_ROUTES } from "@/router/appRoutes";

export const PAGE_SECTION_ITEMS: PageSectionItem[] = [
  {
    icon: RiPagesLine,
    heading: "All Pages",
    path: APP_ROUTES.PAGES.ROOT,
  },
  {
    icon: GrDocumentUser,
    heading: "My Pages",
    path: `${APP_ROUTES.PAGES.ROOT}?type=my`,
  },
  {
    icon: MdOutlinePages,
    heading: "Managed Pages",
    path: `${APP_ROUTES.PAGES.ROOT}?type=managed`,
  },
  {
    icon: RiChatFollowUpLine,
    heading: "Followed Pages",
    path: `${APP_ROUTES.PAGES.ROOT}?type=followed`,
  },
];
