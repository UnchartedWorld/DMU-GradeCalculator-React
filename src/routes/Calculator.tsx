import { Accordion, Container, Table, rem } from "@mantine/core";
import CalculatorForm from "../components/CalculatorForm";
import { useEffect, useState } from "react";
import Year2Calc from "../components/Year2Calc";
import Year3Calc from "../components/Year3Calc";
import { IconBulb } from "@tabler/icons-react";

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
  }

  function getYear2CorrectedMark(mark: number) {
    setYear2CorrectedMark(mark);
  }

  function getYear3CorrectedMark(mark: number) {
    setYear3CorrectedMark(mark);
  }

  function getDegreeMark(secondYearMarks: number, thirdYearMarks: number) {
    if (secondYearMarks && thirdYearMarks) {
      const overallDegreeMark = (secondYearMarks / 100) * 25 + (thirdYearMarks / 100) * 75;

      if (!Number.isNaN(overallDegreeMark)) {
        setDegreeMark(overallDegreeMark);
      } else {
        setDegreeMark(undefined);
      }
    }
  }

  function getDegreeClassification(degreeMark: number): string {
    if (degreeMark && degreeMark >= 70) {
      return "First Class/Distinction";
    } else if (degreeMark && degreeMark >= 60) {
      return "Upper Second Class/Merit";
    } else if (degreeMark && degreeMark >= 50) {
      return "Lower Second Class/Pass";
    } else if (degreeMark && degreeMark >= 40) {
      return "Pass";
    } else if (degreeMark && degreeMark < 40) {
      return "Fail";
    } else {
      return "N/A";
    }
  }

  useEffect(() => {
    if (year2CorrectedMark && year3CorrectedMark) {
      getDegreeMark(year2CorrectedMark, year3CorrectedMark);
    }
  }, [year2CorrectedMark, year3CorrectedMark]);

  return (
    <Container py={"md"} role="region">
      <CalculatorForm formData={receiveFormData} />
      {receivedYear === "Year 2" && (
        <Year2Calc selectedCourse={receivedCourse} onCorrectedMarkChange={getYear2CorrectedMark} />
      )}
      {receivedYear === "Year 3" && (
        <>
          <Year2Calc
            selectedCourse={receivedCourse}
            onCorrectedMarkChange={getYear2CorrectedMark}
          />
          <Year3Calc
            selectedTerm1Modules={receivedTerm1Modules}
            selectedTerm2Modules={receivedTerm2Modules}
            developmentProject={receivedDevelopmentProject}
            onCorrectedMarkChange={getYear3CorrectedMark}
          />
        </>
      )}
      {degreeMark && (
        <>
          <Table highlightOnHover withBorder captionSide="bottom" mt="lg">
            <caption>Table showing the overall degree mark and degree classification</caption>
            <thead>
              <tr>
                <th>Overall Results</th>
                <th>Mark/Classification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Degree mark</td>
                <td>
                  <u>{degreeMark.toFixed(2).concat("%") || "N/A"}</u>
                </td>
              </tr>
              <tr>
                <td>Degree classification</td>
                <td>
                  <u>{(degreeMark && getDegreeClassification(degreeMark)) || "N/A"}</u>
                </td>
              </tr>
            </tbody>
          </Table>
          <Accordion mt={"md"} variant="contained" defaultValue={"Explanation of Classification"}>
            <Accordion.Item value="Explanation of classification">
              <Accordion.Control icon={<IconBulb size={rem(20)} />}>
                How are the classifications calculated?
              </Accordion.Control>
              <Accordion.Panel>
                Your classification is calculated as such: (2nd Year Overall Mark / 100) * 25 + (3rd
                Year Overall Mark / 100) * 75. The result of this will be between 0 and 100, and
                will return either a classification, Fail or "N/A" in the case of unusual values.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </>
      )}
    </Container>
  );
}
