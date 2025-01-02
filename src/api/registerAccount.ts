import { typeSignUpSchema } from "@/components/SignUpForm/signUpForm"
import { api } from "@/lib/axios"

export async function registerAccount(data: typeSignUpSchema) {
    const formData = new FormData()

    const photo = data.image[0]
    const phone_number = data.phone || ""

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('confirmPassword', data.confirmPassword)
    formData.append('phone_number', phone_number)
    formData.append('photo', photo)


    const response = await api.post(
        'https://techsoluctionscold.com.br/api-boats/tests/register_account.php',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    )
    return response.data

}