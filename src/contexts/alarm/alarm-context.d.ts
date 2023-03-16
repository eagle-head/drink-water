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
        type: "ALARM/TOOGLED";
      }
    | {
        type: "ALARM/START";
        payload: Date;
      }
    | {
        type: "ALARM/END";
        payload: Date;
      }
    | {
        type: "ALARM/INTERVAL";
        payload: number;
      };
}
