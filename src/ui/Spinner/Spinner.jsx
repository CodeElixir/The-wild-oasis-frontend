function Spinner() {
  return (
    <div
      className="mx-auto mt-12 aspect-square w-16 animate-spin rounded-[50%]"
      style={{
        background: `radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #4f46e5)`,
        WebkitMask:
          "radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)",
      }}
    ></div>
  );
}

export default Spinner;
