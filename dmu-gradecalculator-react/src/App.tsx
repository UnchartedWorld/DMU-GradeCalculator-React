import "./App.css";
import { MantineProvider, Button } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Button>Mantine button</Button>
    </MantineProvider>
  );
}

export default App;
