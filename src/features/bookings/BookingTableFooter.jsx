import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination/Pagination";
import Table from "../../ui/Table/Table";
import { PAGE_SIZE } from "../../utils/constants";

function BookingTableFooter({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page")
    ? parseInt(searchParams.get("page"), 10)
    : 1;

  const handleClick = (_, value) => {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  };

  return (
    <>
      <Table.FooterCell className="col-span-full bg-gray-50 !p-0">
        <Pagination
          activePage={currentPage}
          totalCount={count}
          pageSize={PAGE_SIZE}
          onClick={handleClick}
          containerClasses="px-6 py-4"
        />
      </Table.FooterCell>
    </>
  );
}

export default BookingTableFooter;
