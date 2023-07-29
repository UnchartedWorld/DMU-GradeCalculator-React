import { Button, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container py={"md"} size={800} role="region">
      <Title
        id="homeTitle"
        variant="gradient"
        gradient={{ from: "grape", to: "violet", deg: 40 }}
        ta={"center"}
        order={1}
        ff={"sans-serif"}
      >
        Calculate your grade!
      </Title>
      <Text mt={"md"} ta={"center"}>
        Did you start your course in 2020/2021? Use this calculator to discover what your predicted
        grade is likely to be. If you're in another year group, feel free to make some suggestions
        via an issue on how best to implement alternate grading.
      </Text>
      <Text mt={"xs"} ta={"center"}>
        If you're curious about the website or have any general queries, check out the About page,
        as it may clarify a few things for you.
      </Text>

      <Button mt={"md"} style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={"/calculator"}>
          Get started!
        </Link>
      </Button>
    </Container>
  );
}
