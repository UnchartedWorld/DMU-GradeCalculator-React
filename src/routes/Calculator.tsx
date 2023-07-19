import { Container } from "@mantine/core";
import CalculatorForm from "../components/CalculatorForm";
import { useState } from "react";
import Year2Calc from "../components/Year2Calc";
import Year3Calc from "../components/Year3Calc";

interface Modules {
  id: number;
  name: string;
  termOfModule?: number;
  yearOfModule: number;
  markScheme: {
    type: string;
    markWeight: number;
    totalMarks: number;
  }[];
}

export default function Calculator() {
  const [receivedYear, setReceivedYear] = useState<string>("");
  const [receivedCourse, setReceivedCourse] = useState<string>("");
  const [receivedTerm1Modules, setReceivedTerm1Modules] = useState<string[]>([]);
  const [receivedTerm2Modules, setReceivedTerm2Modules] = useState<string[]>([]);
  const [receivedDevelopmentProject, setReceivedDevelopmentProject] = useState<Modules[]>([]);
  const [year2CorrectedMark, setYear2CorrectedMark] = useState<number>();
  const [year3CorrectedMark, setYear3CorrectedMark] = useState<number>();
  const [degreeMark, setDegreeMark] = useState<number>();

  function receiveFormData(
    year: string,
    course: string,
    term1Modules: string[],
    term2Modules: string[],
    developmentProject: Modules[]
  ) {
    setReceivedYear(year);
    setReceivedCourse(course);
    setReceivedTerm1Modules(term1Modules);
    setReceivedTerm2Modules(term2Modules);
    setReceivedDevelopmentProject(developmentProject);
    console.log("Development Project", receivedDevelopmentProject);
  }

  function getYear2CorrectedMark(mark: number) {
    setYear2CorrectedMark(mark);
  }

  function getYear3CorrectedMark(mark: number) {
    setYear3CorrectedMark(mark);
  }

  console.log("Year 2 corrected", year2CorrectedMark)
  console.log("Year 3 corrected", year3CorrectedMark)

  function getDegreeMark(secondYearMarks: number, thirdYearMarks: number) {
    if (secondYearMarks && thirdYearMarks) {
      const overallDegreeMark = (secondYearMarks / 100 * 25) + (thirdYearMarks / 100 * 75);

      setDegreeMark(overallDegreeMark);
    } 
  }

  function getDegreeClassification(degreeMark: number): string {
    if (degreeMark && degreeMark >= 70) {
      return "First Class/Distinction"
    } else if (degreeMark && degreeMark >= 60) {
      return "Upper Second Class/Merit"
    } else if (degreeMark && degreeMark >= 50) {
      return "Lower Second Class/Pass"
    } else if (degreeMark && degreeMark >= 40) {
      return "Pass"
    } else {
      return "Fail"
    }
  }

  return (
    <Container py={"md"} role="region">
      <CalculatorForm formData={receiveFormData} />
      <Year2Calc selectedCourse={receivedCourse} onCorrectedMarkChange={getYear2CorrectedMark} />

      {receivedYear === "Year 3" && (
        <Year3Calc
          selectedTerm1Modules={receivedTerm1Modules}
          selectedTerm2Modules={receivedTerm2Modules}
          developmentProject={receivedDevelopmentProject}
          onCorrectedMarkChange={getYear3CorrectedMark}
        />
      )}
    </Container>
  );
}
