import { createContext, useContext } from "react";
import { axiosPublic as axiosPu } from "../services/axiosPublic.js";
import { axiosPrivate as axiosPr } from "../services/axiosPrivate.js";

const AxiosContext = createContext({});

const AxiosProvider = ({ children }) => {
  const axiosPublic = axiosPu;
  const axiosPrivate = axiosPr;

  return (
    <AxiosContext.Provider value={{ axiosPublic, axiosPrivate }}>
      {children}
    </AxiosContext.Provider>
  );
};

function useAxios() {
  const context = useContext(AxiosContext);
  if (context === undefined) {
    throw new Error("AxiosContext was used outside of AxiosProvider ");
  }
  return context;
}

export { AxiosProvider, useAxios };
