const { Tracer, BatchRecorder, jsonEncoder: { JSON_V2 }} = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const { HttpLogger } = require('zipkin-transport-http');
const { expressMiddleware } = require('zipkin-instrumentation-express');
const { koaMiddleware } = require('zipkin-instrumentation-koa');
const wrapAxios = require('zipkin-instrumentation-axiosjs');
const axios = require('axios');

const CONFIG = {
  express: expressMiddleware,
  koa: koaMiddleware
};

const ctxImpl = new CLSContext('zipkin');
const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: 'http://www.sunbridger.site:9411/api/v2/spans',
    jsonEncoder: JSON_V2,
    headers: {
      'Authorization': 'secret',
      'Content-Type': 'application/json',
    },
  })
});

const myMiddleWareForZipKin = (localServiceName, type = 'express') => {
  const tracer = new Tracer({
    ctxImpl, 
    recorder,
    localServiceName,
  });

  const zipkinAxios = (type) => (url, options) => new Promise((resolve, reject) => {
    wrapAxios(axios, { tracer })[type](url, options).then((res = {}) => {
      const { data: response, status, statusText, config = {} } = res;
      resolve({
        response,
        status,
        statusText,
        traceId: config?.traceId?._traceId,
      });
    });
  });

  return {
    get: zipkinAxios('get'),
    post: zipkinAxios('post'),
    zipkinMiddleware: CONFIG[type]({ tracer })
  };
}

module.exports = myMiddleWareForZipKin;

