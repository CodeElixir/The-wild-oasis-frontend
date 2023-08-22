import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinHeader from "./CabinHeader";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";

function CabinTable() {
  const { cabins, isLoading } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table gridCols="grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]">
      <CabinHeader />
      {cabins?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
