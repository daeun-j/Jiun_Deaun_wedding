// Count ceremony-local calendar dates, even for guests in other time zones.
export function calendarParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date);
  return Object.fromEntries(parts.filter(p => p.type !== 'literal').map(p => [p.type, Number(p.value)]));
}

export function daysUntil(start, now, timeZone) {
  const dayNumber = date => {
    const { year, month, day } = calendarParts(date, timeZone);
    return Date.UTC(year, month - 1, day) / 86400000;
  };
  return dayNumber(start) - dayNumber(now);
}

export function calendarFile(event, title, locationText, host, now = new Date()) {
  const stamp = date => new Date(date).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const escape = value => value.replaceAll('\\', '\\\\').replaceAll(',', '\\,').replaceAll(';', '\\;').replace(/\r?\n/g, '\\n');
  // Fold long UTF-8 lines without splitting a Korean character.
  const fold = line => {
    let result = '', bytes = 0;
    for (const char of line) {
      const size = new TextEncoder().encode(char).length;
      if (bytes + size > 75) { result += '\r\n '; bytes = 1; }
      result += char;
      bytes += size;
    }
    return result;
  };
  return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'BEGIN:VEVENT',
    `UID:ceremony-${stamp(event.startsAt)}@${host}`, `DTSTAMP:${stamp(now)}`, `DTSTART:${stamp(event.startsAt)}`,
    ...(event.endsAt ? [`DTEND:${stamp(event.endsAt)}`] : []),
    `SUMMARY:${escape(title)}`, `LOCATION:${escape(locationText)}`, 'END:VEVENT', 'END:VCALENDAR', ''].map(fold).join('\r\n');
}
