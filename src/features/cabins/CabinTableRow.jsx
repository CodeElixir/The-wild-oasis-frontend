import Table from "../../ui/Table/Table";
import CabinMenu from "./CabinMenu";
import { formatCurrency } from "../../utils/helpers";

function CabinTableRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <>
      <Table.Cell>
        <img
          src={image}
          alt={`cabin-pic-${name}`}
          className="block aspect-[3/2] w-14 min-w-[2rem] scale-150 rounded-md object-cover object-center"
        />
      </Table.Cell>
      <Table.Cell className="font-[Sono] font-semibold text-gray-600">
        {name}
      </Table.Cell>
      <Table.Cell className="text-gray-700">
        Fits up to {maxCapacity} guests
      </Table.Cell>
      <Table.Cell className="font-[Sono] font-semibold">
        {formatCurrency(regularPrice)}
      </Table.Cell>
      <Table.Cell className="font-[Sono] font-medium ">
        {discount ? (
          <span className="text-green-700">{formatCurrency(discount)}</span>
        ) : (
          <span>&mdash;</span>
        )}
      </Table.Cell>
      <Table.Cell>
        <CabinMenu cabin={cabin} />
      </Table.Cell>
    </>
  );
}

export default CabinTableRow;
