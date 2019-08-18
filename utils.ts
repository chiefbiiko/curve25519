/** Hopefully a somewhat timing-attack-robust buffer equality check. */
export function compare(a: Uint8Array, b: Uint8Array): boolean {
  let diff: number = a.length === b.length ? 0 : 1;

  for (let i: number = Math.max(a.length, b.length) - 1; i >= 0; --i) {
    diff |= a[i] ^ b[i];
  }

  return diff === 0;
}

/** Converts a hex string to a byte array. */
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
