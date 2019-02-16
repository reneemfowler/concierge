import { assign, reduce } from 'lodash';
import { Adapter, AdapterFunction } from './adapters';

export interface LogData {
  [k: string]: string;
}

export type LogFunction = (domain: string, msg: string, data?: LogData) => void;

export type DomainLogFunction = (msg: string, data?: LogData) => void;

export interface Logger {
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
  debug: LogFunction;
}

export interface DomainLogger {
  info: DomainLogFunction;
  warn: DomainLogFunction;
  error: DomainLogFunction;
  debug: DomainLogFunction;
}

export function logWith(adapter: AdapterFunction): LogFunction {
  return (domain, msg, data = {}) => {
    data = assign({ msg }, data);
    const msgs = reduce<LogData, Array<[string, string]>>(data, (acc, v, k) => {
      acc.push([`${domain}:${k}`, v]);
      return acc;
    }, []);
    msgs.forEach(([prefix, msg]) => adapter(prefix, msg));
  };
}

export function makeLogger(adapter: Adapter): Logger {
  return {
    info: logWith(adapter.info),
    warn: logWith(adapter.warn),
    error: logWith(adapter.error),
    debug: logWith(adapter.debug)
  };
}

export function makeDomainLogger(adapter: Adapter, domain: string): DomainLogger {
  const { info, warn, error, debug } = makeLogger(adapter);
  return {
    info: info.bind(null, domain),
    warn: warn.bind(null, domain),
    error: error.bind(null, domain),
    debug: debug.bind(null, domain)
  };
}
