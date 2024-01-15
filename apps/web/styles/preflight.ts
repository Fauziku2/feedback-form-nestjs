import { makeStaticStyles } from '@fluentui/react-components';
import { ReactNode } from 'react';

/**
 * Built on top of [`modern-normalize`](https://github.com/sindresorhus/modern-normalize) and adapted into css-in-js variant.
 * These set of base styles are designed to smooth over cross-browser inconsistencies and make it easier for you to work within the constraints of the design system.
 */
const normalize = {
  // Use a better box model (opinionated).
  '*': {
    boxSizing: 'border-box',
    '&::before, &::after': {
      boxSizing: 'border-box',
    },
  },
  html: {
    fontFamily: [
      'system-ui',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
    ],
    lineHeight: 1.15,
    webkitTextSizeAdjust: '100%',
    mozTabSize: 4,
    tabSize: 4,
  },
  body: {
    margin: 0,
  },
  hr: {
    height: 0,
    color: 'inherit',
  },
  // Add the correct text decoration in Chrome, Edge, and Safari.
  'abbr[title]': {
    textDecoration: 'underline dotted',
  },
  // Add the correct font weight in Edge and Safari.
  'b, strong': {
    fontWeight: 'bolder',
  },
  /**
   * 1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)
   * 2. Correct the odd 'em' font sizing in all browsers.
   */
  'code, kbd, samp, pre': {
    fontFamily: [
      'ui-monospace',
      'SFMono-Regular',
      'Consolas',
      'Liberation Mono',
      'Menlo',
      'monospace',
    ],
    fontSize: '1em',
  },
  small: {
    fontSize: '20px',
  },
  // Prevent 'sub' and 'sup' elements from affecting the line height in all browsers.
  'sub, sup': {
    fontSize: '75%',
    lineHeight: 0,
    position: 'relative',
    verticalAlign: 'baseline',
  },
  sub: {
    bottom: '-0.25em',
  },
  sup: {
    top: '-0.5em',
  },
  /**
   * 1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
   * 2. Correct table border color inheritance in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
   */
  table: {
    textIndent: 0,
    borderColor: 'inherit',
  },
  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */
  'button, input, optgroup, select, textarea': {
    fontFamily: 'inherit',
    fontSize: '100%',
    lineHeight: 1.15,
    margin: 0,
  },
  // Remove the inheritance of text transform in Edge and Firefox.
  'button, select': {
    textTransform: 'none',
  },
  // Correct the inability to style clickable types in iOS and Safari.
  'button, [type="button"], [type="reset"], [type="submit"]': {
    webkitAppearance: 'button',
  },
  // Remove the inner border and padding in Firefox.
  '::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0,
  },
  // Restore the focus styles unset by the previous rule.
  ':-moz-focusring': {
    outline: '1px dotted ButtonText',
  },
  // Remove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.
  legend: {
    padding: 0,
  },
  // Add the correct vertical alignment in Chrome and Firefox.
  progress: {
    verticalAlign: 'baseline',
  },
  // Correct the cursor style of increment and decrement buttons in Safari.
  '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
    height: 'auto',
  },
  /**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */
  '[type="search"]': {
    webkitAppearance: 'textfield',
    outlineOffset: '-2px',
  },
  // Remove the inner padding in Chrome and Safari on macOS.
  '::-webkit-search-decoration': {
    webkitAppearance: 'none',
  },
  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to 'inherit' in Safari.
   */
  '::-webkit-file-upload-button': {
    webkitAppearance: 'button',
    font: 'inherit',
  },
  // Add the correct display in Chrome and Safari.
  summary: {
    display: 'list-item',
  },
  /**
   * Removes all of the default margins from elements like headings, blockquotes, paragraphs, etc.
   * This makes it harder to accidentally rely on margin values applied by the user-agent stylesheet that are not part of your spacing scale.
   */
  'blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre': {
    margin: 0,
  },
  // All heading elements are completely unstyled by default, and have the same font-size and font-weight as normal text.
  'h1, h2, h3, h4, h5, h6': {
    fontSize: 'inherit',
    fontWeight: 'inherit',
  },
  // Ordered and unordered lists are unstyled by default, with no bullets/numbers and no margin or padding.
  'ol, ul': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  // Images and other replaced elements (like svg, video, canvas, and others) are display: block by default.
  'img, svg, video, canvas, audio, iframe, embed, object': {
    display: 'block',
    verticalAlign: 'middle',
  },
  // Images and videos are constrained to the parent width in a way that preserves their intrinsic aspect ratio.
  'img, video': {
    maxWidth: '100%',
    height: 'auto',
  },
  // In order to make it easy to add a border by simply adding the border class, Tailwind overrides the default border styles for all elements with the following rules:
  '*::before, *::after': {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: "theme('borderColor.DEFAULT', currentColor)",
  },
};

/**
 * Applies style normalization to global selectors when this hook is called.
 */
export const useNormalizeStyles = makeStaticStyles(normalize as any); // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Empty component that applies preflight styles such as normalization to global selectors when rendered.
 */
export function Preflight(): ReactNode {
  useNormalizeStyles();
  return null;
}
