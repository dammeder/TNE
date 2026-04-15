# Design System: Transnational Experts (TNE)

## 1. Overview & Creative North Star

### The Creative North Star: "Kinetic Elegance"
The logistics and trucking industry is often defined by grit and industrial coldness. This design system pivots toward **Kinetic Elegance**. We are moving away from the "template" look of standard logistics portals and toward a high-end, editorial digital experience. 

The system centers on the concept of movement filtered through a premium lens. By utilizing deep, sophisticated dark surfaces (`surface-dim`) contrasted with vibrant, glass-like accents, we create a sense of elite reliability. We break the grid through intentional asymmetry—overlapping text over images of the fleet, off-center hero alignments, and wide-set typography—to convey a company that is forward-thinking and technologically superior.

---

## 2. Colors

### Palette Strategy
The foundation is built on `background` (#111317), a deep obsidian that allows the logo’s signature purples and pinks to glow as light sources rather than just flat accents.

*   **Primary Accent (`primary` / `primary-container`):** Reserved for high-intent actions and kinetic moments. Use the gradient transition from #9d50bb to #edb1ff to simulate movement and energy.
*   **Secondary Accent (`secondary`):** Soft pinks (#ffb2ba) used for highlight details or metadata to soften the industrial feel of the trucking industry.
*   **Neutral Tones:** Used to establish a clear hierarchy of information without creating visual clutter.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined strictly through:
1.  **Tonal Shifts:** Placing a `surface-container-low` section against a `background` section.
2.  **Negative Space:** Using the spacing scale to create psychological separation.
3.  **Glass Transitions:** Subtle backdrop blurs that "float" over the background.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of frosted glass.
*   **Lowest Layer:** `surface-container-lowest` for background utility areas.
*   **Mid Layer:** `surface-container` for general content blocks.
*   **Highest Layer:** `surface-container-highest` for interactive elements like cards.
Each inner container should use a slightly higher tier than its parent to define importance through luminosity rather than lines.

### Signature Textures: Glass & Gradient
To achieve the premium look, floating elements must use **Glassmorphism**. Apply a semi-transparent `surface` color (approx. 40-60% opacity) with a `backdrop-filter: blur(20px)`. Main CTAs should not be flat; use a linear gradient from `primary-container` to `primary` to give the button "soul" and a tactile, light-emitting quality.

---

## 3. Typography

The typography strategy leverages the contrast between the technical precision of **Inter** and the geometric authority of **Space Grotesk**.

*   **Display & Headline (Space Grotesk):** Used to command attention. The wide, architectural nature of Space Grotesk mirrors the scale of the TNE fleet. Use `display-lg` for hero statements with tight letter spacing (-0.02em) to evoke a "Bold Editorial" feel.
*   **Body & Labels (Inter):** Inter provides maximum legibility for logistics data and broker trust points. Use `body-lg` for storytelling and `label-md` for technical specs.
*   **Hierarchy as Identity:** By oversized headlines (`display-lg`) next to understated body copy (`body-md`), we create a sophisticated "Luxury Journal" layout that signals TNE is not just a trucking company, but a premium logistics partner.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering**. Instead of standard shadows, we stack surface tiers. A `surface-container-high` card placed on a `surface-dim` background creates a natural, soft lift that feels integrated into the environment.

### Ambient Shadows
When a "floating" effect is necessary (e.g., a floating navigation bar or a modal), shadows must be:
*   **Extra-diffused:** Blur values of 40px to 80px.
*   **Low-opacity:** 4% to 8% alpha.
*   **Tinted:** Instead of pure black, use a shadow color derived from `surface-tint` to mimic natural ambient light.

### The "Ghost Border" Fallback
If a border is required for accessibility, it must be a **Ghost Border**. Use `outline-variant` at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden.

### Glassmorphism Implementation
Containers that overlap images of the fleet must use Glassmorphism. This ensures that the texture of the trucks and the environment "bleeds through," making the UI feel like an integrated part of the TNE world rather than an overlay.

---

## 5. Components

### Buttons
*   **Primary:** Gradient (`primary-container` to `primary`), `xl` roundedness, no border. Text: `label-md` uppercase.
*   **Secondary:** Glassmorphism base (`surface` at 20% opacity + blur), Ghost Border, `xl` roundedness.

### Cards & Fleet Showcases
*   **Rule:** No divider lines.
*   **Style:** Use `surface-container-low` with a subtle `primary` glow on hover. Images should be slightly desaturated, returning to full color only when the user interacts with the card.

### Input Fields
*   **Style:** `surface-container-highest` background. No bottom line. Use `outline-variant` at 10% for the "Ghost Border." Focus state should transition the border to `primary` with a 4px soft glow.

### Additional Component: The "Kinetic Metric"
For showcasing fleet size and reliability: Large `display-md` numbers in a `primary` to `secondary` gradient, paired with `label-sm` technical descriptions. These should be placed asymmetrically across the layout.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use expansive white space (spacing 80px+) between major sections.
*   **Do** overlap elements (e.g., a glass card partially covering a high-res photo of a TNE truck).
*   **Do** use `primary` and `secondary` gradients as "light sources" in the corners of the dark background.

### Don't:
*   **Don't** use 100% opaque black (#000000). Always use `surface-dim` or `background` for a softer, premium feel.
*   **Don't** use standard drop shadows (e.g., 0px 2px 4px black).
*   **Don't** use sharp corners. Everything must follow the **Roundedness Scale** (minimum `md`).
*   **Don't** use vertical or horizontal divider lines to separate content; use tonal shifts and space instead.