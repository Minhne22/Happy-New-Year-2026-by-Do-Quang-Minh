import React, { useEffect, useState } from "react";

export default function Countdown({ targetDate, onComplete }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = targetDate - now;

            if (diff <= 0) {
                setTimeLeft("🎉 Happy New Year 2026! 🎉");
                onComplete();
                clearInterval(interval);
                return;
            }

            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const mins = Math.floor((diff / (1000 * 60)) % 60);
            const secs = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${hours}h ${mins}m ${secs}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, onComplete]);

    return (
        <div
            style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "20px",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "clamp(2rem, 6vw, 4rem)",
                    fontWeight: "bold",
                    textShadow: "0 0 20px rgba(255,255,255,0.8)",
                }}
            >
                {timeLeft}
            </h1>
        </div>
    );
}
