import Checkbox from "@material-ui/core/Checkbox";
import { DEVICE_TYPES } from "../utils/constants";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import styled from "styled-components";

const StyledFormControl = styled(FormControl)({
  minWidth: "120px",
});

const FiltersContainer = styled.div({
  display: "flex",
  alignItems: "flex-end",
  "& > div:first-child": {
    marginRight: "16px",
  },
});

export default function Filters({ filters, setFilters, sortBy, setSortBy }) {
  return (
    <FiltersContainer>
      <StyledFormControl>
        <InputLabel id="filter-by-type">Filter</InputLabel>
        <Select
          labelId="filter-by-type"
          multiple
          value={filters}
          onChange={(e) => setFilters(e.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
        >
          {Object.keys(DEVICE_TYPES).map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={filters.indexOf(type) > -1} />
              <ListItemText primary={DEVICE_TYPES[type]} />
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      <FormControl>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            HDD Capacity
          </MenuItem>
          <MenuItem value={"ascending"}>Ascending</MenuItem>
          <MenuItem value={"descending"}>Descending</MenuItem>
        </Select>
      </FormControl>
    </FiltersContainer>
  );
}
