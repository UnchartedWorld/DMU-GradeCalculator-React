import { useState } from "react";
import courses from "../utils/courses.json";
import modules from "../utils/modules.json";
import { Button, MultiSelect, Select, Stack, Title } from "@mantine/core";

export default function CalculatorForm({ formData }: any) {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTerm1Modules, setSelectedTerm1Modules] = useState<string[]>([]);
  const [selectedTerm2Modules, setSelectedTerm2Modules] = useState<string[]>([]);

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

  function handleFormData() {
    const year: string = selectedYear;
    const course: string = selectedCourse;
    const term1Modules: string[] = selectedTerm1Modules;
    const term2Modules: string[] = selectedTerm2Modules;

    formData(year, course, term1Modules, term2Modules);
  }

  function handleYearSelection(value: string | null) {
    if (value !== null) {
      setSelectedYear(value);
    }
  }

  function handleCourseSelection(value: string | null) {
    if (value !== null) {
      setSelectedCourse(value);
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
          onChange={(value) => handleCourseSelection(value)}
          searchable
          nothingFound={"Didn't find anything :("}
          required
        />

        <Select
          data={["Year 2", "Year 3"]}
          label="Select your year group"
          placeholder="Years? Too many years if you ask me"
          onChange={(value) => handleYearSelection(value)}
          required
        />

        {selectedYear === "Year 3" && (
          <Stack>
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
        )}
        <Button onClick={handleFormData}>Submit data</Button>
      </Stack>
    </section>
  );
}
