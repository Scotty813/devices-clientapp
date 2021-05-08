import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
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

function Device() {
  return (
    <DeviceContainer>
      <div>
        <div>SUSAN-DESKTOP</div>
        <div>Windows Workstation</div>
        <div>128 GB</div>
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
  return (
    <StyledPaper>
      <Device />
      <Divider />
      <Device />
      <Divider />
      <Device />
    </StyledPaper>
  );
}
