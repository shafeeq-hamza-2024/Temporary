import { PAGE_SECTION_ITEMS } from "@/constants/pages/basic.constants";
import PageSectionItem from "./PageSectionItem";

const PageSection = () => {
  return (
    <div className="activity-card">
      <div className="w-full h-full flex items-center justify-between">
        <div className="activity-title h-full flex justify-center items-center">
          Pages
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {PAGE_SECTION_ITEMS.map((item) => (
          <PageSectionItem key={item.heading} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PageSection;
