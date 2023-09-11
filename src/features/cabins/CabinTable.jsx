import { useCabins } from "./useCabins";
import { useDeleteCabin } from "./useDeleteCabin";
import CabinTableHeader from "./CabinTableHeader";
import CabinTableRow from "./CabinTableRow";
import Table from "../../ui/Table/Table";
import Spinner from "../../ui/Spinner/Spinner";

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const { isDeleting } = useDeleteCabin();

  if (isLoading || isDeleting) return <Spinner />;

  return (
    <Table gridCols="grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]">
      <CabinTableHeader />
      {cabins.length > 0 ? (
        cabins?.map((cabin) => <CabinTableRow cabin={cabin} key={cabin.id} />)
      ) : (
        <Table.Cell className="col-span-full">
          <div className="w-full text-center text-gray-700 dark:text-gray-400">
            No data to show!
          </div>
        </Table.Cell>
      )}
    </Table>
  );
}

export default CabinTable;
