'use client'
import { handleRegister } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import SubmitButton from "@/app/ui/submit-button"

export default function RegisterForm() {

    const initialState: any = {
        errors: {},
        message: '',
    }
    const [state, formAction] = useFormState(handleRegister, initialState)

    return (
        <>
            <form action={formAction} >
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <div id="email-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.email &&
                        <p className="mt-2 text-sm text-red-500">
                            {state.errors.email}
                        </p>
                    }
                </div>
                <br />
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" id="username" name="username" />
                <div id="username-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.username &&
                        <p className="mt-2 text-sm text-red-500">
                            {state.errors.username}
                        </p>
                    }
                </div>
                <br />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" />
                <div id="password-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.password &&
                        <p className="mt-2 text-sm text-red-500">
                            {state.errors.password}
                        </p>
                    }
                </div>
                <br />
                <SubmitButton>
                    S'inscrire
                </SubmitButton>
                {
                    state.message &&
                    <p aria-live="polite" role="status" >{state.message}</p>
                }

            </form>
        </>
    )
}
