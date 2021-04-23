const { Tracer, BatchRecorder, jsonEncoder: { JSON_V2 }} = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const { HttpLogger } = require('zipkin-transport-http');
const axios = require('axios');

const ctxImpl = new CLSContext('zipkin');
const recorder = new BatchRecorder({
  logger: new HttpLogger({
    endpoint: 'http://www.sunbridger.site:9411/api/v2/spans',
    jsonEncoder: JSON_V2,
    headers: {
      'Authorization': 'secret',
      'Content-Type': 'application/json'
    }
  })
});
// endpoint: string,
//     httpInterval?: number,
//     jsonEncoder?: JsonEncoder,
//     timeout?: number,
//     maxPayloadSize?: number,
//     headers?: { [name: string]: string },
//     agent?: Agent | ((url: URL) => Agent),
//     log?: ErrorLogger

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const wrapAxios = require('zipkin-instrumentation-axiosjs');


const myMiddleWareForZipKin = (localServiceName) => {
  const tracer = new Tracer({
    ctxImpl, 
    recorder,
    localServiceName,
  });

  const zipkinAxios = wrapAxios(axios, { tracer });

  return {
    zipkinAxios,
    zipkinMiddleware: zipkinMiddleware({ tracer })
  };
}

module.exports = myMiddleWareForZipKin;

