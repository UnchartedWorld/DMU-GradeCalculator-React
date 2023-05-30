import "./App.css";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import { useColorScheme } from "@mantine/hooks";
import { useState } from "react";
import Calculator from "./routes/Calculator";

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] =
    useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
