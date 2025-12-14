import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GSAP timelines live here
// One scene = one timeline function

/**
 * Scene 1 - Intro / Preload
 * Blank screen → Logo reveal → Snap to hero
 */
export function createIntroTimeline(
  loaderElement: HTMLElement,
  logoElement: HTMLElement,
  onHeroStart?: () => void,
  onComplete?: () => void
) {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
    onComplete,
  });

  tl.set(loaderElement, {
    autoAlpha: 1,
  });

  if (logoElement) {
    tl.fromTo(
      logoElement,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      }
    );
  }

  tl.add("hero-start");
  tl.add(() => {
    onHeroStart?.();
  }, "hero-start");

  tl.to(
    loaderElement,
    {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
    },
    "hero-start"
  );

  tl.set(loaderElement, { display: "none" }, "hero-start+=0.7");

  return tl;
}

/**
 * Scene 2 - Hero Reveal
 * Navbar fades in → Headline animates → CTA appears
 */
export function createHeroTimeline(container: HTMLElement, onComplete?: () => void) {
  const tl = gsap.timeline({
    defaults: {
      ease: "power3.out",
      duration: 0.8,
    },
    onComplete,
  });

  const heroLogo = container.querySelector<HTMLElement>(".hero-logo");
  const headline = container.querySelector<HTMLElement>(".headline");
  const cta = container.querySelector<HTMLElement>(".cta");

  tl.set(container, {
    opacity: 0,
  });

  tl.to(
    container,
    {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    },
    0
  );

  if (heroLogo) {
    tl.from(heroLogo, {
      opacity: 0,
      y: 35,
      duration: 1.2,
    });
  }

  if (headline) {
    tl.from(
      headline,
      {
        opacity: 0,
        y: 35,
        duration: 1.0,
        ease: "expo.out",
      },
      "-=0.5"
    );
  }

  if (cta) {
    tl.from(
      cta,
      {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "power3.out",
      },
      "-=0.45"
    );
  }

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
      end: "+=150%",
      scrub: 0.8,
      anticipatePin: 0.5,
    },
  });

  if (!mapElement) return tl;

  // Example map zoom/transform
  tl.to(
    mapElement,
    {
      scale: 1.08,
      y: -70,
      duration: 1.2,
      ease: "power2.out",
    },
    0
  ).to(
    mapElement,
    {
      opacity: 0.95,
      duration: 1.2,
    },
    0
  );

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
