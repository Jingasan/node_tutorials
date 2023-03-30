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
const streamArray = fs
  .createReadStream(process.argv[2])
  .pipe(StreamJSON.parser())
  .pipe(Pick.pick({ filter: "features" }))
  .pipe(StreamArray.streamArray());
await streamReader(streamArray);
console.log("OK");
