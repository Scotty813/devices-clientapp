import { createContext, useContext, useState } from "react";

import useGetDevices from "../hooks/useGetDevices";

const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [selectedDevice, setSelectedDevice] = useState({});
  const [isNewDevice, setIsNewDevice] = useState();
  const { devices, refetchDevices } = useGetDevices();

  return (
    <DeviceContext.Provider
      value={{
        selectedDevice,
        setSelectedDevice,
        devices,
        refetchDevices,
        isNewDevice,
        setIsNewDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export const useDeviceContext = () => useContext(DeviceContext);
