/**
 * Allowed tags for polymorphic `as` props.
 *
 * Deliberately a concrete HTML-tag union rather than React's broad `ElementType`:
 * for future 3D layers if needed,
 * `ElementType` collapses a dynamic tag's children to `never`. Restricting to real
 * HTML tags keeps polymorphic components type-safe across the project.
 */
export type PolymorphicTag =
  | "div"
  | "section"
  | "article"
  | "main"
  | "aside"
  | "header"
  | "footer"
  | "nav"
  | "span"
  | "p"
  | "ul"
  | "ol"
  | "li"
  | "label"
  | "figure"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

/** Heading-level subset for components that must wrap content in a heading. */
export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
