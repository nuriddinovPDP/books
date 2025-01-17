import { createContext, useState } from "react";

export const InpContext = createContext();

export function InpProvider({ children }) {
  const [value, setValue] = useState("");
  return (
    <InpContext.Provider value={{ value, setValue }}>
      {children}
    </InpContext.Provider>
  );
}
