import Button from "@material-ui/core/Button";
import Devices from "./components/Devices";
import Filters from "./components/Filters";
import Header from "./components/Header";
import styled from "styled-components";
import { useDeviceContext } from "./context/DeviceContext";
import { useDialogContext } from "./context/DialogContext";
import { useState } from "react";

const Main = styled.div(({ theme }) => ({
  minHeight: "calc(100vh - 64px)",
  width: "40%",
  margin: "auto",
  padding: "64px 0",
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
}));

const DeviceActions = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: "16px",
});

function App() {
  const [filters, setFilters] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const { setDialogOpen } = useDialogContext();
  const { setSelectedDevice, devices, setIsNewDevice } = useDeviceContext();

  const filterDevices = (devices) => {
    if (!filters.length) {
      return devices;
    }
    return devices.reduce((devices, device) => {
      if (filters.includes(device.type)) {
        return [...devices, device];
      }
      return devices;
    }, []);
  };

  const sortDevices = (devices) => {
    if (!sortBy) return devices;

    return devices.sort((a, b) => {
      const hddA = Number(a.hdd_capacity);
      const hddB = Number(b.hdd_capacity);

      if (hddA < hddB) {
        return sortBy === "ascending" ? -1 : 1;
      }
      if (hddA > hddB) {
        return sortBy === "ascending" ? 1 : -1;
      }

      return 0;
    });
  };

  return (
    <div>
      <Header />
      <Main>
        <DeviceActions>
          <Filters
            filters={filters}
            setFilters={setFilters}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <Button
            variant="outlined"
            onClick={() => {
              setIsNewDevice(true);
              setSelectedDevice(null);
              setDialogOpen("device", true);
            }}
          >
            Add Device
          </Button>
        </DeviceActions>
        <Devices devices={sortDevices(filterDevices(devices))} />
      </Main>
    </div>
  );
}

export default App;
