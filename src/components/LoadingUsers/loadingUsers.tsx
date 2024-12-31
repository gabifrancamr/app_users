import { Flex, Spinner, Text } from "@chakra-ui/react";
export function LoadingUsers() {
    return (
        <Flex alignItems={"center"} justify={"center"} gap={"1.5"} height={"100vh"}>
            <Spinner />
            <Text textStyle={"2xl"}>Carregando usuários...</Text>
        </Flex>
    )
}