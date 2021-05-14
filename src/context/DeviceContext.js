import { createContext, useContext, useState } from "react";

import useGetDevices from "../hooks/useGetDevices";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { devices, refetchDevices } = useGetDevices();
  return (
    <DeviceContext.Provider
      value={{ selectedDevice, setSelectedDevice, devices, refetchDevices }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export const useDeviceContext = () => useContext(DeviceContext);
