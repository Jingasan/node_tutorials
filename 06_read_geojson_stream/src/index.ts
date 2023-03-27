import { chain } from "stream-chain";
import { parser } from "stream-json";
import { pick } from "stream-json/filters/Pick";
import { streamArray } from "stream-json/streamers/StreamArray";
import * as fs from "fs";

// GeoJSON FeaturesCollectionのStream読み込み
function readGeoJSONStream() {
  const geojsonFilename = process.argv[2];
  const pipeline = chain([
    fs.createReadStream(geojsonFilename),
    parser(),
    pick({ filter: "features" }),
    streamArray(),
    (data) => {
      const value = data.value;
      console.log(JSON.stringify(value.geometry.coordinates));
      return value;
    },
  ]);

  let counter = 0;
  pipeline.on("data", () => ++counter);
  pipeline.on("end", () => console.log(counter));
}

// エントリポイント
if (process.argv.length != 3) {
  console.log("Usage: Set 1 argument [GeoJSON File]");
  process.exit();
}
readGeoJSONStream();
