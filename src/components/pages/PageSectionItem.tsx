import { PageSectionItem as PageSectionItemType } from "@/types/pages/basic.types";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router";

const PageSectionItem = ({ item }: { item: PageSectionItemType }) => {
  const navigate = useNavigate();
  return (
    <div className="activity-item " onClick={() => navigate(item.path)}>
      <div className="activity-left">
        <item.icon className="text-primary" />
        <span>{item.heading}</span>
      </div>
      <MdChevronRight />
    </div>
  );
};

export default PageSectionItem;
