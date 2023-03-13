import axios, { AxiosError } from "axios"
import ApiErrorResponseDTO from "../ts/interfaces/ApiErrorResponseDTO"
import GeneralApiResponseDTO from "../ts/interfaces/GeneralApiResponseDTO"

export const registerUser = async (accountCreationToken: string, password: string): Promise<GeneralApiResponseDTO<null>> => {
    try {
        await axios.post("http://localhost:8080/register", {
            accountCreationToken,
            password,
        })

        return {}
    } catch (err) {
        const error = err as AxiosError

        const data = error.response?.data as ApiErrorResponseDTO

        return { error: data.status }
    }
}
