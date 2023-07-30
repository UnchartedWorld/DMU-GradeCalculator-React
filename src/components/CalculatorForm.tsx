import { useState } from "react";
import courses from "../utils/courses.json";
import modules from "../utils/modules.json";
import { Accordion, Alert, Button, MultiSelect, Select, Stack, Text, Title, rem } from "@mantine/core";
import { IconAlertCircle, IconBulb } from "@tabler/icons-react";

export default function CalculatorForm({ formData }: any) {
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedTerm1Modules, setSelectedTerm1Modules] = useState<string[]>([]);
  const [selectedTerm2Modules, setSelectedTerm2Modules] = useState<string[]>([]);
  const [optionsBooleanStatus, setOptionsBooleanStatus] = useState<boolean>(false);
  const [missingFieldsNotif, setMissingFieldsNotif] = useState<boolean>(false);

  const modulesData = modules.modules;
  const coursesData = courses.courses;
  const developmentProject = modulesData.filter((module) => module.name === "Development Project");

  const courseSelectionOptions = coursesData.map((course) => ({
    value: String(course.id),
    label: course.name,
  }));

  const term1ModuleOptions = modulesData
    .filter((module) => module.termOfModule === 1 && module.yearOfModule === 3)
    .map((module) => ({
      value: String(module.id),
      label: module.name,
    }));

  const term2ModuleOptions = modulesData
    .filter((module) => module.termOfModule === 2 && module.yearOfModule === 3)
    .map((module) => ({
      value: String(module.id),
      label: module.name,
    }));

  function handleFormData() {
    const year: string = selectedYear;
    const course: string = selectedCourse;
    const term1Modules: string[] = selectedTerm1Modules;
    const term2Modules: string[] = selectedTerm2Modules;

    if (year === "Year 2" && course) {
      formData(year, course);
      setOptionsBooleanStatus(true);
      setMissingFieldsNotif(false);
    } else if (
      year === "Year 3" &&
      course &&
      term1Modules &&
      term2Modules &&
      term1Modules.length &&
      term2Modules.length
    ) {
      formData(year, course, term1Modules, term2Modules, developmentProject);
      setOptionsBooleanStatus(true);
      setMissingFieldsNotif(false);
    } else {
      setMissingFieldsNotif(true);
    }
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
      {missingFieldsNotif && (
        <Alert title="Missing field(s)!" icon={<IconAlertCircle size={"1.1rem"} />} color="red">
          It appears you failed to fill in all required fields. Make sure to do so!
        </Alert>
      )}
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
          disabled={optionsBooleanStatus}
        />
        <Accordion variant="contained" defaultValue={"Search for your course"}>
          <Accordion.Item value={"Search for your course"}>
            <Accordion.Control icon={<IconBulb size={rem(20)} />}>Search for your course</Accordion.Control>
            <Accordion.Panel>
              You can search for your course and/or modules with text inputs.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Select
          data={["Year 2", "Year 3"]}
          label="Select your year group"
          placeholder="Years? Too many years if you ask me"
          onChange={(value) => handleYearSelection(value)}
          required
          disabled={optionsBooleanStatus}
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
              disabled={optionsBooleanStatus}
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
              disabled={optionsBooleanStatus}
            />
            <Accordion variant="contained" defaultValue={"Maximum of 3"}>
              <Accordion.Item value={"Maximum of 3"}>
                <Accordion.Control icon={<IconBulb size={rem(20)} />}>Only select 3 modules per term</Accordion.Control>
                <Accordion.Panel>
                  You can select and remove your year 3 module choices before submitting.{" "}
                  <b>Remember: you must choose 3 modules per term</b>.
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Stack>
        )}
        <Button onClick={handleFormData} disabled={optionsBooleanStatus}>
          Submit form data
        </Button>
        <Text c={"dimmed"}>
          Once you hit submit, you cannot change or resubmit values without refreshing.
        </Text>
      </Stack>
    </section>
  );
}
