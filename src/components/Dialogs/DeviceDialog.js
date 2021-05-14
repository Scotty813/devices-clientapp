import Button from "@material-ui/core/Button";
import { DEVICE_TYPES } from "../../utils/constants";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { useDeviceContext } from "../../context/DeviceContext";
import useEditDevice from "../../hooks/useEditDevice";
import useGetDevices from "../../hooks/useGetDevices";

const StyledTextField = styled(TextField)({
  marginBottom: "8px",
});

export default function DeviceDialog({ open, handleClose }) {
  const { selectedDevice, setSelectedDevice, refetchDevices } =
    useDeviceContext();
  const editDevice = useEditDevice();
  // const { refetchDevices } = useGetDevices();

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedDevice ? "Edit" : "Add"} Device</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter device details here:</DialogContentText>

          <StyledTextField
            autoFocus
            required
            margin="dense"
            label="System Name"
            fullWidth
            value={selectedDevice?.system_name || ""}
            onChange={(e) =>
              setSelectedDevice({
                ...selectedDevice,
                system_name: e.target.value,
              })
            }
          />

          <FormControl required>
            <InputLabel shrink id="type">
              Type:
            </InputLabel>
            <Select
              labelId="type"
              required
              value={selectedDevice?.type || ""}
              onChange={(e) =>
                setSelectedDevice({
                  ...selectedDevice,
                  type: e.target.value,
                })
              }
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select system type
              </MenuItem>
              {Object.keys(DEVICE_TYPES).map((type) => (
                <MenuItem key={type} value={type}>
                  {DEVICE_TYPES[type]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            required
            margin="dense"
            label="HDD Capacity (GB)"
            fullWidth
            type="number"
            defaultValue={selectedDevice?.hdd_capacity || null}
            onChange={(e) =>
              setSelectedDevice({
                ...selectedDevice,
                hdd_capacity: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await editDevice(selectedDevice);
              refetchDevices();
            }}
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
