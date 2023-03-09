export type PGTCommand = {
  name: string;
  args: string[];
};

export type PGTStep =
  | {
      type: 'COMMENT';
      value: {
        text: string;
        commands: PGTCommand[];
      };
    }
  | {
      type: 'MOVE';
      value: {
        autoplay: boolean;
        moveSan: string;
        nags: string[];
        comments: (
          | {
              type: 'COMMENT';
              value: {
                text: string;
                commands: PGTCommand[];
              };
            }
          | {
              type: 'COMMAND';
              value: PGTCommand;
            }
        )[];
      };
    }
  | {
      type: 'COMMAND';
      value: PGTCommand;
    };

export type PGT = {
  headers: {
    key: string;
    value: string;
  }[];
  steps: PGTStep[];
};
