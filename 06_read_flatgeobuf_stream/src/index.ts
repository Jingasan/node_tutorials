import { geojson } from "flatgeobuf";
import fetch from "node-fetch";
import { ReadableStream } from "web-streams-polyfill";

const nodeToWeb = (nodeStream: NodeJS.ReadableStream) => {
  let destroyed = false;
  interface Listeners {
    [name: string]: (data: unknown) => void;
  }
  const listeners: Listeners = {};

  function start(controller: ReadableStreamDefaultController) {
    listeners["data"] = onData;
    listeners["end"] = onDestroy;
    listeners["close"] = onDestroy;
    listeners["error"] = onDestroy;
    for (const name in listeners) nodeStream.on(name, listeners[name]);

    nodeStream.pause();

    function onData(chunk: unknown) {
      if (destroyed) return;
      controller.enqueue(chunk);
      nodeStream.pause();
    }

    function onDestroy(err: unknown) {
      if (destroyed) return;
      destroyed = true;

      for (const name in listeners)
        nodeStream.removeListener(name, listeners[name]);

      if (err) controller.error(err);
      else controller.close();
    }
  }

  function pull() {
    if (destroyed) return;
    nodeStream.resume();
  }

  function cancel() {
    destroyed = true;
    for (const name in listeners)
      nodeStream.removeListener(name, listeners[name]);
    nodeStream.pause();
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return new ReadableStream({ start: start, pull: pull, cancel: cancel });
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
const response = await fetch("https://flatgeobuf.org/test/data/UScounties.fgb");
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
if (response.body)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  for await (const feature of geojson.deserialize(nodeToWeb(response.body))) {
    console.log(JSON.stringify(feature));
  }
