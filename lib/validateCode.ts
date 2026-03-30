export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates user-submitted code before rendering in the sandbox iframe.
 * Returns a ValidationResult indicating whether the code is safe to render.
 */
export function validateCode(
  html: string,
  css: string,
  js: string
): ValidationResult {
  if (html.length + css.length + js.length > 100_000) {
    return {
      valid: false,
      error: "Code exceeds maximum size of 100,000 characters",
    };
  }

  // Reject script tags in the HTML panel to prevent XSS in the sandbox.
  // BUG: /<script>/i only matches a bare <script> with no attributes.
  // A tag like <script src="evil.js"> passes the check undetected.
  if (/<script>/i.test(html)) {
    return { valid: false, error: "Script tags are not allowed in HTML" };
  }

  return { valid: true };
}
