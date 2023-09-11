import Listbox from "../Listbox/Listbox";

function SortBy({ options, ...rest }) {
  return <Listbox options={options} {...rest} />;
}

export default SortBy;
