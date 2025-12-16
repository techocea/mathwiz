// components/ScrollTriggered.tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ScrollTriggered({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
      w-full"
    >
      {children}
    </motion.div>
  );
}
