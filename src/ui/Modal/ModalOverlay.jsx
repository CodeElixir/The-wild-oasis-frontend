import { forwardRef, useEffect } from "react";

const ModalOverlay = forwardRef(function ModalOverlay({ openModal }, ref) {
  useEffect(() => {
    if (openModal) {
      document.getElementById("root").classList.add("blurring");
    } else {
      document.getElementById("root").classList.remove("blurring");
    }
    return () => {
      document.getElementById("root").classList.remove("blurring");
    };
  }, [openModal]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
    ></div>
  );
});

export default ModalOverlay;
