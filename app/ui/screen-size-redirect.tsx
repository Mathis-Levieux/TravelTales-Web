"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useWindowSize from './useWindowSize';

export default function ScreenSizeRedirect() {
    const router = useRouter();
    const size = useWindowSize();

    useEffect(() => {
        if (size.width && size.width < 768) {
            router.push('/download');
        }
    }, [size.width, router]);

    return null;
}
