import CabinTable from "../features/cabins/CabinTable";
import AddNewCabin from "../features/cabins/AddNewCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">All Cabins</h1>
        </div>
        <CabinTableOperations />
      </div>
      <CabinTable />
      <AddNewCabin />
    </div>
  );
}

export default Cabins;
