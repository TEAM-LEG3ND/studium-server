enum studyStatus {
  recruiting = 'INACTIVE',
  progress = 'PROGRESS',
  evaluate = 'EVALUATE',
  complete = 'COMPLETE',
}

enum Location {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

function getLocationEnumValue(locationStr: string): Location {
  switch (locationStr) {
    case 'ONLINE':
      return Location.ONLINE;
    case 'OFFLINE':
      return Location.OFFLINE;
    default:
      throw new Error(`Invalid location: ${locationStr}`);
  }
}

export { Location, studyStatus, getLocationEnumValue };
