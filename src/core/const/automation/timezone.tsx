import * as moment from 'moment-timezone';

const formatOffset = (offset: number) => {
    const hours = Math.floor(offset / 60);
    const minutes = offset % 60;
    const sign = hours >= 0 ? '+' : '-';
    return `GMT ${sign}${Math.abs(hours).toString().padStart(2, '0')}:${Math.abs(minutes).toString().padStart(2, '0')}`;
  };

  export const TimeZones = moment.tz.names().map(zone => {
    const offset = moment.tz(zone).utcOffset();
    const formattedOffset = formatOffset(offset);
    return {
      value: zone,
      label: `(${formattedOffset}) ${zone.replace('_', ' ')}`,
      offSet:formattedOffset
    };
  });
   
