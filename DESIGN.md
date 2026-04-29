---
name: Synthetic Intelligence News
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#f7f6ff'
  on-tertiary: '#2c303d'
  tertiary-container: '#d7daec'
  on-tertiary-container: '#5b5f6e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#dfe2f3'
  tertiary-fixed-dim: '#c3c6d7'
  on-tertiary-fixed: '#171b28'
  on-tertiary-fixed-variant: '#434654'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is built for a premium AI news experience that feels like peering into the future of information. The brand personality is authoritative yet visionary, combining the gravitas of traditional journalism with the high-velocity aesthetic of artificial intelligence. It targets a sophisticated, tech-literate audience that values signal over noise.

The visual style leans heavily into **Glassmorphism** and **Minimalism**. By using translucent layers and high-clarity typography, the UI creates a sense of infinite digital depth. The "neon glow" elements are used sparingly to highlight AI-driven insights, ensuring the interface feels "alive" and reactive. The goal is an addictive, high-tech environment that feels both expansive and meticulously organized.

## Colors

The palette is rooted in a deep, nocturnal foundation to minimize eye strain and maximize the impact of glowing accents. 

- **Primary (Cyan Glow):** A high-vibrancy cyan (#00F2FF) used for interactive states, progress indicators, and AI-generated summaries. It represents the "pulse" of the data.
- **Secondary (Deep Purple):** A rich, regal purple (#7000FF) used for gradients and background depth, providing a sophisticated bridge between the dark base and the bright accents.
- **Surface (Midnight Blue):** The core background (#0A0E1A) is a very dark, desaturated navy rather than pure black, allowing for more realistic shadows and light bleeds.
- **Accents:** Linear gradients transitioning from Purple to Cyan are used to signify AI "processing" or "curation" states.

## Typography

The typography strategy balances technical precision with editorial readability. **Space Grotesk** is utilized for headlines to provide a futuristic, geometric edge that aligns with the high-tech vibe. Its unique letterforms act as a subtle brand identifier.

**Inter** is the workhorse for body copy and UI labels. It was chosen for its exceptional legibility in dark mode and its neutral, systematic feel. We use generous line heights (1.6 for body) to ensure long-form news consumption remains comfortable. High-contrast weights are used to establish a clear hierarchy, with labels often set in uppercase with slight tracking to evoke a "terminal" or "dashboard" aesthetic.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop (12 columns, 1200px max-width) to maintain an editorial feel, transitioning to a fluid model for mobile devices. 

The rhythm is governed by a 4px base unit. Negative space is used aggressively to prevent the "Glassmorphism" layers from feeling cluttered. Content modules are separated by large "xl" spacing to allow each news story room to breathe. Component internals follow a tighter "sm" to "md" spacing logic to maintain tight association between text and their respective icons/controls.

## Elevation & Depth

Depth is the primary navigator in this system. It is achieved through a multi-layered approach:

1.  **The Void:** The base background layer (#0A0E1A).
2.  **The Mist:** Large, ultra-soft radial gradients of purple and blue that sit behind the content layers, creating a sense of atmospheric perspective.
3.  **Glass Plates:** Content containers use a semi-transparent fill (White at 5-8% opacity) with a `backdrop-filter: blur(20px)`. 
4.  **Edge Illumination:** Instead of traditional shadows, elevated cards use a 1px inner border (stroke) with a linear gradient. The top-left edge is more opaque to simulate a light source, while the bottom-right fades to 0%.
5.  **Interactive Glows:** Active elements emit a soft, colored outer glow (`box-shadow` with large spread and low opacity) using the Primary Cyan color.

## Shapes

The shape language is "Sophisticated Geometric." We use a **Rounded** (Level 2) approach to soften the high-tech aesthetic and make the UI feel approachable and trustworthy. 

Standard components (cards, buttons) use a 0.5rem (8px) radius. Larger container elements like news-feed blocks or modals use 1.5rem (24px) to emphasize the "plate of glass" metaphor. Icons should be drawn with a 2px stroke and slightly rounded terminals to match the corner radii of the containers they inhabit.

## Components

### Buttons
- **Primary:** Solid Cyan to Purple gradient. Text is high-contrast black. On hover, the glow intensity increases.
- **Ghost:** 1px Cyan border with a 5% Cyan fill. Text is Cyan.

### Cards (News Items)
- Glassmorphic background. 
- Subtle 1px top-border highlight.
- Images within cards should have a subtle dark overlay to ensure white text overlay is always legible.

### Interactive Inputs
- Fields appear as dark, recessed wells until focused.
- Upon focus, the border illuminates with a Cyan-to-Purple gradient and the entire field gains a subtle internal glow.

### AI Sentiment Chips
- Small, pill-shaped tags used to categorize news. 
- Colors are dynamic: Positive (Cyan), Neutral (Slate), Urgent (Purple).

### Progress & Loading
- Linear bars use a "flowing" gradient animation that mimics data moving through a pipe.
- Loading states utilize a shimmering "skeleton" effect that respects the glass backdrop-blur.

### Feed Scroller
- A custom, thin scrollbar that is semi-transparent and only fully illuminates when active, keeping the focus entirely on the content.