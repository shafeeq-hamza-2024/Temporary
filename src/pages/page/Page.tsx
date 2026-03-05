import FilterDialog from "@/components/pages/FilterDialog";
import { PagesFilter, PagesSort } from "@/types/pages/basic.types";
import { useState } from "react";

import { useSearchParams } from "react-router";
import CreateNewPage from "@/components/pages/CreateNewPage";
import AllPagesHeader from "@/components/pages/AllPagesHeader";

const Page = () => {
  const [searchParams, _] = useSearchParams();
  const typeFilter = searchParams.get("type");
  console.log(typeFilter);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<PagesFilter>(PagesFilter.ALL);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [sort, setSort] = useState<PagesSort>(PagesSort.ASC);

  return (
    <>
      <div className="w-full h-full bg-skin p-2">
        <AllPagesHeader
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={(value: PagesSort) => setSort(value)}
          setOpenFilter={setOpenFilter}
          setOpenCreate={setOpenCreate}
        />
        <div className="w-full h-full flex flex-col gap-2 overflow-y-auto"></div>
      </div>
      <FilterDialog
        open={openFilter}
        setOpen={(value: boolean) => setOpenFilter(value)}
        value={filter}
        setValue={(value: PagesFilter) => setFilter(value)}
      />
      <CreateNewPage open={openCreate} setOpen={setOpenCreate} />
    </>
  );
};

export default Page;
