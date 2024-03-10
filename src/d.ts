import 'astro/astro-jsx'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = HTMLElement
    type IntrinsicElements = astroHTML.JSX.IntrinsicElements
  }
}
