import { NumberInput, Title, Text, Group, Paper } from "@mantine/core";

import courses from "../utils/courses.json";
import modules from "../utils/modules.json";
import React, { useState } from "react";

interface Marks {
  [moduleId: number]: (number | "")[];
}

export default function Year2Calc({ selectedCourse }: any) {
  const [marks, setMarks] = useState<Marks>({});
  const [modulePercentages, setModulePercentages] = useState<string[]>([]);

  const moduleData = modules.modules;
  const courseData = courses.courses;
  const selectedCourseModules = getRelatedModulesByCourseId(selectedCourse);

  /**
   * Handles the selection of course, taken from parent component.
   * @param {string} courseId - The ID of the course.
   */
  function getRelatedModulesByCourseId(courseId: string) {
    const chosenCourse = courseData.find((course) => course.id === parseInt(courseId));

    if (chosenCourse) {
      const relevantModules = moduleData.filter((module) =>
        chosenCourse.moduleIDs.includes(module.id)
      );
      return relevantModules;
    }
    return [];
  }

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

      const percentages = selectedCourseModules.map((module) => calculateModulePercentage(module.id));
      setModulePercentages(percentages);
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
        (accum, { markWeight }, index) => accum + (currentModuleMarks[index] || 0) * markWeight,
        0
      );

      return Math.min(weightedAverage, 100).toFixed(2);
    }
    return "";
  }

  function calculateCorrectedMark(arrayOfPercentages: string[]) {
    if (arrayOfPercentages.length === 8) {
      const percentagesToNum: number[] = arrayOfPercentages.map(Number);
      const sortedPercentages: number[] = [...percentagesToNum].sort((a, b) => a - b);

      sortedPercentages.shift();

      const sum: number = sortedPercentages.reduce((total, values) => total + values, 0);
      const mean: number = sum / sortedPercentages.length;

      return Math.min(mean, 100).toFixed(2);
    } else {
      return "N/A";
    }
  }

  return (
    <section style={{ paddingTop: "1rem" }}>
      <Title order={3}>Year 2 Modules: </Title>
      {selectedCourseModules.map(({ id, name, markScheme }) => (
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
      <Paper shadow="sm" radius="md" p="md" mt="xl" withBorder>
        <Text size={"lg"} weight={"bold"}>
          Corrected Year 2 Mark: {calculateCorrectedMark(modulePercentages) + "%" || "%"}
        </Text>
      </Paper>
    </section>
  );
}
