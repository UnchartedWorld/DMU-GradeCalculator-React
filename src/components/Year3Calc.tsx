import { Text } from "@mantine/core";


export default function Year3Calc({selectedTerm1Modules, selectedTerm2Modules}: any) {
    return (
        <section>
            <Text>{selectedTerm1Modules} + {selectedTerm2Modules}</Text>

        </section>
    );
}