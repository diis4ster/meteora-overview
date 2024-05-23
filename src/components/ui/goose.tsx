"use client"

import React, { useState, useEffect } from 'react';
import styles from "./goose.module.css";

const Goose = () => {
    const [clickCount, setClickCount] = useState(0);
    const [geese, setGeese] = useState(1); // Start with one goose
    const [isJumping, setIsJumping] = useState(false);

    const handleJump = () => {
        setClickCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount % 10 === 0) {
                setGeese(prevGeese => prevGeese + 3);
            }
            return newCount;
        });

        setIsJumping(true);
        setTimeout(() => {
            setIsJumping(false);
        }, 500);
    };

    useEffect(() => {
        if (isJumping) {
            const jumpTimeout = setTimeout(() => {
                setIsJumping(false);
            }, 500);
            return () => clearTimeout(jumpTimeout);
        }
    }, [isJumping]);

    return (
        <div className='flex flex-wrap'>
            {/* Render the geese with wave effect */}
            {[...Array(geese)].map((_, index) => (
                <img
                    key={index}
                    className={`ml-1 ${isJumping ? styles.jump : ''} select-none cursor-pointer`}
                    width="20"
                    src="goose.svg"
                    alt="Happy goose"
                    onClick={handleJump}
                    style={{ animationDelay: isJumping ? `${index % 3 * 0.1}s` : '0s' }} // Incremental delay
                />
            ))}
        </div>
    );
};

export default Goose;