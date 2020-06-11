"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');








var _datefns = require('date-fns');

var _Appointment = require('../models/Appointment'); var _Appointment2 = _interopRequireDefault(_Appointment);

class AvailableService {
  async run({ provider_id, date }) {
    const appointments = await _Appointment2.default.findAll({
      where: {
        provider_id,
        canceled_at: null,
        date: {
          [_sequelize.Op.between]: [_datefns.startOfDay.call(void 0, date), _datefns.endOfDay.call(void 0, date)],
        },
      },
    });

    const schedule = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
    ];

    const available = schedule.map(time => {
      const [hour, minute] = time.split(':');
      const value = _datefns.setSeconds.call(void 0, _datefns.setMinutes.call(void 0, _datefns.setHours.call(void 0, date, hour), minute), 0);

      return {
        time,
        value: _datefns.format.call(void 0, value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        available:
          _datefns.isAfter.call(void 0, value, new Date()) &&
          !appointments.find(a => _datefns.format.call(void 0, a.date, 'HH:mm') === time),
      };
    });

    return available;
  }
}

exports. default = new AvailableService();
