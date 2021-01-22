import { mapObj } from "./MapObj"

function flip(a: string): number
function flip(a: number): string
function flip(a: number | string): number | string {
    return typeof a === "number" ? `${a}` : Number(a)
}

const mapped = mapObj({ strToNum: "4", numToStr: 4 }, flip)
