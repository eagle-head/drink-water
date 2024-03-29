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
    power: "ON" | "OFF";
  };

  type AlarmAction =
    | {
        type: "ALARM/TOGGLED";
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
