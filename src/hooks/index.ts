import { useEffect, useState } from "react";

export function useCountdown(
    initialValue: number,
    { onFinish }: { onFinish: () => void }
) {
    const [countdown, setCountdown] = useState(initialValue);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 0) {
                    clearInterval(interval);
                    onFinish();
                    return 0;
                } else {
                    return prev - 1;
                }
            });
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return {
        countdown: countdown,
        completed: countdown === 0,
        endCountdown: () => setCountdown(0),
    };
}
