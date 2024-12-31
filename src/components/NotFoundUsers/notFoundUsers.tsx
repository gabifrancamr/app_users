import { Flex, Text } from "@chakra-ui/react";
import { MdError } from "react-icons/md";
export function NotFoundUsers() {
    return (
        <Flex alignItems={"center"} justifyContent={"center"} gap={"1.5"}>
            <MdError size={30} />
            <Text textStyle={{base: "1xl", sm: "2xl"}}>Usuários não encontrados</Text>
        </Flex>
    )
}