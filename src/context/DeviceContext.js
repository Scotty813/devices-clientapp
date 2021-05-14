import { createContext, useState, useContext } from "react";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [selectedDevice, setSelectedDevice] = useState({});

  return (
    <DeviceContext.Provider value={{ selectedDevice, setSelectedDevice }}>
      {children}
    </DeviceContext.Provider>
  );
}

export const useDeviceContext = () => useContext(DeviceContext);
