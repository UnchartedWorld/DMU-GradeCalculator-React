import { Group, NumberInput, Paper, Text, Title } from "@mantine/core";
import React, { useState } from "react";

import modules from "../utils/modules.json";

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

export default function Year3Calc({
  selectedTerm1Modules,
  selectedTerm2Modules,
  developmentProject,
  onCorrectedMarkChange,
}: any) {
  const [marks, setMarks] = useState<Marks>({});
  const [modulePercentages, setModulePercentages] = useState<string[]>([]);

  const moduleData = modules.modules;
  const receivedDevProject: Modules[] = developmentProject;
  const term1Filtered: Modules[] = moduleData.filter((mod) =>
    selectedTerm1Modules.includes(String(mod.id))
  );
  const term2Filtered: Modules[] = moduleData.filter((mod) =>
    selectedTerm2Modules.includes(String(mod.id))
  );

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

      if (selectedTerm1Modules) {
        const percentages = selectedTerm1Modules.map((module: { id: number }) =>
          calculateModulePercentage(module.id)
        );
        setModulePercentages(percentages);
        calculateCorrectedMark(modulePercentages);
      } else if (selectedTerm2Modules) {
        const percentages = selectedTerm2Modules.map((module: { id: number }) =>
          calculateModulePercentage(module.id)
        );
        setModulePercentages(percentages);
        calculateCorrectedMark(modulePercentages);
      }
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
   * Handles the calculation and returning of a corrected mark.
   * @param arrayOfPercentages - An array of unmodified percentages from user inputs.
   * @returns {string} Either a number representing the corrected mark, or a string returning N/A.
   */
  function calculateCorrectedMark(arrayOfPercentages: string[]): string {
    if (arrayOfPercentages.length === 8) {
      const percentagesToNum: number[] = arrayOfPercentages.map(Number);
      const sortedPercentages: number[] = [...percentagesToNum].sort((a, b) => a - b);

      sortedPercentages.shift();

      const sum: number = sortedPercentages.reduce((total, values) => total + values, 0);
      const mean: number = sum / sortedPercentages.length;

      onCorrectedMarkChange(Math.min(mean, 100).toFixed(2));
      return Math.min(mean, 100).toFixed(2);
    } else {
      return "N/A";
    }
  }

  return (
    <section style={{ paddingTop: "1rem" }}>
      <Title order={3}>Term 1 Modules: </Title>

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
    </section>
  );
}
