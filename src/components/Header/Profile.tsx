import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">

                {
                    showProfileData && (
                        <Box mr="4" textAlign="right">
                            <Text>Alysson Barrera</Text>
                            <Text color="gray.300" fontSize="small">alyssonbarrera@outlook.com</Text>
                        </Box>
                    )
                }

            <Avatar size="md" name="Alysson Barrera" src="https://github.com/alyssonbarrera.png"/>

        </Flex>

    )
}