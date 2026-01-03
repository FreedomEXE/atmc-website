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

  const mapCanvas = mapElement.querySelector<HTMLElement>("[data-map-canvas]");
  const mapDetail = mapElement.querySelector<HTMLElement>("[data-map-detail]");
  const pins = Array.from(
    mapElement.querySelectorAll<HTMLElement>("[data-pin]")
  );
  const pinPulses = Array.from(
    mapElement.querySelectorAll<HTMLElement>("[data-pin-pulse]")
  );
  const pinBodies = Array.from(
    mapElement.querySelectorAll<HTMLElement>("[data-pin-body]")
  );
  const pinIcons = Array.from(
    mapElement.querySelectorAll<HTMLElement>("[data-pin-icon]")
  );
  const pinLabels = Array.from(
    mapElement.querySelectorAll<HTMLElement>("[data-pin-label]")
  );
  const panel = mapElement.querySelector<HTMLElement>("[data-info-panel]");
  const panelItems = Array.from(
    mapElement.querySelectorAll<HTMLElement>("[data-panel-id]")
  );
  const focusGlow = mapElement.querySelector<HTMLElement>("[data-focus-glow]");

  if (!mapCanvas || !panel) return tl;

  gsap.set(mapCanvas, { scale: 1.12, y: 40 });
  if (mapDetail) gsap.set(mapDetail, { opacity: 0 });
  gsap.set(pins, { opacity: 0, scale: 0.6 });
  gsap.set(pinPulses, { opacity: 0, scale: 1 });
  gsap.set(pinBodies, { "--pin-fill": "#f7f7f2" });
  gsap.set(pinIcons, { color: "#050505" });
  gsap.set(pinLabels, { opacity: 0, y: 8 });
  gsap.set(panel, { opacity: 0, x: 40 });
  gsap.set(panelItems, { opacity: 0, y: 8 });
  if (focusGlow) gsap.set(focusGlow, { opacity: 0, scale: 0.8 });

  const waveOne = pins.slice(0, 3);
  const waveTwo = pins.slice(3);

  tl.to(
    mapCanvas,
    {
      scale: 1.03,
      y: -20,
      duration: 0.6,
      ease: "power2.out",
    },
    0
  )
    .to(
      waveOne,
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.12,
        ease: "power2.out",
      },
      0.12
    )
    .to(
      panel,
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      0.2
    )
    .to(
      waveTwo,
      {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.1,
        ease: "power2.out",
      },
      0.35
    );

  if (mapDetail) {
    tl.to(
      mapDetail,
      {
        opacity: 0.5,
        duration: 0.6,
        ease: "power1.out",
      },
      0.05
    );
  }

  const focusSequence = [
    { id: "toronto", drift: { x: -10, y: -30 } },
    { id: "hamilton", drift: { x: -22, y: -18 } },
    { id: "ottawa", drift: { x: 12, y: -36 } },
  ];

  const runFocus = (
    pin: HTMLElement,
    start: number,
    drift: { x: number; y: number }
  ) => {
    const pulse = pin.querySelector<HTMLElement>("[data-pin-pulse]");
    const label = pin.querySelector<HTMLElement>("[data-pin-label]");
    const body = pin.querySelector<HTMLElement>("[data-pin-body]");
    const icon = pin.querySelector<HTMLElement>("[data-pin-icon]");
    const panelItem = panelItems.find(
      (item) => item.dataset.panelId === pin.dataset.pin
    );
    const left = pin.style.left;
    const top = pin.style.top;

    tl.to(
      pins,
      {
        opacity: 0.55,
        duration: 0.25,
        ease: "power1.out",
      },
      start
    ).to(
      pin,
      {
        opacity: 1,
        scale: 1.12,
        duration: 0.3,
        ease: "power2.out",
      },
      start
    );

    if (pinPulses.length) {
      tl.to(
        pinPulses,
        {
          opacity: 0,
          scale: 1,
          duration: 0.2,
          ease: "power1.out",
        },
        start
      );
    }

    if (pulse) {
      tl.to(
        pulse,
        {
          opacity: 1,
          scale: 1.6,
          duration: 0.4,
          ease: "power2.out",
        },
        start
      );
    }

    if (pinLabels.length) {
      tl.to(
        pinLabels,
        {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: "power1.out",
        },
        start
      );
    }

    if (pinBodies.length) {
      tl.to(
        pinBodies,
        {
          "--pin-fill": "#f7f7f2",
          duration: 0.2,
          ease: "power1.out",
        },
        start
      );
    }

    if (pinIcons.length) {
      tl.to(
        pinIcons,
        {
          color: "#050505",
          duration: 0.2,
          ease: "power1.out",
        },
        start
      );
    }

    if (body) {
      tl.to(
        body,
        {
          "--pin-fill": "#ff5500",
          duration: 0.3,
          ease: "power2.out",
        },
        start
      );
    }

    if (icon) {
      tl.to(
        icon,
        {
          color: "#ffffff",
          duration: 0.3,
          ease: "power2.out",
        },
        start
      );
    }

    if (label) {
      tl.to(
        label,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        start + 0.05
      );
    }

    if (focusGlow) {
      tl.to(
        focusGlow,
        {
          opacity: 0.6,
          scale: 1,
          left,
          top,
          duration: 0.35,
          ease: "power2.out",
        },
        start
      );
    }

    tl.to(
      mapCanvas,
      {
        x: drift.x,
        y: drift.y,
        duration: 0.7,
        ease: "power1.out",
      },
      start
    );

    if (panelItems.length) {
      tl.to(
        panelItems,
        {
          opacity: 0,
          y: 8,
          duration: 0.2,
          ease: "power1.out",
        },
        start
      );
    }

    if (panelItem) {
      tl.to(
        panelItem,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        start + 0.1
      );
    }
  };

  let focusStart = 0.55;
  focusSequence.forEach((focus) => {
    const pin = mapElement.querySelector<HTMLElement>(
      `[data-pin="${focus.id}"]`
    );
    if (pin) {
      runFocus(pin, focusStart, focus.drift);
      focusStart += 0.35;
    }
  });

  tl.to(
    panel,
    {
      opacity: 0,
      x: 20,
      duration: 0.45,
      ease: "power1.out",
    },
    1.65
  )
    .to(
      pins,
      {
        opacity: 0.4,
        duration: 0.4,
        ease: "power1.out",
      },
      1.6
    )
    .to(
      mapCanvas,
      {
        scale: 0.98,
        y: -10,
        duration: 0.6,
        ease: "power2.out",
      },
      1.55
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
