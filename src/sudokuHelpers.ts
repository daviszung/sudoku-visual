
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

export function updateStats(algorithm: string, possibilitiesRemoved: number, revealedByNarrowing: number, valuesDeduced: number) {
  const algorithmUsedStat = document.querySelector("#algorithmUsed")!
  const possibilitiesRemovedStat = document.querySelector("#possibilitiesRemovedStat")!
  const revealedByNarrowingStat = document.querySelector("#revealedByNarrowingStat")!
  const valuesDeducedStat = document.querySelector("#valuesDeducedStat")!
  algorithmUsedStat.innerHTML = algorithm
  possibilitiesRemovedStat.innerHTML = `${possibilitiesRemoved}`
  revealedByNarrowingStat.innerHTML = `${revealedByNarrowing}`
  valuesDeducedStat.innerHTML = `${valuesDeduced}`
}