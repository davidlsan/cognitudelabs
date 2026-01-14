'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Keywords from "./components/keywords";
import BodyContent from "./components/body-content";
import CTAButton from "./components/cta-button";
import Footer from "./components/footer";
import CloudSceneWrapper from "./components/cloud-scene-wrapper";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0, 0, 0.2, 1] },
  },
};

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  const handleCloudsReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const cloudAnimation = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8, filter: 'blur(4px)' },
        animate: isReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
        transition: { duration: 0.75, ease: [0, 0, 0.2, 1] }
      };

  return (
    <main className="h-dvh flex flex-col w-full overflow-hidden relative">
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#151515]"
          >
            <Image
              src="CognitudeLabs.svg"
              alt="Cognitude Labs Logo"
              width={200}
              height={200}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        className="max-w-135 w-full flex items-center mx-auto flex-col mt-32 relative z-10"
      >
        <motion.header
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="flex w-full justify-between items-center pb-4 border-b"
        >
          <Image
            src={"CognitudeLabs.svg"}
            alt="Cognitude Labs Logo"
            width={175}
            height={175}
          />
          <div className="text-sm font-mono font-medium text-white/50 text-end">
            STATES. AGENTS. MEMORY. <br /> ARTIFICIAL INTELLIGENCE.
          </div>
        </motion.header>
        <div className="flex flex-col gap-4 mt-4">
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-white/50 text-base"
          >
            <span className="text-white">Cognitude Labs</span> is an applied AI
            company focused on education—a massive market where millions of
            people face daily uncertainty and existing tools are primitive. We
            develop autonomous agents that integrate across systems, maintain
            context, and adapt to individual learners to solve the fundamental
            problem of not knowing.
          </motion.p>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-white/50 text-base"
          >
            Most AI tools are stateless assistants—they forget context, can't
            integrate across systems, and provide generic responses. We build
            agents that maintain persistent understanding, connect to the tools
            learners actually use, and adapt their guidance based on outcomes.
            This is the difference between a chatbot and an autonomous agent.
          </motion.p>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-white/50 text-base"
          >
            Cognitude Labs was founded by a team of engineers and researchers
            from Western Norway University of Applied Sciences.
          </motion.p>
          <motion.a
            variants={prefersReducedMotion ? undefined : itemVariants}
            href="https://www.alva.so"
            className="w-full h-8 bg-white text-base font-medium uppercase font-mono rounded-sm items-center flex justify-center mt-4 text-black hover:bg-white/80 transition-colors duration-300"
          >
            Go to Alva
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        {...cloudAnimation}
        className="absolute -bottom-[20vh] left-0 right-0 h-[80vh] z-0"
      >
        <CloudSceneWrapper onReady={handleCloudsReady} />
      </motion.div>
      <footer className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-135 mx-auto">
          <Footer />
        </div>
      </footer>
    </main>
  );
}
