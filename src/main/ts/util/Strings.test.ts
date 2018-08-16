import "jest"
import { snakeCaseToCamelCase, upperCaseFirst, snakeCaseObjectToCamelCase } from "./Strings"

describe("strings", () => {
  it("can uppercase first letter", () => {
    expect(upperCaseFirst("foo")).toBe("Foo")
    expect(upperCaseFirst("FOO")).toBe("FOO")
    expect(upperCaseFirst("")).toBe("")
    expect(upperCaseFirst("a")).toBe("A")
    expect(upperCaseFirst("ä")).toBe("Ä")
    expect(upperCaseFirst("D")).toBe("D")
    expect(upperCaseFirst("aD")).toBe("AD")
    expect(upperCaseFirst("fooFiiF")).toBe("FooFiiF")
    expect(upperCaseFirst("scream")).toBe("Scream")
    expect(upperCaseFirst("012")).toBe("012")
  })

  it("can convert snake_case to camelCase", () => {
    expect(snakeCaseToCamelCase("foo")).toBe("foo")
    expect(snakeCaseToCamelCase("foo_bar")).toBe("fooBar")
    expect(snakeCaseToCamelCase("baz___goo")).toBe("bazGoo")
    expect(snakeCaseToCamelCase("baz_a_blob")).toBe("bazABlob")
    expect(snakeCaseToCamelCase("")).toBe("")
    expect(snakeCaseToCamelCase("go_")).toBe("go")
    expect(snakeCaseToCamelCase("_of")).toBe("Of")
  })

  it("can convert a postgres object from db", () => {
    expect(snakeCaseObjectToCamelCase({ account_id: 123 })).toMatchObject({ accountId: 123 })
    expect(snakeCaseObjectToCamelCase({})).toMatchObject({})
    expect(snakeCaseObjectToCamelCase({ accountId: 123 })).toMatchObject({ accountId: 123 })
  })
})
