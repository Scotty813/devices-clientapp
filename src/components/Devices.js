import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import ConfirmDialog from "./Dialogs/ConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import DeviceDialog from "./Dialogs/DeviceDialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import useDeleteDevice from "../hooks/useDeleteDevice";
import { useDeviceContext } from "../context/DeviceContext";
import useGetDevices from "../hooks/useGetDevices";

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

function Device({ device, setDeleteDialogOpen, setDeviceDialogOpen }) {
  const { system_name, type, hdd_capacity } = device;
  const { setSelectedDevice } = useDeviceContext();
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
            setSelectedDevice(device);
            setDeviceDialogOpen(true);
          }}
        >
          Edit
        </Button>
        <IconButton
          onClick={() => {
            setSelectedDevice(device);
            setDeleteDialogOpen(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </DeviceActions>
    </DeviceContainer>
  );
}

export default function Devices() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deviceDialogOpen, setDeviceDialogOpen] = useState(false);
  const { selectedDevice, devices, refetchDevices } = useDeviceContext();
  const deleteDevice = useDeleteDevice();

  return (
    <StyledPaper>
      {devices.map((device, index) => {
        const lastItem = index === devices.length - 1;

        return (
          <React.Fragment key={device.id}>
            <Device
              device={device}
              setDeleteDialogOpen={setDeleteDialogOpen}
              setDeviceDialogOpen={setDeviceDialogOpen}
            />
            {!lastItem && <Divider />}
          </React.Fragment>
        );
      })}

      <ConfirmDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        primaryAction={async () => {
          try {
            await deleteDevice(selectedDevice.id);
            setDeleteDialogOpen(false);
            refetchDevices();
            // show success snackbar
          } catch (e) {
            // show error snackbar
          }
        }}
        primaryText={"Delete"}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete {selectedDevice.system_name}
          </DialogContentText>
        </DialogContent>
      </ConfirmDialog>

      <DeviceDialog
        open={deviceDialogOpen}
        handleClose={() => setDeviceDialogOpen(false)}
      />
    </StyledPaper>
  );
}
