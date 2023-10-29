
type regions = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";
export function adjustRegion(row: number, col:number) {

  let target: regions;

  if (row < 3) {
    if (col < 3) {
      target = "a";
    } else if (col >= 3 && col < 6) {
      target = "b";
    } else {
      target = "c";
    }
  } else if (row >= 3 && row < 6) {
    if (col < 3) {
      target = "d";
    } else if (col >= 3 && col < 6) {
      target = "e";
    } else {
      target = "f";
    }
  } else {
    if (col < 3) {
      target = "g";
    } else if (col >= 3 && col < 6) {
      target = "h";
    } else {
      target = "i";
    }
  };

  return target;

};