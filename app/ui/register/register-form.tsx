'use client'
import { handleRegister } from "@/app/lib/actions"
import { useFormState } from "react-dom"
import SubmitButton from "@/app/ui/submit-button"
import { Input } from "@/components/ui/input"
import { CgProfile } from "react-icons/cg"
import { FaUser } from "react-icons/fa";

export default function RegisterForm() {

    // TO DO: REFAIRE LE FORMULAIRE COMME CELUI DE TRIP-FORM

    const initialState: any = {
        errors: {},
        message: '',
    }
    const [state, formAction] = useFormState(handleRegister, initialState)

    return (
        <>
            <form action={formAction} className="my-10 rounded-2xl w-6/12 bg-white/50 flex flex-col items-center">
                <div className="w-10/12">

                    <div className="py-3">
                        <Input type="file" id="avatar" name="avatar" className="hidden" />
                        <label htmlFor="avatar" className="cursor-pointer w-fit m-auto block">
                            <FaUser className="bg-white rounded-full m-auto text-marron pt-7 pb-7" size={100} />
                        </label>
                    </div>

                    <Input className="rounded-full" type="text" id="username" name="username" placeholder="Pseudo" />
                    <div className="pb-3" id="username-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.username &&
                            <p className="mt-2 text-sm text-red-500">
                                {state.errors.username}
                            </p>
                        }
                    </div>

                    <Input className="rounded-full" type="email" id="email" name="email" placeholder="Email" />
                    <div className="pb-3" id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email &&
                            <p className="mt-2 text-sm text-red-500">
                                {state.errors.email}
                            </p>
                        }
                    </div>

                    <Input className="rounded-full" type="password" id="password" name="password" placeholder="Mot de passe" />
                    <div className="pb-3" id="password-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.password &&
                            <p className="mt-2 text-sm text-red-500">
                                {state.errors.password}
                            </p>
                        }
                    </div>

                    <Input className="rounded-full" type="password" id="passwordConfirmation" name="passwordConfirmation" placeholder="Confirmer le mot de passe" />
                    <div className="pb-3" id="passwordConfirmation-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.passwordConfirmation &&
                            <p className="mt-2 text-sm text-red-500">
                                {state.errors.passwordConfirmation}
                            </p>
                        }
                    </div>

                    {
                        state.message &&
                        <p aria-live="polite" role="status" >{state.message}</p>
                    }
                </div>
                <SubmitButton className="mt-10 rounded-b-2xl rounded-t-none w-full bg-jaune text-marron font-bold h-16">
                    Créer un compte
                </SubmitButton>
            </form>
        </>
    )
}
