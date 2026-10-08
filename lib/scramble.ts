import { gsap } from "gsap";

export interface ScrambleOptions {
  text?: string;
  chars?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  onUpdate?: (text: string) => void;
}

/**
 * Creates a GSAP tween that animates a text scramble effect.
 * It resolves the text from left to right based on the tween's progress.
 */
export function createScrambleTween(element: HTMLElement | null, options: ScrambleOptions = {}) {
  const chars = options.chars || "!<>-_\\\\/[]{}—=+*^?#01";
  // If no text is provided, use the element's current text content
  const targetText = options.text || (element ? element.innerText : "");
  const length = targetText.length;
  
  const proxy = { progress: 0 };
  
  return gsap.to(proxy, {
    progress: 1,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || "none",
    onUpdate: () => {
      const progress = proxy.progress;
      const resolvedCount = Math.floor(progress * length);
      
      let output = "";
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount || targetText[i] === " ") {
          output += targetText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      if (options.onUpdate) {
        options.onUpdate(output);
      } else if (element) {
        element.innerText = output;
      }
    }
  });
}
