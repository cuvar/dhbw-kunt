export declare interface IPlotData {
  packageSize: number;
  delay: number; // seconds
  timeUntilTransfer: number; // seconds
  timeUntilTransferFinished: number;
}

export declare interface ISource {
  id: number;
  packageSize: number;
  sent: boolean;
  timeForActualTransfer: number;
}
