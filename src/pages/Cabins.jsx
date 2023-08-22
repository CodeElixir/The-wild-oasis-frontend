import CabinTable from "../features/cabins/CabinTable";
import AddNewCabin from "../features/cabins/AddNewCabin";

function Cabins() {
  return (
    <div className="grid grid-cols-[repeat(2,_minmax(10rem,_1fr))] content-start items-center gap-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-700">All Cabins</h1>
      </div>
      <div className="justify-self-end">Filter/Sort</div>
      <div className="col-span-full">
        <CabinTable />
      </div>

      <div className="col-span-full">
        <AddNewCabin />
      </div>
    </div>
  );
}

export default Cabins;
