import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"


interface SubmitButtonProps {
    children?: React.ReactNode;
    className?: string;
}

export default function SubmitButton({ children, className }: SubmitButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button className={className} type="submit" aria-disabled={pending}>
            {children}
        </Button>
    )
}