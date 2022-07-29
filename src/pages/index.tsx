import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Button, Stack, FormControl, FormHelperText} from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input'
import { useRouter } from 'next/router'

const signInFormSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
    password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({resolver: yupResolver(signInFormSchema)})

  const router = useRouter()
  const { errors } = formState
  console.log(errors)

  const handleSignIn: SubmitHandler<FieldValues> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
    router.push('/dashboard')
    
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      
      <FormControl
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p={8} //2rem 32px
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input
            type="email"
            label="E-mail"
            isInvalid={errors.email !== undefined}
            {...register('email')}
          />
          {
            errors.email &&
            <FormHelperText
              color="red.500"
              fontSize="sm"
              fontWeight="bold"
              textAlign="left"
              mb={2}>
              {`${errors.email.message}`}
            </FormHelperText>
          }
          <Input
            type="password"
            label="Senha"
            isInvalid={errors.password !== undefined}
            {...register('password')}
          />
          {
            errors.password &&
            <FormHelperText
              color="red.500"
              fontSize="sm"
              fontWeight="bold"
              textAlign="left"
              mb={2}>
              {`${errors.password.message}`}
          </FormHelperText>

          }
        </Stack>

        <Button type="submit" w={'full'} mt={6} colorScheme="pink" size="lg" isLoading={formState.isSubmitting}>Entrar</Button>

      </FormControl>
    </Flex>
  )
}