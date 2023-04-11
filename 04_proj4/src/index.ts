import proj4 from "proj4";
import { Proj4List } from "./epsgProj4";
const { Proj, transform } = proj4;

const coordinate = [139.7673068, 35.6809591, 10];
console.log(Proj("EPSG:3857"));
console.log(transform(Proj("EPSG:4326"), Proj("EPSG:3857"), coordinate));

const getProj4 = (epsg: string): string => {
  if (epsg in Proj4List) {
    return Proj4List[epsg];
  } else {
    console.error("[ERROR] Proj4JS list doesn't contains specified EPSG code.");
    return "";
  }
};

const projText = getProj4("EPSG:2444");
console.log(projText);
console.log(proj4(getProj4("EPSG:4326"), getProj4("EPSG:3857"), coordinate));
