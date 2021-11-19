import { plot, plot2 } from "./plotting.ts";
import { IPlotData, ISource } from "./types";

// package size in BYTES
const MIN_PACKAGE_SIZE: number = 64;
const MAX_PACKAGE_SIZE: number = 1500;
const MAX_LOAD: number = 6;
const UNENCUMBERED_PACKAGE_RATE: number = 500; // means packages per second
const CONNECTION_SPEED = 300; // 100 bytes per second

class source implements ISource {
  id: number;
  packageSize: number;
  sent: boolean;
  timeForActualTransfer: number;

  constructor(id: number) {
    this.id = id;
    this.packageSize = Math.round(
      Math.random() * (MAX_PACKAGE_SIZE - MIN_PACKAGE_SIZE) + MIN_PACKAGE_SIZE
    );
    this.sent = false;
    this.timeForActualTransfer = Number(
      (this.packageSize / CONNECTION_SPEED).toFixed(5)
    );
  }
  toString(): string {
    return `source: ${this.id}; bytes: ${this.packageSize}; sent: ${this.sent}`;
  }
}

class queue {
  sources: source[];
  plotDataRoundRobin: IPlotData[];
  plotDataFairQueueing: IPlotData[];

  constructor() {
    this.sources = [];
    this.plotDataRoundRobin = [];
    this.plotDataFairQueueing = [];
  }
  add(source: source): void {
    this.sources.push(source);
  }
  delete(source: source): void {
    // check if source exists
    const index = this.sources.findIndex((source) => source.id === source.id);
    if (typeof index !== "undefined") {
      this.sources = this.sources.filter((s) => s.id !== source.id);
    }
  }
  getSourceById(id: number): source | null {
    const source = this.sources.find((source) => source.id === id) || null;
    return source;
  }
  printAllSources(): void {
    console.log(this.sources.map((source) => source.toString()));
  }
  timeUntilTransferRoundRobin(): IPlotData[] {
    const openJobs = this.sources.filter((source) => !source.sent);
    openJobs.sort((a, b) => b.packageSize - a.packageSize);
    for (let i = 0; i < openJobs.length; i++) {
      const source = openJobs[i];
      const delay =
        i === 0
          ? i
          : Number(
              this.getPackageTransferDelayForSource(source.packageSize).toFixed(
                5
              )
            );
      this.plotDataRoundRobin.push({
        packageSize: source.packageSize,
        delay,
        timeUntilTransfer: 0,
        timeUntilTransferFinished: 0,
      });
    }

    for (let i: number = 0; i < openJobs.length; i++) {
      const source: source = openJobs[i];
      let timeUntilTransfer: number = 0;
      for (let j: number = 0; j <= i; j++) {
        timeUntilTransfer += this.plotDataRoundRobin[j].delay;
      }
      this.plotDataRoundRobin[i].timeUntilTransfer = Number(
        timeUntilTransfer.toFixed(5)
      );
      this.plotDataRoundRobin[i].timeUntilTransferFinished =
        this.plotDataRoundRobin[i].timeUntilTransfer +
        this.plotDataRoundRobin[i].delay;
    }

    return this.plotDataRoundRobin;
  }
  timeUntilTransferFairQueue(): IPlotData[] {
    const openJobs = this.sources.filter((source) => !source.sent);
    openJobs.sort((a, b) => a.timeForActualTransfer - b.timeForActualTransfer);
    for (let i = 0; i < openJobs.length; i++) {
      const source = openJobs[i];
      const delay =
        i === 0
          ? i
          : Number(
              this.getPackageTransferDelayForSource(source.packageSize).toFixed(
                5
              )
            );
      this.plotDataFairQueueing.push({
        packageSize: source.packageSize,
        delay,
        timeUntilTransfer: 0,
        timeUntilTransferFinished: 0,
      });
    }

    for (let i: number = 0; i < openJobs.length; i++) {
      const source: source = openJobs[i];
      let timeUntilTransfer: number = 0;
      for (let j: number = 0; j <= i; j++) {
        timeUntilTransfer += this.plotDataFairQueueing[j].delay;
      }
      this.plotDataFairQueueing[i].timeUntilTransfer = Number(
        timeUntilTransfer.toFixed(5)
      );
      this.plotDataRoundRobin[i].timeUntilTransferFinished =
        this.plotDataRoundRobin[i].timeUntilTransfer +
        this.plotDataRoundRobin[i].delay;
    }

    return this.plotDataFairQueueing;
  }
  getPackageTransferDelayForSource(packageSize: number): number {
    const usedTime = packageSize / UNENCUMBERED_PACKAGE_RATE;

    const rho = usedTime >= 1 ? 0.99 : Number(usedTime.toFixed(2));
    const delay = (1 / UNENCUMBERED_PACKAGE_RATE) * (1 / (1 - rho));

    return delay;
  }
}

const queue1 = new queue();
queue1.add(new source(0));
queue1.add(new source(1));
queue1.add(new source(2));

console.log("--- Initial logging ---");
queue1.printAllSources();
console.log("--- Round Robin ---");
const plotRobin: IPlotData[] = queue1.timeUntilTransferRoundRobin();
console.log("--- Fair Queueing ---");
const plotFair: IPlotData[] = queue1.timeUntilTransferFairQueue();

plot(plotRobin, "task2/round-robin.png");
plot(plotFair, "task2/fair-queuing.png");
