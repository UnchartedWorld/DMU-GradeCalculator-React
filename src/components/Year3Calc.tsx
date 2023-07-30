import { Accordion, Group, NumberInput, Paper, Text, Title, rem } from "@mantine/core";
import React, { useState } from "react";

import modules from "../utils/modules.json";
import { IconBulb } from "@tabler/icons-react";

interface Marks {
  [moduleId: number]: (number | "")[];
}

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

interface PercentageProps {
  id: number;
  percentage: string;
}

export default function Year3Calc({
  selectedTerm1Modules,
  selectedTerm2Modules,
  developmentProject,
  onCorrectedMarkChange,
}: any) {
  const [marks, setMarks] = useState<Marks>({});
  const [modulePercentages, setModulePercentages] = useState<PercentageProps[]>([]);

  const moduleData = modules.modules;
  const receivedDevProject: Modules[] = developmentProject;
  const term1Filtered: Modules[] = moduleData.filter((mod) =>
    selectedTerm1Modules.includes(String(mod.id))
  );
  const term2Filtered: Modules[] = moduleData.filter((mod) =>
    selectedTerm2Modules.includes(String(mod.id))
  );
  const termAndDevModules = term1Filtered.concat(term2Filtered, receivedDevProject);

  /**
   * Handles the changing of the grade input field, storing it in a useState variable called marks.
   * @param {number} moduleId - The ID of the module.
   * @param {number} testIndex - The index of the given test, being either a phase test OR coursework for the module.
   */
  function handleGradeChange(moduleId: number, testIndex: number) {
    /**
     * Handles the grade change for the given module & test index.
     * @param {number | ""} value - The new value for the test mark.
     */
    return function (value: number | "") {
      setMarks((previousMarks) => ({
        ...(previousMarks ?? {}),
        [moduleId]: {
          ...(previousMarks?.[moduleId] ?? []),
          [testIndex]: value,
        },
      }));

      setModulePercentages(() => {
        const newPercentages: PercentageProps[] = termAndDevModules.map((module) => ({
          id: module.id,
          percentage: calculateModulePercentage(module.id),
        }));
        return newPercentages;
      });
      calculateCorrectedMark(modulePercentages);
    };
  }

  /**
   * Handles the calculation of the overall module percentage based on user input
   * @param {number} moduleId - The ID of the module.
   * @returns {string} Weighted average as a string, or empty string
   */
  function calculateModulePercentage(moduleId: number): string {
    const currentModuleMarks = marks[moduleId];
    const currentMarkScheme = moduleData.find((module) => module.id === moduleId)?.markScheme;

    if (currentModuleMarks && currentMarkScheme) {
      const weightedAverage = currentMarkScheme.reduce(
        (accum, { markWeight, type, totalMarks }, index) => {
          if (type === "Meetings") {
            const input = (currentModuleMarks[index] || 0) * 10;
            return accum + input * markWeight;
          } else if (totalMarks === 200) {
            const input = currentModuleMarks[index] || 0;
            return accum + (input / 2) * markWeight;
          } else {
            const input = currentModuleMarks[index] || 0;
            return accum + input * markWeight;
          }
        },
        0
      );

      return Math.min(weightedAverage, 100).toFixed(2);
    }
    return "";
  }

  /**
   * Sorts PercentageProps arrays in ascending order.
   * @param a The first percentage value from the desired array
   * @param b The second percentage value from the desired array.
   * @returns {number} An ordered list of PercentageProps in ascending order.
   */
  function compareByPercentages(a: PercentageProps, b: PercentageProps): number {
    return parseInt(a.percentage) - parseInt(b.percentage);
  }

  /**
   * Handles the calculation and returning of a corrected mark.
   * @param arrayOfPercentages - An array of unmodified percentages from user inputs.
   * @returns {string} Either a number representing the corrected mark, or a string returning N/A.
   */

  function calculateCorrectedMark(arrayOfPercentages: PercentageProps[]): string {
    if (arrayOfPercentages.length === 7) {
      const slicedAndSortedPercentages: PercentageProps[] = modulePercentages
        .slice()
        .sort(compareByPercentages);

      if (slicedAndSortedPercentages[0].id !== receivedDevProject[0].id) {
        const sum: number = slicedAndSortedPercentages.reduce(
          (total, values) => total + parseInt(values.percentage),
          0
        );
        const mean: number = sum / slicedAndSortedPercentages.length;

        const correctedMarkResult = Math.min(mean, 100).toFixed(2);
        onCorrectedMarkChange(correctedMarkResult);

        return correctedMarkResult;
      } else {
        slicedAndSortedPercentages.splice(1, 1);

        const sum: number = slicedAndSortedPercentages.reduce(
          (total, values) => total + parseInt(values.percentage),
          0
        );
        const mean: number = sum / slicedAndSortedPercentages.length;

        const correctedMarkResult = Math.min(mean, 100).toFixed(2);
        onCorrectedMarkChange(correctedMarkResult);

        return correctedMarkResult;
      }
    } else {
      return "N/A";
    }
  }

  return (
    <section style={{ paddingTop: "1rem" }}>
      <Title order={3}>Year 3 Modules </Title>
      <Title mt={"xl"} order={3}>Term 1 Modules: </Title>

      {term1Filtered.map(({ id, name, markScheme }) => (
        <React.Fragment key={id}>
          <Title order={4}>{name}</Title>
          <Group grow>
            {markScheme.map((markOptions, testIndex) => (
              <NumberInput
                label={markOptions.type}
                min={0}
                max={markOptions.totalMarks}
                value={marks[id] ? marks[id][testIndex] || "" : ""}
                onChange={handleGradeChange(id, testIndex)}
                description={`Input is between 0 and ${markOptions.totalMarks}`}
                placeholder="Enter your module mark"
              />
            ))}
          </Group>
          <Text size={"md"}>Overall percentage: {calculateModulePercentage(id)}%</Text>
        </React.Fragment>
      ))}

      <Title order={3} pt={"xs"}>
        Term 2 Modules:{" "}
      </Title>

      {term2Filtered.map(({ id, name, markScheme }) => (
        <React.Fragment key={id}>
          <Title order={4}>{name}</Title>
          <Group grow>
            {markScheme.map((markOptions, testIndex) => (
              <NumberInput
                label={markOptions.type}
                min={0}
                max={markOptions.totalMarks}
                value={marks[id] ? marks[id][testIndex] || "" : ""}
                onChange={handleGradeChange(id, testIndex)}
                description={`Input is between 0 and ${markOptions.totalMarks}`}
                placeholder="Enter your module mark"
              />
            ))}
          </Group>
          <Text size={"md"}>Overall percentage: {calculateModulePercentage(id)}%</Text>
        </React.Fragment>
      ))}
      <Title order={3} pt={"xs"}>
        Development Project:{" "}
      </Title>

      {receivedDevProject.map(({ id, markScheme }) => (
        <React.Fragment key={id}>
          <Group grow>
            {markScheme.map((markOptions, testIndex) => (
              <NumberInput
                label={markOptions.type}
                min={0}
                max={markOptions.totalMarks}
                value={marks[id] ? marks[id][testIndex] || "" : ""}
                onChange={handleGradeChange(id, testIndex)}
                description={
                  markOptions.type === "Meetings"
                    ? `Number of meetings are between 0 and ${markOptions.totalMarks}`
                    : `Input is between 0 and ${markOptions.totalMarks}`
                }
                placeholder={
                  markOptions.type === "Meetings"
                    ? "Enter number of attended meetings"
                    : "Enter your module mark"
                }
              />
            ))}
          </Group>
          <Text size={"md"}>Overall percentage: {calculateModulePercentage(id)}%</Text>
        </React.Fragment>
      ))}

      <Paper shadow="sm" radius="md" p="md" mt="xl" withBorder>
        <Text size={"lg"} weight={"bold"}>
          Corrected Year 3 Mark: {calculateCorrectedMark(modulePercentages) + "%" || "%"}
        </Text>
      </Paper>
      <Accordion mt={"md"} variant="contained" defaultValue={"What is a corrected mark year 3?"}>
        <Accordion.Item value="What is a corrected mark year 3?">
          <Accordion.Control icon={<IconBulb size={rem(20)} />}>
            What is a corrected mark?
          </Accordion.Control>
          <Accordion.Panel>
            Corrected marks are taken from the provided percentages from each year's module. Then,
            after the lowest is deducted, it takes the remaining values and finds the mean of them.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </section>
  );
}
