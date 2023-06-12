import { NumberInput, Title, Text, Group } from "@mantine/core";

import courses from "../utils/courses.json"
import modules from "../utils/modules.json"
import React from "react";


export default function Year2Calc({selectedCourse}: any) {
    const moduleData = modules.modules
    const courseData = courses.courses
    const selectedCourseModules = getRelatedModulesByCourseId(selectedCourse);

    function getRelatedModulesByCourseId(courseId: string) {
        const chosenCourse = courseData.find((course) => course.id === parseInt(courseId))

        if (chosenCourse) {
            const relevantModules = moduleData.filter((module) => chosenCourse.moduleIDs.includes(module.id))
            return relevantModules;
        }
        return [];
    }


    return (
        <section>
            {selectedCourseModules.map(({id, name, markScheme}) => (
                <React.Fragment key={id}>
                    <Title order={3}>{name}</Title>
                    <Group grow>
                    {markScheme.map((markOptions) => (
                        <NumberInput 
                            label={markOptions.type} 
                            min={0} 
                            max={100} 
                            description={"Input is between 0 and 100"} 
                            placeholder="Enter your module mark" />
                    ))}
                    </Group>
                    {/* This needs to contain the calculated value. This will be done AFTER I solve the issue with the inputs. */}
                    <Text size={"md"}>Overall percentage: {"?"}%</Text>
                </React.Fragment>
            ))}

        </section>
    );
}