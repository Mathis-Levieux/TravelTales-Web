'use client'
import { useFormState, useFormStatus } from "react-dom";
import { handleLogIn } from "@/app/lib/actions";
import SubmitButton from "@/app/ui/submit-button"
import { useState } from "react";


const initialState = {
    message: "",
}

export default function LoginForm() {
    const [state, formAction] = useFormState(handleLogIn, initialState)
    // const [isLoading, setLoading] = useState(true)
    // if (isLoading) {
    //     return (
    //         <div>
    //             <p>Chargement...</p>
    //         </div>
    //     )
    // }

    return (
        <form action={formAction}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" />
            <SubmitButton>
                Se connecter
            </SubmitButton>
            {
                state?.message &&
                <p aria-live="polite" role="status" >{state.message}</p>
            }
        </form>
    )
}