import Graph from "https://deno.land/x/deno_chart/mod.ts";
import { IPlotData } from "./types";

export function plot(plotData: IPlotData[], name: string) {
  const packageSizes: number[] = plotData.map((data) => data.packageSize);
  const times: number[] = plotData.map(
    (data) => data.timeUntilTransferFinished
  );

  const graph = new Graph({
    titleText: "Queueing Algorithm",
    xAxisText: "Package size",
    yAxisText: "Transfer time",

    backgroundColor: {
      r: 0,
      g: 0,
      b: 0,
      a: 0.75,
    },

    yMax: Math.max(...times),
    bar_width: 25,
    graphSegments_X: packageSizes.length,

    xTextColor: "rgba(255,255,255,1)",
    xSegmentColor: "rgba(255,255,255,0.5)",
    yTextColor: "rgba(255,255,255,1)",
    ySegmentColor: "rgba(255,255,255,0.5)",

    // Verbose Logging (Optional)
    // verbose: true,
  });

  // Random Bar Generation with Colors!
  const COLORS = ["#345C7D", "#F7B094", "#F5717F", "#84E89F", "#BB9DD4"];
  console.log(times);
  console.log(packageSizes);

  for (let i = 0; i < times.length; i++) {
    const clr = COLORS[Math.floor(Math.random() * COLORS.length)];
    const y = times[i];

    graph.add({
      val: y,
      label: packageSizes[i],
      color: clr,
    });
  }

  // Draw to Canvas Context & Save png image
  graph.draw();
  graph.save(name);
}
