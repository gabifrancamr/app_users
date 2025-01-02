"use client"
import { registerAccount } from "@/api/registerAccount";
import styles from "./signUp.module.css";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import imagePreview from "@/hooks/imagePreview";
import { Flex, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CgProfile } from 'react-icons/cg';
import { toast } from 'sonner';
import { useHookFormMask } from "use-mask-input";
import * as zod from 'zod';

const signUpSchema = zod.object({
    name: zod
        .string()
        .nonempty("Nome completo é obrigatório")
        .min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: zod
        .string()
        .nonempty("E-mail é obrigatório")
        .email("Digite um e-mail válido"),
    phone: zod
        .string()
        .optional()
        .refine(
            (val) => val === "" || (val && val.replace(/\D/g, "").length === 11),
            {
                message: "Número de celular inválido",
            }
        ),
    image: zod.any().optional(),
    password: zod
        .string()
        .nonempty("Senha é obrigatória")
        .min(5, "A senha deve ter no mínimo 5 caracteres")
        .max(15, "A senha deve ter no máximo 15 caracteres"),
    confirmPassword: zod.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            path: ["confirmPassword"],
            code: zod.ZodIssueCode.custom,
            message: "As senhas não coincidem",
        });
    }
});

export type typeSignUpSchema = zod.infer<typeof signUpSchema>

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<typeSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    const registerWithMask = useHookFormMask(register);

    const watchImage = watch('image')
    const preview = imagePreview(watchImage)

    const { mutateAsync: registerAccountFn } = useMutation({
        mutationFn: registerAccount,
      })

    async function handleCreateNewUser(data: typeSignUpSchema) {
        if (data.password === data.confirmPassword) {
            try {
                const response = await registerAccountFn(data)
                console.log('Response:', response)
                if (response) {
                    toast.success('Conta criada com sucesso. Redirecionando...')
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
                        toast.error('Erro ao criar conta. Por favor, tente novamente.');
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
                <Flex flexDirection={"column"} alignItems={"center"} gap={"0.75rem"}>
                    <Flex justifyContent={"center"}>
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Pré-visualização"
                                className={styles.image}
                                width={70}
                                height={70}
                            />
                        ) : (
                            <CgProfile size={70} />
                        )}
                    </Flex>
                    <Input
                        type="file"
                        id="files"
                        accept="image/*"
                        display={"none"}
                        {...register('image')}
                    />
                    <Button type="button" asChild>
                        <label className={styles.labelButton} htmlFor="files">Selecionar Imagem</label>
                    </Button>
                </Flex>
                <Field
                    label="Nome completo"
                    required
                    invalid={!!errors.name}
                    errorText={errors.name?.message}
                >
                    <Input
                        {...register("name")}
                        maxLength={70}
                    />
                </Field>
                <Field
                    label="E-mail"
                    required
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                >
                    <Input
                        {...register("email")}
                        type="email"
                        maxLength={254}
                        autoComplete="email"
                    />
                </Field>
                <Field
                    label="Celular"
                    invalid={!!errors.phone}
                    errorText={errors.phone?.message}
                >
                    <Input
                        placeholder="(99) 99999-9999"
                        {...registerWithMask("phone", "(99) 99999-9999")}
                    />
                </Field>
                <Field
                    label="Senha"
                    required
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                >
                    <PasswordInput
                        {...register("password")}
                        visible={showPassword}
                        onVisibleChange={setShowPassword}
                        maxLength={15}
                        autoComplete="new-password"
                    />
                </Field>

                <Field
                    label="Confirmar Senha"
                    required
                    invalid={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                >
                    <PasswordInput
                        {...register("confirmPassword")}
                        visible={showConfirmPassword}
                        onVisibleChange={setShowConfirmPassword}
                        maxLength={15}
                        autoComplete="new-password"
                    />
                </Field>
                <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    Cadastrar
                </Button>
            </Stack>
        </form>
    )
}