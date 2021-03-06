import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { useDeviceContext } from "../../context/DeviceContext";

export default function ConfirmDialog({
  open,
  handleClose,
  primaryAction,
  primaryText,
}) {
  const { selectedDevice } = useDeviceContext();

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete {selectedDevice?.system_name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => primaryAction()} color="primary">
            {primaryText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
