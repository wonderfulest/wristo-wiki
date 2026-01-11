# Design Basics

- **Canvas and safe area**  
  - Canvas size = device resolution (for example, 390×390).  
  - Safe area: to avoid being covered by system UI, rounded corners, or sensors, key information (time, data) should be placed within the recommended safe area.  
  - It’s recommended to keep the "safe area" guides turned on in the editor.

- **Common watch face elements**  
  - Time: the visual hero of the entire watch face; ensure high contrast and legibility.  
  - Date: usually displayed alongside time; pay attention to font size hierarchy.  
  - Data fields: steps, heart rate, calories, battery level, etc. Group them logically to avoid information noise.  
  - Icons and decorations: help convey style but should not overpower the main informational visuals.

- **Layers and alignment**  
  - Use layer order to manage foreground and background (background / data / decoration).  
  - Use alignment tools (center, grid, equal spacing) to keep layouts tidy.  
  - Try to follow the three basic visual principles: alignment, contrast, and whitespace.

- **Typography and color**  
  - Typography: prefer highly legible sans-serif fonts; avoid overly decorative typefaces.  
  - Color:
    - Maintain sufficient contrast between text and background so it remains readable in bright outdoor light.  
    - Keep 1–2 primary colors and 2–3 accent colors for the whole design.  
  - If Wristo provides official fonts and color palettes, refer to the "Design Guidelines" documentation first.
