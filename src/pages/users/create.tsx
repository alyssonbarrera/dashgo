import { Box, Button, Divider, Flex, FormControl, FormHelperText, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { useMutation } from 'react-query';
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

interface CreateUserFormData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const createUserFormSchema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'As senhas precisam ser iguais')
})

export default function CreateUser() {

    const router = useRouter()

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        })

        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    })

    const { register, handleSubmit, formState } = useForm({resolver: yupResolver(createUserFormSchema)});

    const { errors } = formState;
    console.log(errors)

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await createUser.mutateAsync(values);

        router.push('/users');
    }

    return (
        <Box>
            <Header />
            <Flex w={"100%"} my={6} maxW={1480} mx={"auto"} px={6}>
                <Sidebar />

                <FormControl as="form" flex={1} borderRadius={8} p={["6", "8"]} bg={"gray.800"} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size={"lg"} fontWeight={"normal"}>Criar usuário</Heading>
                    <Divider my={6} borderColor={"gray.700"} />

                    <VStack spacing={8}>
                        <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
                            <Box>
                                <Input
                                    type="text"
                                    label="Nome completo"
                                    {...register("name")}
                                />
                                {
                                    errors.name &&
                                    <FormHelperText
                                        color="red.500"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textAlign="left"
                                        mb={2}
                                    >
                                        {`${errors.name.message}`}
                                    </FormHelperText>
                                }
                            </Box>
                            <Box>                            
                                <Input
                                    type="email"
                                    label="E-mail"
                                    {...register("email")}
                                />
                                {
                                    errors.email &&
                                    <FormHelperText
                                        color="red.500"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textAlign="left"
                                        mb={2}
                                    >
                                        {`${errors.email.message}`}
                                    </FormHelperText>
                                }

                            </Box>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth={"240px"} spacing={["6", "8"]} w="100%">
                            <Box>
                                <Input
                                    type="password"
                                    label="Senha"
                                    {...register("password")}
                                />
                                {
                                    errors.password &&
                                    <FormHelperText
                                        color="red.500"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textAlign="left"
                                        mb={2}
                                    >
                                        {`${errors.password.message}`}
                                    </FormHelperText>
                                }

                            </Box>
                            <Box>
                                <Input
                                    type="password"
                                    label="Confirmação da senha"
                                    {...register("password_confirmation")}
                                />
                               {
                                    errors.password_confirmation &&
                                    <FormHelperText
                                        color="red.500"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        textAlign="left"
                                        mb={2}
                                    >
                                        {`${errors.password_confirmation.message}`}
                                    </FormHelperText>
                                }

                            </Box>
                        </SimpleGrid>
                    </VStack>

                    <Flex mt={8} justifyContent={"flex-end"}>
                        <HStack spacing={4}>
                            <Link href="/users">
                                <Button as="a" cursor="pointer" colorScheme={"whiteAlpha"}>Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme={"pink"} isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>

                </FormControl>

            </Flex>
        </Box>
    )
}