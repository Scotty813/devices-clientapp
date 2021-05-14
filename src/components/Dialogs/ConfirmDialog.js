import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

export default function FormDialog({
  open,
  handleClose,
  primaryAction,
  primaryText,
  children,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        {children}
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
