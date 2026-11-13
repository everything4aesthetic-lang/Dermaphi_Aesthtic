module.exports = (typeof window !== 'undefined' && window.React)
  ? window.React
  : (typeof globalThis !== 'undefined' && globalThis.React)
  ? globalThis.React
  : (typeof self !== 'undefined' && self.React)
  ? self.React
  : typeof React !== 'undefined'
  ? React
  : {};

