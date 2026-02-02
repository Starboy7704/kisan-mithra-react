import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const AnimateNumber = ({ value, duration = 0.8 }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest)
  );

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimateNumber;
