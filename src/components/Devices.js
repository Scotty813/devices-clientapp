import Button from "@material-ui/core/Button";
import ConfirmDialog from "./Dialogs/ConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import DeviceDialog from "./Dialogs/DeviceDialog";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import styled from "styled-components";
import useDeleteDevice from "../hooks/useDeleteDevice";
import { useDeviceContext } from "../context/DeviceContext";
import { useDialogContext } from "../context/DialogContext";

const StyledPaper = styled(Paper)({
  width: "100%",
});

const DeviceContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "32px",
  fontSize: "16px",
});

const DeviceActions = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& button": {
    marginLeft: "32px",
  },
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
}));

function Device({ device }) {
  const { system_name, type, hdd_capacity } = device;
  const { setSelectedDevice, setIsNewDevice } = useDeviceContext();
  const { setDialogOpen } = useDialogContext();

  return (
    <DeviceContainer>
      <div>
        <div>{system_name}</div>
        <div>{type}</div>
        <div>{hdd_capacity} GB</div>
      </div>
      <DeviceActions>
        <Button
          onClick={() => {
            setIsNewDevice(false);
            setSelectedDevice(device);
            setDialogOpen("device", true);
          }}
        >
          Edit
        </Button>
        <IconButton
          onClick={() => {
            setSelectedDevice(device);
            setDialogOpen("delete", true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </DeviceActions>
    </DeviceContainer>
  );
}

export default function Devices({ devices }) {
  const { dialogMap, setDialogOpen } = useDialogContext();
  const { selectedDevice, refetchDevices } = useDeviceContext();
  const deleteDevice = useDeleteDevice();

  return (
    <StyledPaper>
      {devices.map((device, index) => {
        const lastItem = index === devices.length - 1;

        return (
          <React.Fragment key={device.id}>
            <Device device={device} />
            {!lastItem && <Divider />}
          </React.Fragment>
        );
      })}

      <ConfirmDialog
        open={dialogMap["delete"]}
        handleClose={() => setDialogOpen("delete", false)}
        primaryAction={async () => {
          try {
            await deleteDevice(selectedDevice.id);
            setDialogOpen("delete", false);
            refetchDevices();
            // show success snackbar
          } catch (e) {
            // show error snackbar
          }
        }}
        primaryText={"Delete"}
      />

      <DeviceDialog
        open={dialogMap["device"]}
        handleClose={() => setDialogOpen("device", false)}
      />
    </StyledPaper>
  );
}
