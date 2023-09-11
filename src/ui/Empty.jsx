function Empty({ resourceName }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text whitespace-nowrap	text-2xl font-bold">
        No {resourceName} could be found.
      </h1>
    </div>
  );
}

export default Empty;
