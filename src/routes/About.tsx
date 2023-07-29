import { Accordion, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Container py={"md"} size={800} role="region">
      <Title order={2}>Why this website was created</Title>
      <Text>
        Based on an Excel spreadsheet from a fellow student, this website was created to facilitate
        the mobile and/or web-based input of user marks, returning module percentages, corrected
        marks and overall degree classification should the user provide such input. I felt at the
        time that using the spreadsheet - whilst certainly convenient - may not be possible for some
        students, or alternatively they may have wanted an accessible alternative. It also allowed
        me to continue practising my usage of ReactJS UI frameworks in a somewhat practical and
        useful manner.
      </Text>
      <Title align="center" mt={"lg"} order={3}>
        FAQs (or at least what I think may be FAQs)
      </Title>
      <Accordion variant="separated">
        <Accordion.Item className="privacyPolicyAccordion" value="privacy-policy">
          <Accordion.Control>What is the privacy policy of this website?</Accordion.Control>
          <Accordion.Panel>
            I personally don't collect any information, but GitHub itself does. More information can
            be seen on{" "}
            <Link
              to={
                "https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection"
              }
              target="_blank"
            >
              GitHub's Docs page.
            </Link>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item className="calculatorAccuracy" value="calculator-accuracy">
          <Accordion.Control>Is this calculator accurate? Can I rely on it?</Accordion.Control>
          <Accordion.Panel>
            I'd strongly advise against using this as a reliable way of determining your grade.
            According to the spreadsheet that this website is based on, it has a 1-3% margin of
            error, and thus <em>shouldn't be relied on for important decisions</em>.
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item className="websiteCreation" value="website-creation">
          <Accordion.Control>
            How did you make this website? I want to make something similar.
          </Accordion.Control>
          <Accordion.Panel>
            I've used Mantine UI to create this website, obviously being hosted on GitHub Pages. If
            you want to fork this project, feel free to visit the{" "}
            <Link
              to={"https://github.com/UnchartedWorld/DMU-GradeCalculator-React"}
              target="_blank"
            >
              GitHub repository
            </Link>{" "}
            and check out the information there.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
