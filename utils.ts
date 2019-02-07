/**
 * Time constant comparison of two arrays
 * @param {Uint8Array} lh First array of bytes
 * @param {Uint8Array} rh Second array of bytes
 * @return {Boolean} True if the arrays are equal (length and content), false otherwise
 */
export function compare(lh: Uint8Array, rh: Uint8Array): boolean {
  if (lh.length !== rh.length) {
    // abort
    return false;
  }
  let i, d = 0, len = lh.length;
  for (i = 0; i < len; i++) {
    d |= lh[i] ^ rh[i];
  }
  return d === 0;
}

/**
 * Convert a hex string to byte array
 * @param {String} hex Hex string
 * @return {Uint8Array} Byte array
 */
export function hex2bin(hex: string): Uint8Array {
  if (hex.indexOf('0x') === 0 || hex.indexOf('0X') === 0) {
    hex = hex.substr(2);
  }
  if (hex.length % 2) {
    hex += '0';
  }

  let bin = new Uint8Array(hex.length >>> 1);
  for (let i = 0, len = hex.length >>> 1; i < len; i++) {
    bin[i] = parseInt(hex.substr(i << 1, 2), 16);
  }
  return bin;
}
