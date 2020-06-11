"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ioredis = require('ioredis'); var _ioredis2 = _interopRequireDefault(_ioredis);

var _redis = require('../config/redis'); var _redis2 = _interopRequireDefault(_redis);

const keyPrefix = 'cache:';

class Cache {
  constructor() {
    this.redis = new (0, _ioredis2.default)({
      host: _redis2.default.host,
      port: _redis2.default.port,
      keyPrefix,
    });
  }

  set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`${keyPrefix}${prefix}:*`);

    if (keys.length <= 0) return 0;

    const keysWithoutPrefix = keys.map(key => key.replace(keyPrefix, ''));

    return this.redis.del(keysWithoutPrefix);
  }

  async truncate() {
    const allKeys = await this.redis.keys('*');

    if (allKeys.length <= 0) return 0;

    return this.redis.del(allKeys);
  }
}

exports. default = new Cache();
