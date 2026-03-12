import { APP_ROUTES } from "@/router/appRoutes";
import { GrDocumentUser } from "react-icons/gr";
import { RiPagesLine } from "react-icons/ri";
import { PageSectionItem } from "../../types/pages/basic.types";

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
  // {
  //   icon: MdOutlinePages,
  //   heading: "Managed Pages",
  //   path: `${APP_ROUTES.PAGES.ROOT}?type=managed`,
  // },
  // {
  //   icon: RiChatFollowUpLine,
  //   heading: "Followed Pages",
  //   path: `${APP_ROUTES.PAGES.ROOT}?type=followed`,
  // },
];
