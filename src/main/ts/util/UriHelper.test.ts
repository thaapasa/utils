import "jest"

import { uri } from "./UriHelper"

describe("url helper", () => {
  it("urlEncodes parts of string", () => {
    const goodParam = "12345-1234"
    expect(`/path/${goodParam}/foo`).toBe("/path/12345-1234/foo")
    expect(uri`/path/${goodParam}/foo`).toBe("/path/12345-1234/foo")

    const sneakyParam = "../../etc/passwd?"
    expect(`/path/${sneakyParam}/foo`).toBe("/path/../../etc/passwd?/foo")
    expect(uri`/path/${sneakyParam}/foo`).toBe(
      "/path/..%2F..%2Fetc%2Fpasswd%3F/foo"
    )

    expect(`/path/${sneakyParam}/foo/${34}${"no/way?hose"}`).toBe(
      "/path/../../etc/passwd?/foo/34no/way?hose"
    )
    expect(uri`/path/${sneakyParam}/foo/${34}${"no/way?hose"}`).toBe(
      "/path/..%2F..%2Fetc%2Fpasswd%3F/foo/34no%2Fway%3Fhose"
    )
  })
})
