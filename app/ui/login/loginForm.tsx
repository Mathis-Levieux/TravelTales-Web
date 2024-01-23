'use client'
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/lib/authProvider";
import { useFormState, useFormStatus } from "react-dom";
import { handleLogIn } from "@/app/lib/actions";
const initialState = {
    message: "",
}
function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" aria-disabled={pending}>
            Connexion
        </Button>
    )
}
export default function LoginForm() {
    const [state, formAction] = useFormState(handleLogIn, initialState)

    return (
        <form action={formAction}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" />
            <SubmitButton />
            <p aria-live="polite" role="status" >{state.message}</p>
        </form>
    )
}