import { Container } from "@mantine/core";

import CalculatorForm from "../components/CalculatorForm";

export default function Calculator() {
  return (
    <Container py={"md"} role="region">
      <CalculatorForm />
    </Container>
  );
}
