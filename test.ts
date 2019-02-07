import {
  runTests,
  test,
  assert,
  equal
} from "https://deno.land/x/testing/mod.ts";

import { Curve25519 } from "./mod.ts";

interface party {
  curve: Curve25519;
  seed: Uint8Array;
  sk?: Uint8Array;
  pk?: Uint8Array;
  shared?: Uint8Array;
}

test(function self() {
  assert(new Curve25519().selftest());
});

test(function x25519() {
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
  equal(a.shared, b.shared);
});

runTests();
