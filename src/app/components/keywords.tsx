"use client";

import { useState, useRef, useEffect } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

const keywords = [
  {
    term: "STATES.",
    title: "States",
    phonetic: "/ steɪts/",
    definition:
      "The internal memory and context that an agent maintains across interactions, enabling continuity and informed decision-making.",
  },
  {
    term: "AGENTS.",
    title: "Agents",
    phonetic: "/ eɪdʒənt/",
    definition:
      "A software entity built around an LLM that can plan, decide, and act using tools or APIs. It maintains state across steps and executes tasks beyond a single prompt-response cycle.",
  },
  {
    term: "MEMORY.",
    title: "Memory",
    phonetic: "/ ˈmeməri/",
    definition:
      "Persistent storage of information, context, and learned patterns that allows agents to recall and build upon previous interactions.",
  },
  {
    term: "ARTIFICIAL INTELLIGENCE.",
    title: "Artificial Intelligence",
    phonetic: "/ ˌɑːtɪˈfɪʃəl ɪnˈtelɪdʒəns/",
    definition:
      "The simulation of human intelligence in machines, enabling them to learn, reason, and make decisions autonomously.",
  },
];

export default function Keywords() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contentWidth, setContentWidth] = useState<number>(288);
  const [position, setPosition] = useState<{
    top: number;
    right: number;
  } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (hoveredIndex !== null && triggerRefs.current[hoveredIndex]) {
      const timeoutId = setTimeout(() => {
        const trigger = triggerRefs.current[hoveredIndex];
        if (!trigger) return;
        const triggerRect = trigger.getBoundingClientRect();

        const right = window.innerWidth - triggerRect.right;
        const top = triggerRect.top - 4;
        setPosition({ top, right });
        if (measureRef.current) {
          const clone = measureRef.current.cloneNode(true) as HTMLElement;
          clone.style.position = "absolute";
          clone.style.visibility = "hidden";
          clone.style.width = "auto";
          clone.style.maxWidth = "none";
          document.body.appendChild(clone);

          const measuredWidth = clone.offsetWidth;
          document.body.removeChild(clone);

          const minWidth = 240;
          const maxWidth = 400;
          const clampedWidth = Math.max(
            minWidth,
            Math.min(maxWidth, measuredWidth)
          );

          setContentWidth(clampedWidth);
        }
      }, 10);

      return () => clearTimeout(timeoutId);
    } else if (hoveredIndex === null) {
      setPosition(null);
    }
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Set a default position immediately so card can render
    const trigger = triggerRefs.current[index];
    if (trigger) {
      const triggerRect = trigger.getBoundingClientRect();
      const right = window.innerWidth - triggerRect.right;
      const top = triggerRect.top - 4;
      setPosition({ top, right });
    }
    setHoveredIndex(index);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setHoveredIndex(null);
      }, 300);
    }, 100);
  };

  const currentKeyword = hoveredIndex !== null ? keywords[hoveredIndex] : null;

  return (
    <div className="relative" ref={containerRef}>
      <HoverCardPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        openDelay={100}
        closeDelay={100}
      >
        <div 
          className="uppercase tracking-widest text-sm text-right flex flex-wrap justify-end gap-x-2"
          style={{ fontFamily: 'var(--font-geist-mono), ui-monospace, monospace' }}
        >
          {keywords.map((keyword, index) => (
            <span 
              key={keyword.term} 
              className={cn(
                "whitespace-nowrap",
                index === keywords.length - 1 && "flex-basis-full"
              )}
            >
              <HoverCardPrimitive.Trigger asChild>
                <span
                  ref={(el) => {
                    triggerRefs.current[index] = el;
                  }}
                  className="cursor-pointer text-muted-foreground hover:text-white transition-colors"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {keyword.term}
                </span>
              </HoverCardPrimitive.Trigger>
            </span>
          ))}
        </div>
        {currentKeyword && position && (
          <HoverCardPrimitive.Portal>
            <div
              className="fixed z-50 pointer-events-auto"
              style={{
                top: `${position.top}px`,
                right: `${position.right}px`,
                transform: "translateY(-100%)",
                transition:
                  "top 300ms ease-in-out, right 300ms ease-in-out, transform 300ms ease-in-out",
              }}
            >
              <div
                className={cn(
                  "border border-border bg-popover p-6 rounded-md shadow-md outline-hidden",
                  "transition-all duration-300 ease-in-out overflow-hidden"
                )}
                style={{
                  width: `${contentWidth}px`,
                  minWidth: "240px",
                  maxWidth: "400px",
                  transition: "width 300ms ease-in-out",
                }}
                onMouseEnter={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                }}
                onMouseLeave={handleMouseLeave}
                ref={contentRef}
              >
                <div ref={measureRef} className="relative w-full">
                  <div
                    key={hoveredIndex}
                    className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                  >
                    <h3 className="text-xl text-white normal-case tracking-normal text-balance">
                      {currentKeyword.title}
                    </h3>
                    <p className="text-muted-foreground italic text-sm mt-1 normal-case tracking-normal font-mono">
                      {currentKeyword.phonetic}
                    </p>
                    <p className="text-muted-foreground text-base leading-relaxed mt-4 normal-case tracking-normal text-pretty">
                      {currentKeyword.definition}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </HoverCardPrimitive.Portal>
        )}
      </HoverCardPrimitive.Root>
    </div>
  );
}
