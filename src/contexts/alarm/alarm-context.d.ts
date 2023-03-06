export {};

declare global {
  type AlarmContextType =
    | {
        state: AlarmState;
        dispatch: (action: AlarmAction) => void;
      }
    | undefined;

  type AlarmState = {
    startTime: Date;
    endTime: Date;
    interval: number;
    isItOn: boolean;
  };

  type AlarmAction =
    | {
        type: "TOOGLED";
      }
    | {
        type: "TIME/START";
        payload: Date;
      }
    | {
        type: "TIME/END";
        payload: Date;
      }
    | {
        type: "TIME/INTERVAL";
        payload: number;
      };
}
