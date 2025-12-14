import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GSAP timelines live here
// One scene = one timeline function

/**
 * Scene 1 - Intro / Preload
 * Blank screen → Logo reveal → Snap to hero
 */
export function createIntroTimeline(element: HTMLElement, onComplete?: () => void) {
  const tl = gsap.timeline({
    onComplete,
  });

  // Add your intro animations here
  // Example:
  // tl.from(element, { opacity: 0, duration: 1 })
  //   .to(element, { scale: 1.2, duration: 0.8 }, "+=0.5");

  return tl;
}

/**
 * Scene 2 - Hero Reveal
 * Navbar fades in → Headline animates → CTA appears
 */
export function createHeroTimeline(container: HTMLElement) {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Example structure:
  // const navbar = container.querySelector(".navbar");
  // const headline = container.querySelector(".headline");
  // const cta = container.querySelector(".cta");

  // tl.from(navbar, { y: -100, opacity: 0, duration: 1 })
  //   .from(headline, { y: 100, opacity: 0, duration: 1.2 }, "-=0.5")
  //   .from(cta, { opacity: 0, duration: 0.8 }, "-=0.3");

  return tl;
}

/**
 * Scene 3 - Map Takeover (pinned scroll section)
 * Camera zoom → Map scale/translate → Pins appear
 */
export function createMapScrollTrigger(
  triggerElement: HTMLElement,
  pinElement: HTMLElement,
  mapElement: HTMLElement
) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      pin: pinElement,
      start: "top top",
      end: "+=2000", // Adjust based on desired scroll length
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // Example map zoom/transform
  // tl.to(mapElement, {
  //   scale: 1.5,
  //   x: -200,
  //   y: -100,
  //   duration: 1,
  // });

  return tl;
}

/**
 * Scene 4 - Property Focus
 * Highlight properties on scroll with panel content
 */
export function createPropertyScrollAnimations(
  propertyElements: HTMLElement[],
  panelElement: HTMLElement
) {
  propertyElements.forEach((property, index) => {
    ScrollTrigger.create({
      trigger: property,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // Update panel content
        gsap.to(panelElement, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        });
      },
      onLeave: () => {
        // Fade out or transition
      },
    });
  });
}

/**
 * Scene 5 - Exit / Next Section
 * Unpin map → Slide in next section
 */
export function createExitTimeline(exitSection: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: exitSection,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  // tl.from(exitSection, {
  //   y: 100,
  //   opacity: 0,
  //   duration: 1,
  // });

  return tl;
}
