import StreamChain from "stream-chain";
import StreamJSON from "stream-json";
import Pick from "stream-json/filters/Pick.js";
import StreamArray from "stream-json/streamers/StreamArray.js";
import * as fs from "fs";

// GeoJSON FeaturesCollectionのStream読み込み
function readGeoJSONStream() {
  const geojsonFilename = process.argv[2];
  const pipeline = StreamChain.chain([
    fs.createReadStream(geojsonFilename),
    StreamJSON.parser(),
    Pick.pick({ filter: "features" }),
    StreamArray.streamArray(),
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
