import Devices from "./components/Devices";
import Header from "./components/Header";
import styled from "styled-components";

const Main = styled.div({
  display: "grid",
  placeItems: "center",
  minHeight: "calc(100vh - 64px)",
  width: "40%",
  margin: "auto",
});

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
