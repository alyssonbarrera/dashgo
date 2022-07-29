import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, Text, useBreakpointValue, Spinner, Link as LinkChackra } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { EditButton } from "../../components/Button/EditButton";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList() {

    const [page, setPage] = useState(1);

    const { data, isLoading, isFetching, error } = useUsers(page)

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    async function handlePrefethUser(userId: string) {
        await queryClient.prefetchQuery(["user", userId], async () => {
            const response = await api.get(`/users/${userId}`)
            return response.data
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes
        })
    }

    return (
        <Box>
            <Header />
            <Flex w={"100%"} my={6} maxW={1480} mx={"auto"} px={["3", "4", "6" ]}>
                <Sidebar />

                <Box flex={1} borderRadius={8} py={8} px={["4", "4", "6" ]} bg={"gray.800"}>
                    <Flex mb={8} justifyContent={"space-between"} alignItems={"center"}>
                        <Heading size={"lg"} fontWeight={"normal"}>
                            Usuários
                            {!isLoading && isFetching && <Spinner size={"sm"} color={"gray.500"} ml={4} />}
                        </Heading>
                        <Link href="/users/create" passHref>
                            <Button
                                as={"a"}
                                size={"sm"}
                                fontSize={"small"}
                                colorScheme={"pink"}
                                leftIcon={<Icon as={RiAddLine} fontSize={20} />}
                            >
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    {
                        isLoading ? (
                            <Flex justifyContent={"center"} my={'15%'}>
                                <Spinner />
                            </Flex>
                        ) : error ? (
                            <Flex justifyContent={"center"} my={'15%'}>
                                Falha ao obter dados dos usuários
                            </Flex>
                        ) : (
                            <>
                                <Table colorScheme={"whiteAlpha"}>
                                    <Thead>
                                        <Tr>
                                            <Th px={["4", "4", "6" ]} color={"gray.300"} width={8}>
                                                <Checkbox colorScheme={"pink"} />
                                            </Th>
                                            <Th>Usuário</Th>
                                            {isWideVersion && <Th>Data de cadastro</Th>}
                                            <Th width={8}></Th>
                                        </Tr>
                                    </Thead>
            
                                    <Tbody>
                                        {
                                            data.users.map(user => {
                                                return (
                                                    <Tr key={user.id}>
                                                        <Td px={["4", "4", "6" ]}>
                                                            <Checkbox colorScheme={"pink"} />
                                                        </Td>
                                                        <Td>
                                                            <Box>
                                                                <LinkChackra color={"purple.400"} onMouseEnter={() => handlePrefethUser(user.id)}><Text fontWeight={"bold"}>{user.name}</Text></LinkChackra>
                                                                <Text fontSize={"sm"} color={"gray.300"}>{user.email}</Text>
                                                            </Box>
                                                        </Td>
                                                        {isWideVersion && <Td>{user.createdAt}</Td>}
                                                        <Td>
                                                            {isWideVersion && <EditButton title="Editar" icon={RiPencilLine}/>}
                                                        </Td>
                                                    </Tr>        
                                                )
                                            })
                                        }            
                                    </Tbody>
        
                                </Table>
        
                                <Pagination
                                    totalCountOfRegisters={data.totalCount}
                                    currentPage={page}
                                    onPageChange={setPage}
                                />
                            </>
    
                        )
                    }

                </Box>

            </Flex>
        </Box>
    )
}