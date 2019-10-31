import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const snapshotOptions = {
  failureThreshold: 0.01,
  customSnapshotsDir: '.',
};

addMatchImageSnapshotCommand(snapshotOptions);
