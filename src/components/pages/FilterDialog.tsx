import { PagesFilter } from "@/types/pages/basic.types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

const FilterDialog = ({
  value,
  setValue,
  open,
  setOpen,
}: {
  value: PagesFilter;
  setValue: (value: PagesFilter) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 p-3">
          {[
            { id: PagesFilter.ALL, label: "All Pages" },
            { id: PagesFilter.MY_PAGES, label: "My Pages" },
            { id: PagesFilter.MANAGED_PAGES, label: "Managed Pages" },
            { id: PagesFilter.FOLLOWED_PAGES, label: "Followed Pages" },
          ].map((option) => (
            <div
              key={option.id}
              onClick={() => setValue(option.id)}
              className={`flex flex-row items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                value === option.id
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="filter"
                className="w-4 h-4 m-0 shrink-0 accent-primary text-primary cursor-pointer"
                checked={value === option.id}
                onChange={() => setValue(option.id)}
              />
              <span
                className={`text-base font-medium ${
                  value === option.id ? "text-primary" : "text-gray-700"
                }`}
              >
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
