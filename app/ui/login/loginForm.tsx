'use client'
import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/lib/authProvider";
export default function LoginForm() {
    const { login } = useAuth()

    return (
        <form action={login}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" />
            <Button type="submit">Connexion</Button>
        </form>
    )
}