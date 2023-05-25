import "./App.css";
import { MantineProvider, Text } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Mantine test text</Text>
    </MantineProvider>
  );
}

export default App;
