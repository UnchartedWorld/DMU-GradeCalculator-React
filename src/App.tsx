import "./App.css";
import {
  Affix,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Transition,
  rem,
} from "@mantine/core";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import { useColorScheme, useWindowScroll } from "@mantine/hooks";
import { useState } from "react";
import Calculator from "./routes/Calculator";
import { IconArrowUp } from "@tabler/icons-react";

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const [scroll, scrollTo] = useWindowScroll();
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <Navbar />
        <Affix position={{ bottom: rem(30), right: rem(30) }}>
          <Transition transition={"pop"} mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftIcon={<IconArrowUp size={"1rem"} />}
                style={transitionStyles}
                radius={"lg"}
                onClick={() => scrollTo({ y: 0 })}
              >
                Scroll up to top
              </Button>
            )}
          </Transition>
        </Affix>
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
