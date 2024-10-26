import { useState, useEffect } from 'react';

export default function useWindowSize() {

    const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Fonction pour obtenir la taille initiale
            const initialSize = {
                width: window.innerWidth,
                height: window.innerHeight,
            };
            setWindowSize(initialSize);
        }
    }, []);

    return windowSize;
}
