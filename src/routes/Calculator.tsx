import { Container } from "@mantine/core";
import CalculatorForm from "../components/CalculatorForm";
import { useState } from "react";
import Year2Calc from "../components/Year2Calc";
import Year3Calc from "../components/Year3Calc";

export default function Calculator() {
  const [receivedYear, setReceivedYear] = useState<string>("");
  const [receivedCourse, setReceivedCourse] = useState<string>("");
  const [receivedTerm1Modules, setReceivedTerm1Modules] = useState<string[]>([]);
  const [receivedTerm2Modules, setReceivedTerm2Modules] = useState<string[]>([]);

  function receiveFormData(
    year: string,
    course: string,
    term1Modules: string[],
    term2Modules: string[]
  ) {
    setReceivedYear(year);
    setReceivedCourse(course);
    setReceivedTerm1Modules(term1Modules);
    setReceivedTerm2Modules(term2Modules);
  }

  return (
    <Container py={"md"} role="region">
      <CalculatorForm formData={receiveFormData} />
      <Year2Calc selectedCourse={receivedCourse} />
      {receivedYear === "Year 3" && (
        <Year3Calc
          selectedTerm1Modules={receivedTerm1Modules}
          selectedTerm2Modules={receivedTerm2Modules}
        />
      )}
    </Container>
  );
}
