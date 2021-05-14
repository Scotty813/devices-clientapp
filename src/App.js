import Button from "@material-ui/core/Button";
import Devices from "./components/Devices";
import Header from "./components/Header";
import styled from "styled-components";
import { useDeviceContext } from "./context/DeviceContext";
import { useDialogContext } from "./context/DialogContext";

const Main = styled.div(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  minHeight: "calc(100vh - 64px)",
  width: "40%",
  margin: "auto",
  padding: "64px 0",
  [theme.breakpoints.down("xs")]: {
    width: "100%",
  },
}));

function App() {
  const { setDialogOpen } = useDialogContext();
  const { setSelectedDevice, setIsNewDevice } = useDeviceContext();
  return (
    <div>
      <Header />
      <Main>
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
        <Devices />
      </Main>
    </div>
  );
}

export default App;
