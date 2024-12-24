"use client"
import styles from "./signUp.module.css";

import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgProfile } from 'react-icons/cg';
import { toast } from 'sonner';
import * as zod from 'zod';

const signUpSchema = zod.object({
    name: zod.string(),
    email: zod.string(),
    phone: zod.string(),
    password: zod.string(),
    confirmPassword: zod.string(),
    image: zod.any(),
})

export type typeSignUpSchema = zod.infer<typeof signUpSchema>

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [phoneNumber, setPhoneNumber] = useState('')

    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<typeSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    const watchImage = watch('image')

    useEffect(() => {
        if (watchImage && watchImage[0]) {
            const objectUrl = URL.createObjectURL(watchImage[0])
            setPreview(objectUrl)

            // Limpa a URL criada para evitar vazamento de memória
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreview(null)
        }
    }, [watchImage])

    function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
        const input = event.target.value.replace(/\D/g, '')
        if (input.length <= 12) {
            setPhoneNumber(input)
        }
    }

    async function handleCreateNewUser({
        name,
        email,
        phone,
        image,
        password,
        confirmPassword,
    }: typeSignUpSchema) {
        if (password === confirmPassword) {
            const formData = new FormData()

            const photo = image[0]
            const phone_number = phone

            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('confirmPassword', confirmPassword)
            formData.append('phone_number', phone_number)
            formData.append('photo', photo)

            try {
                const response = await axios.post(
                    'https://techsoluctionscold.com.br/api-boats/tests/register_account.php',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                )
                console.log('Response:', response.data)
                if (response) {
                    toast.success('Login realizado com sucesso')
                    router.push('/dashboard')
                }
            } catch (error) {
                console.log(error)
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        if (error.response.status === 400) {
                            toast.error('Usuário já cadastrado no sistema');
                        } else {
                            toast.error('Erro ao tentar enviar formulário');
                        }
                    } else {
                        toast.error('Erro desconhecido');
                    }

                }
            }
        } else {
            toast.error('Digite senhas iguais')
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(handleCreateNewUser)}>
            <Stack gap="4" align="center" maxW="sm">
                <div className={styles.areaImageBtn}>
                    <div className={styles.areaImage}>
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Pré-visualização"
                                className={styles.image}
                                width={70}
                                height={70}
                            />
                        ) : (
                            <CgProfile className={styles.icon} />
                        )}
                    </div>
                    <input
                        type="file"
                        id="files"
                        accept="image/*"
                        className={styles.inputImage}
                        {...register('image')}
                    />
                    <Button type="button" className={styles.btn}>
                        <label htmlFor="files">Select file</label>
                    </Button>
                </div>
                <Field
                    label="Nome completo"
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                >
                    <Input
                        {...register("name", { required: "Nome completo é obrigatório" })} required minLength={3}
                    />
                </Field>
                <Field
                    label="E-mail"
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                >
                    <Input
                        {...register("email", { required: "E-mail é obrigatório" })} type="email" required minLength={3}
                    />
                </Field>
                <Field
                    label="Celular"
                    invalid={!!errors.phone}
                    errorText={errors.phone?.message}
                >
                    <Input
                        {...register("phone", { required: "Celular é obrigatório" })} id="phone" minLength={12} maxLength={12} value={phoneNumber} onChange={handlePhoneChange}
                    />
                </Field>
                <Field
                    label="Senha"
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                >
                    <PasswordInput
                        {...register("password", { required: "Senha é obrigatória" })} required minLength={5} maxLength={15} visible={showPassword}
                        onVisibleChange={setShowPassword}
                    />
                </Field>

                <Field
                    label="Confirmar Senha"
                    invalid={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                >
                    <PasswordInput
                        {...register("confirmPassword", { required: "Confirmar senha é obrigatório" })} required minLength={5} maxLength={15} visible={showConfirmPassword}
                        onVisibleChange={setShowConfirmPassword}
                    />
                </Field>
                <Button type="submit" className={styles.btn} disabled={isSubmitting}>Cadastrar</Button>
            </Stack>
        </form>
    )
}