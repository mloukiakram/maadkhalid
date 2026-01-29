import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.5 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;

        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            setCount(value);
            return;
        }

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentValue = numericValue * easeOut;

            // Handle decimals
            if (numericValue % 1 !== 0) {
                setCount(currentValue.toFixed(1));
            } else {
                setCount(Math.floor(currentValue));
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(numericValue % 1 !== 0 ? numericValue.toFixed(1) : numericValue);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    );
}
