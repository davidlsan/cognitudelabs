"use client";

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
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0, 0, 0.2, 1] as const },
  },
};

const founders = [
  { name: "David Lunde Sandvik, ", url: "https://www.linkedin.com/in/david-lunde-sandvik-3b4473363/" },
  { name: "Andreas Tunes Huse, ", url: "https://www.linkedin.com/in/andreas-huse-9ab151233/" },
  { name: "Jarle Aragon Halden, ", url: "https://www.linkedin.com/in/jarle-aragon-halden-4a9599291/" },
  { name: "Andreas Lind Benestad, ", url: "https://www.linkedin.com/in/andreas-lind-benestad-0059ab359/" },
  /* { name: "Thomas Otterå Årland", url: "https://www.linkedin.com/in/thomas-%C3%A5rland-71a206334/" }, */
];

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [hoveredName, setHoveredName] = useState<string | null>(null);

  const handleCloudsReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const cloudAnimation = prefersReducedMotion
    ? {}
    : {
      initial: { opacity: 0, y: 8, filter: "blur(4px)" },
      animate: isReady
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : undefined,
      transition: { duration: 0.75, ease: [0, 0, 0.2, 1] as const },
    };

  return (
    <main className="min-h-dvh sm:h-dvh flex flex-col w-full overflow-y-auto sm:overflow-hidden relative pb-20 sm:pb-0">
      <AnimatePresence>
        {!isReady && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] as const }}
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
        className="max-w-135 w-full flex items-center mx-auto flex-col mt-16 sm:mt-24 md:mt-32 px-4 sm:px-6 relative z-10"
      >
        <motion.header
          variants={prefersReducedMotion ? undefined : itemVariants}
          className="flex w-full flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pb-4 border-b"
        >
          <div className="w-32 sm:w-44">
            <Image
              src={"CognitudeLabs.svg"}
              alt="Cognitude Labs Logo"
              width={175}
              height={175}
              className="w-full h-auto"
            />
          </div>
          <div className="text-xs sm:text-sm font-mono font-medium text-white/50 text-center sm:text-end">
            STATES. AGENTS. MEMORY. <br /> ARTIFICIAL INTELLIGENCE.
          </div>
        </motion.header>
        <div className="flex flex-col gap-4 mt-4">
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-white/50 text-lg leading-[120%]"
          >
            <span className="text-white">Cognitude Labs</span> is an applied AI research company focused on enhancing information management for knowledge-intensive professionals. We believe in building technology that truly addresses real-world challenges.
          </motion.p>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-white/50 text-lg leading-[120%]"
          >
            Our first prototype explored learning environments. Now, rather than rushing to build new solutions, we're taking time to deeply understand the challenges knowledge workers face daily. Through interviews and workflow analysis, we're identifying genuine pain points before developing tools to address them.
          </motion.p>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-white/50 text-lg leading-[120%]"
          >
            Cognitude Labs was founded by a team of engineers and enthusiasts
            from Western Norway University of Applied Sciences.
          </motion.p>
          <motion.p
            variants={prefersReducedMotion ? undefined : itemVariants}
            className="text-xl text-white leading-[120%]"
          >
            {founders.map((founder, index) => (
              <span key={founder.name}>
                <a
                  href={founder.url}
                  onMouseEnter={() => setHoveredName(founder.name)}
                  onMouseLeave={() => setHoveredName(null)}
                  className={`transition-colors duration-100 ${hoveredName && hoveredName !== founder.name
                      ? "text-white/50"
                      : "text-white"
                    }`}
                >
                  {founder.name}
                </a>
              </span>
            ))}
          </motion.p>
          {/*           <motion.a
            variants={prefersReducedMotion ? undefined : itemVariants}
            href="https://www.alva.so"
            className="w-full h-8 bg-white text-base font-medium uppercase font-mono rounded-sm items-center flex justify-center mt-4 text-black hover:bg-white/80 transition-colors duration-300"
          >
            Go to Alva
          </motion.a> */}
        </div>
      </motion.div>
      <motion.div
        {...cloudAnimation}
        className="absolute -bottom-[15vh] sm:-bottom-[20vh] left-0 right-0 h-[80vh] z-0"
      >
        <CloudSceneWrapper onReady={handleCloudsReady} />
      </motion.div>
      <footer className="absolute bottom-0 left-0 right-0 z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-135 mx-auto px-4 sm:px-6">
          <Footer />
        </div>
      </footer>
    </main>
  );
}
