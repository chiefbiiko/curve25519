import {
  runIfMain,
  test
} from "https://deno.land/std/testing/mod.ts";

import {
  assert,
  assertEquals
} from "https://deno.land/std/testing/asserts.ts";

import { Curve25519 } from "./mod.ts";

interface party {
  curve: Curve25519;
  seed: Uint8Array;
  sk?: Uint8Array;
  pk?: Uint8Array;
  shared?: Uint8Array;
}

test({
  name: "self",
  fn() {
    assert(new Curve25519().selftest());
  }
});

test({
  name: "x25519",
  fn() {
    // alice and bob
    const a: party = {
      curve: new Curve25519(),
      seed: new TextEncoder().encode("deadbeefdeadbeefdeadbeefdeadbeef")
    };
    
    const b: party = {
      curve: new Curve25519(),
      seed: a.seed.map((byte: number) => byte - 1)
    };
    
    // generating their keypairs
    Object.assign(a, a.curve.generateKeys(a.seed));
    Object.assign(b, b.curve.generateKeys(b.seed));
    
    // deriving the shared secret
    a.shared = a.curve.scalarMult(a.sk, b.pk);
    b.shared = b.curve.scalarMult(b.sk, a.pk);
    
    // assert same shared secret
    assert(!!a.shared && !!b.shared); // assert truthiness
    assertEquals(a.shared, b.shared);
  }
});

runIfMain(import.meta, { parallel: true });
