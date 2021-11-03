// Schreiben Sie ein Programm, das die folgende Bitfolge mit dem 11,7 Hamming-Code aus der Vorlesung _encodiert_. Verwenden Sie dafür _Sprache A_ aus dem Sprachpaar.
// 7 Bit zum codieren: 0110001
// result: 01001100001
// language: typescript

// 2^i in bit
const LENGTH = 11;

function insertBitBeforePos(
  bitstring: string,
  bit: number,
  pos: number
): string {
  let result: string = bitstring;
  result = result.substr(0, pos) + bit + result.substr(pos);
  return result;
}

function getPositionsToCheck(pos: number): number[] {
  let result: number[] = [];
  for (let i: number = 1; i < LENGTH + 1; i++) {
    if (i > pos && checkPosition(i, pos)) {
      if (pos != i - 1) {
        result.push(i - 1);
      }
    }
  }
  return result;
}

function checkPosition(i: number, pos: number) {
  let str: string = i.toString(2);
  let index = Math.log2(pos + 1);
  let val = str[str.length - index - 1];
  return val == "1";
}

function checkForParity(bitstring: string, pos: number): number {
  let result: number = 0;
  let positionsToCheck: number[] = getPositionsToCheck(pos);

  for (let i: number = 0; i < positionsToCheck.length; i++) {
    result += parseInt(bitstring[positionsToCheck[i]]);
  }
  return result % 2;
}

function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}

function hammingEncode74(bitstring: string): string {
  let result: string = bitstring;
  let positions: number[] = [0, 1, 3, 7];
  let parities: number[] = [];

  // return a string with inserted parites "0"
  for (let i: number = 0; i < positions.length; i++) {
    result = insertBitBeforePos(result, 0, positions[i]);
  }

  // get parities and set them correctly
  for (let i: number = 0; i < positions.length; i++) {
    parities[i] = checkForParity(result, positions[i]);
    result = setCharAt(result, positions[i], parities[i].toString());
  }

  return result;
}

// ------------------
// cleanup;
// await Deno.run({
//   cmd: ["clear"],
// }).status();

console.log(hammingEncode74("0110001"));
