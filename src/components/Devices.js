import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useGetDevices from "../hooks/useGetDevices";
import styled from "styled-components";
import React, { useState } from "react";
import ConfirmDialog from "./Dialogs/ConfirmDialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDeviceContext } from "../context/DeviceContext";
import useDeleteDevice from "../hooks/useDeleteDevice";

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

function Device({ device, setDeleteDialogOpen }) {
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
        <Button>Edit</Button>
        <IconButton
          onClick={() => {
            setDeleteDialogOpen(true);
            setSelectedDevice(device);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </DeviceActions>
    </DeviceContainer>
  );
}

export default function Devices() {
  const { devices, refetchDevices } = useGetDevices();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { selectedDevice } = useDeviceContext();
  const deleteDevice = useDeleteDevice();

  return (
    <StyledPaper>
      {devices.map((device, index) => {
        const lastItem = index === devices.length - 1;

        return (
          <React.Fragment key={device.id}>
            <Device device={device} setDeleteDialogOpen={setDeleteDialogOpen} />
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
    </StyledPaper>
  );
}
