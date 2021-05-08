import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useGetDevices from "../hooks/useGetDevices";
import styled from "styled-components";
import React from "react";

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

const DeviceActions = styled.div({
  display: "flex",
  alignItems: "center",
  "& button": {
    marginLeft: "32px",
  },
});

function Device({ device }) {
  const { system_name, type, hdd_capacity } = device;

  return (
    <DeviceContainer>
      <div>
        <div>{system_name}</div>
        <div>{type}</div>
        <div>{hdd_capacity}</div>
      </div>
      <DeviceActions>
        <Button>Edit</Button>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </DeviceActions>
    </DeviceContainer>
  );
}

export default function Devices() {
  const { devices } = useGetDevices();

  return (
    <StyledPaper>
      {devices.map((device, index) => {
        const lastItem = index === devices.length - 1;

        return (
          <React.Fragment>
            <Device key={device.id} device={device} />
            {!lastItem && <Divider />}
          </React.Fragment>
        );
      })}
    </StyledPaper>
  );
}
