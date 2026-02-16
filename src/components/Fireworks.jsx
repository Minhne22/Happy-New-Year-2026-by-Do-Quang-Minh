import React, { useEffect, useRef } from "react";
import beforeSound from "../assets/before.mp3";
import afterSound from "../assets/after.mp3";

export default function Fireworks({ active }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationId;
        let rockets = [];
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        // ===== ROCKET =====
        class Rocket {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height;
                this.targetY = Math.random() * (canvas.height / 2);
                this.speed = 6 + Math.random() * 2;
                this.color = `hsl(${Math.random() * 360},100%,60%)`;
            }

            update() {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    explode(this.x, this.y, this.color);
                    return true;
                }
                return false;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ===== PARTICLE =====
        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.angle = Math.random() * Math.PI * 2;
                this.speed = Math.random() * 5;
                this.alpha = 1;
                this.gravity = 0.05;
                this.velY = Math.sin(this.angle) * this.speed;
                this.velX = Math.cos(this.angle) * this.speed;
            }

            update() {
                this.velY += this.gravity;
                this.x += this.velX;
                this.y += this.velY;
                this.alpha -= 0.015;
            }

            draw() {
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function explode(x, y, color) {
            // Play explosion sound
            const audio = new Audio(afterSound);
            audio.volume = 0.6;
            audio.play().catch(() => { });

            for (let i = 0; i < 80; i++) {
                particles.push(new Particle(x, y, color));
            }
        }

        function animate() {
            ctx.fillStyle = "rgba(0,0,0,0.25)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (active && Math.random() < 0.04) {
                rockets.push(new Rocket());
                // Play launch sound
                const audio = new Audio(beforeSound);
                audio.volume = 0.4;
                audio.play().catch(() => { });
            }

            // update rockets
            rockets = rockets.filter((rocket) => {
                const done = rocket.update();
                if (!done) rocket.draw();
                return !done;
            });

            // update particles
            particles = particles.filter((p) => {
                p.update();
                p.draw();
                return p.alpha > 0;
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        />
    );
}
