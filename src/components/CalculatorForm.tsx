import { useState } from "react";
import courses from "../utils/courses.json";
import modules from "../utils/modules.json";
import { MultiSelect, Select, Stack, Title } from "@mantine/core";

interface Module {
  id: number;
  name: string;
  termOfModule: number;
  yearOfModule: number;

  markScheme: (
    | {
        type: string;
        markWeight: number;
        totalMarks: number;
        name?: undefined;
      }
    | {
        name: string;
        markWeight: number;
        totalMarks: number;
        type?: undefined;
      }
  )[];
}

export default function CalculatorForm() {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedTerm1Modules, setSelectedTerm1Modules] = useState<string[]>(
    []
  );
  const [selectedTerm2Modules, setSelectedTerm2Modules] = useState<string[]>(
    []
  );

  const modulesData = modules.modules;
  const coursesData = courses.courses;

  const courseSelectionOptions = coursesData.map((course) => ({
    value: String(course.id),
    label: course.name,
  }));

  const term1ModuleOptions = modulesData
    .filter((module) => module.termOfModule === 1)
    .map((module) => ({
      value: String(module.id),
      label: module.name,
    }));

  const term2ModuleOptions = modulesData
    .filter((module) => module.termOfModule === 2)
    .map((module) => ({
      value: String(module.id),
      label: module.name,
    }));

  function handleYearSelection(value: string | null) {
    if (value !== null) {
      setSelectedYear(value);
    }
  }

  function handleTerm1ModuleSelections(value: string[]) {
    if (value.length <= 3) {
      setSelectedTerm1Modules(value);
    }
  }

  function handleTerm2ModuleSelections(value: string[]) {
    if (value.length <= 3) {
      setSelectedTerm2Modules(value);
    }
  }

  return (
    <section>
      <Stack spacing={"sm"}>
        <Title order={2}>Calculator form</Title>

        <Select
          data={courseSelectionOptions}
          label="Select your course."
          placeholder="Search for them too if you don't want to scroll."
          onChange={(value) => handleYearSelection(value)}
          searchable
          nothingFound={"Didn't find anything :("}
          required
        />

        <Select
          data={["Year 2", "Year 3"]}
          label="Select your year group"
          placeholder="Years? Too many years if you ask me"
          required
        />

        <MultiSelect
          data={term1ModuleOptions}
          label="Select your modules for Term 1 of year 3. You can only select 3."
          placeholder="Pick some term 1 modules!"
          onChange={(values) => handleTerm1ModuleSelections(values)}
          searchable
          nothingFound={"Didn't find anything. :("}
          maxSelectedValues={3}
          required
        />

        <MultiSelect
          data={term2ModuleOptions}
          label="Select your modules for Term 2 of year 3. Again, only 3."
          nothingFound={"Didn't find anything. :("}
          searchable
          placeholder="Pick some term 2 modules!"
          onChange={(values) => handleTerm2ModuleSelections(values)}
          maxSelectedValues={3}
          required
        />
      </Stack>
    </section>
  );
}
