import { createContext, forwardRef, useContext, useState } from "react";
import { Listbox as HeadlessUIListbox, Transition } from "@headlessui/react";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react-dom";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { createPortal } from "react-dom";

const ListboxContext = createContext();

const ListboxButton = forwardRef(function ListboxButton(
  { className = "", ...rest },
  _ref,
) {
  const { setReference, selected } = useContext(ListboxContext);

  return (
    <HeadlessUIListbox.Button
      className={`relative w-full cursor-default rounded-md bg-white py-[0.375rem] pl-3 pr-10 text-left font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-white dark:bg-opacity-5 dark:text-gray-200 dark:ring-white dark:ring-opacity-10 dark:focus:ring-indigo-500 ${className}`}
      ref={(node) => {
        setReference(node);
        if (_ref) {
          _ref.current = node;
        }
      }}
      {...rest}
    >
      <span className="block truncate">{selected.label}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <HiChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
    </HeadlessUIListbox.Button>
  );
});

const ListboxOptions = forwardRef(function ListboxOptions(
  {
    className = "",
    transitionStyles = {
      enter: "transition ease-out duration-200",
      enterFrom: "opacity-0 translate-y-0",
      enterTo: "opacity-100 translate-y-1",
      leave: "transition ease-in duration-150",
      leaveFrom: "opacity-100 translate-y-1",
      leaveTo: "opacity-0 translate-y-0",
    },
    ...rest
  },
  _ref,
) {
  const { setFloating, floatingStyles, options } = useContext(ListboxContext);

  return (
    <>
      {createPortal(
        <Transition className="fixed z-50" {...transitionStyles}>
          <HeadlessUIListbox.Options
            className={`absolute z-50 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 dark:text-gray-200 dark:shadow-gray-950 ${className}`}
            ref={(node) => {
              setFloating(node);
              if (_ref) {
                _ref.current = node;
              }
            }}
            style={floatingStyles}
            {...rest}
          >
            {options.map((option) => (
              <HeadlessUIListbox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-gray-900 dark:text-gray-200"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                        <HiCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </HeadlessUIListbox.Option>
            ))}
          </HeadlessUIListbox.Options>
        </Transition>,
        document.body,
      )}
    </>
  );
});

const Listbox = forwardRef(function Listbox(
  {
    containerStyles = "",
    buttonStyles = "",
    optionsStyles = "",
    options = [],
    sortField = "sortBy",
    ...rest
  },
  _ref,
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(
    searchParams.has(sortField)
      ? options.find((opt) => opt.value === searchParams.get(sortField))
      : options[0],
  );

  const handleSelectSort = (sort) => {
    setSelected(sort);
    searchParams.set(sortField, sort.value);
    setSearchParams(searchParams);
  };

  const {
    refs: { setReference, setFloating },
    floatingStyles,
  } = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });

  return (
    <ListboxContext.Provider
      value={{
        setReference,
        setFloating,
        floatingStyles,
        options,
        selected,
        setSelected,
      }}
    >
      <HeadlessUIListbox
        value={selected}
        onChange={handleSelectSort}
        ref={_ref}
        {...rest}
      >
        <div className={`${containerStyles}`}>
          <ListboxButton className={buttonStyles} />
          <ListboxOptions className={optionsStyles} />
        </div>
      </HeadlessUIListbox>
    </ListboxContext.Provider>
  );
});

Listbox.Option = HeadlessUIListbox.Option;
Listbox.Options = ListboxOptions;
Listbox.Button = ListboxButton;

export default Listbox;
