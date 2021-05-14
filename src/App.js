import Devices from "./components/Devices";
import Header from "./components/Header";
import styled from "styled-components";

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
  return (
    <div>
      <Header />
      <Main>
        <Devices />
      </Main>
    </div>
  );
}

export default App;
