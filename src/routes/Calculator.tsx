import {
  Button,
  Container,
  Group,
  Menu,
  Modal,
  NativeSelect,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import courses from "../utils/courses.json";
import modules from "../utils/modules.json";
import { useDisclosure } from "@mantine/hooks";

export default function Calculator() {
  const [currentModal, setCurrentModal] = useState<number>(0);
  const [coursesData, setCoursesData] = useState(courses.courses);
  const [modulesData, setModulesData] = useState(modules.modules);
  const [selectedCourseID, setSelectedCourseID] = useState<string>("");
  const [yearGroup, setYearGroup] = useState<number>(0);
  const [opened, { open, close }] = useDisclosure(true);

  const courseSelectionOptions = coursesData.map((course) => ({
    value: String(course.id),
    label: course.name,
  }));

  useEffect(() => {
    open();
  }, []);

  function handleNextModal() {
    setCurrentModal(currentModal + 1);
  }

  function handleSelectedCourse(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCourseID(event.target.value);
  }

  return (
    <Container py={"md"} role="region">
      {currentModal === 0 && (
        <Modal
          opened={opened}
          onClose={close}
          title={"Select your course!"}
          closeOnClickOutside={false}
          centered
        >
          <Text>Please select your course.</Text>
          <NativeSelect
            label={"Select your course:"}
            aria-label={"Dropdown menu with a variety of course options."}
            data={courseSelectionOptions}
            value={selectedCourseID}
            onChange={handleSelectedCourse}
          />
          <Text>Selected ID is: {selectedCourseID}</Text>
          <Button onClick={handleNextModal}>Next</Button>
        </Modal>
      )}

      {currentModal === 1 && (
        <Modal
          opened={opened}
          onClose={close}
          title={"Select year group!"}
          closeOnClickOutside={false}
          centered
        >
          <Text>Select the year group you're currently in.</Text>
          <Group position="center" sx={{ padding: "1rem" }}>
            <Button onClick={close}>Year 2</Button>
            <Button>Year 3</Button>
          </Group>
        </Modal>
      )}
    </Container>
  );
}
