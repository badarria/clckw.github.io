const luxon = require("luxon");
const { DateTime } = luxon;

const getBeginEnd = (date, hours, service_time) => {
  let begin = DateTime.fromJSDate(date)
    .set({
      hours: 0,
      minutes: 0,
      seconds: 0,
    })
    .plus({ hours: hours.split(":")[0] })
    .toJSDate();
  const interval = service_time;
  const end = DateTime.fromJSDate(begin).plus({ hours: interval }).toJSON();
  begin = DateTime.fromJSDate(begin).toJSON();
  return { end, begin };
};

module.exports = getBeginEnd;
