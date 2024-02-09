import { createContext, useContext, useState } from "react";

const SidebarDialogContext = createContext({});

function SidebarDialogProvider({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarDialogContext.Provider>
  );
}

function useSidebarDialog() {
  const context = useContext(SidebarDialogContext);
  if (context === undefined) {
    throw new Error(
      "SidebarDialogContext was used outside of SidebarDialogProvider",
    );
  }
  return context;
}

export { SidebarDialogProvider, useSidebarDialog };
