import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"

export default function SubmitButton({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" aria-disabled={pending}>
            {children}
        </Button>
    )
}