"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LandingHeader = () => {
  const [wordIndex, setWordIndex] = useState<number>(0);

  const keywords = ["Plan", "Track", "Conquer"];

  useEffect(() => {
    const changeWord = () => {
      setWordIndex((prev) => (prev === keywords.length - 1 ? 0 : prev + 1));
    };

    const interval = setInterval(changeWord, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="font-extrabold text-5xl text-shadow-lg z-10">
      <span className="text-mcgill-red">{keywords[wordIndex]}</span> Your Degree
    </h1>
  );
};

export default LandingHeader;
