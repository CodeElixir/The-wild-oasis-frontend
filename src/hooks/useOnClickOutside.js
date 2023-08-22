import { useEffect, useRef } from "react";

function useOnClickOutside(handler, listenCapturing = false) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      const el = ref?.current;
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(e.target)) {
        return;
      }
      handler(e);
    };
    document.addEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

export default useOnClickOutside;
