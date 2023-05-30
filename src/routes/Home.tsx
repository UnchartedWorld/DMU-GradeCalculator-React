import { Button, Container, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container py={"md"} role="region">
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
      <Text sx={{ paddingTop: "1rem" }} ta={"center"}>
        Did you start your course in 2020/2021? Use this calculator to discover
        what your predicted grade is likely to be. If you're in another year
        group, feel free to make some suggestions via an issue on how best to
        implement alternate grading.
      </Text>

      <Button mt={"1rem"}>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={"/calculator"}
        >
          Get started!
        </Link>
      </Button>
    </Container>
  );
}
