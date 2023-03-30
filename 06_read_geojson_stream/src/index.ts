import fetch from "node-fetch";
import StreamJSON from "stream-json";
import Pick from "stream-json/filters/Pick.js";
import StreamArray from "stream-json/streamers/StreamArray.js";
import * as fs from "fs";

// エントリポイント
if (process.argv.length != 3) {
  console.log("Usage: Set 1 argument [GeoJSON File]");
  process.exit();
}

// GeoJSON FeaturesCollectionのStream読み込み
const streamReader = async (streamArray: StreamArray) => {
  for await (const sa of streamArray) {
    console.log(sa);
  }
};

// ローカルのGeoJSONからの読み込み
const localStreamArray = fs
  .createReadStream(process.argv[2])
  .pipe(StreamJSON.parser())
  .pipe(Pick.pick({ filter: "features" }))
  .pipe(StreamArray.streamArray());
await streamReader(localStreamArray);

// Web上のGeoJSONからの読み込み
const response = await fetch(
  "https://pkgstore.datahub.io/examples/geojson-tutorial/example/data/db696b3bf628d9a273ca9907adcea5c9/example.geojson"
);
const httpStreamArray = response.body
  ?.pipe(StreamJSON.parser())
  .pipe(Pick.pick({ filter: "features" }))
  .pipe(StreamArray.streamArray());
if (httpStreamArray) await streamReader(httpStreamArray);
