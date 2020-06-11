"use strict";Object.defineProperty(exports, "__esModule", {value: true});class DefaultError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status;
  }
}

exports. default = DefaultError;
