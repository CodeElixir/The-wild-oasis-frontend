import Table from "../../ui/Table";

function CabinHeader() {
  return (
    <>
      <Table.HeaderCell />
      <Table.HeaderCell>Cabin</Table.HeaderCell>
      <Table.HeaderCell>Capacity</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Discount</Table.HeaderCell>
      <Table.HeaderCell />
    </>
  );
}

export default CabinHeader;
