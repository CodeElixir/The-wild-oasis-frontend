import Table from "../../ui/Table/Table";

function BookingTableHeader() {
  return (
    <>
      <Table.HeaderCell>Cabin</Table.HeaderCell>
      <Table.HeaderCell>Guest</Table.HeaderCell>
      <Table.HeaderCell>Dates</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Amount</Table.HeaderCell>
      <Table.HeaderCell />
    </>
  );
}

export default BookingTableHeader;
