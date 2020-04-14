import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.35.0/testing/asserts.ts";

import { Curve25519 } from "./mod.ts";

interface Party {
  curve: Curve25519;
  seed: Uint8Array;
  secretKey?: Uint8Array;
  publicKey?: Uint8Array;
  shared?: Uint8Array;
}

Deno.test({
  name: "self",
  fn() {
    assert(new Curve25519().selftest());
  }
});

Deno.test({
  name: "x25519",
  fn() {
    // alice and bob
    const a: Party = {
      curve: new Curve25519(),
      seed: new TextEncoder().encode("deadbeefdeadbeefdeadbeefdeadbeef")
    };

    const b: Party = {
      curve: new Curve25519(),
      seed: a.seed.map((byte: number) => byte - 1)
    };

    // generating their keypairs
    Object.assign(a, a.curve.generateKeys(a.seed));
    Object.assign(b, b.curve.generateKeys(b.seed));

    // deriving the shared secret
    a.shared = a.curve.scalarMult(a.secretKey!, b.publicKey!);
    b.shared = b.curve.scalarMult(b.secretKey!, a.publicKey!);

    // assert same shared secret
    assertEquals(a.shared, b.shared);
  }
});

Deno.runTests();
