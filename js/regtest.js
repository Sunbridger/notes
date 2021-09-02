const url = '/jarvis/search/asdas/?p=9';

var regex = /^\/[^\/]*\//;

const matchURL = url?.match(regex)?.[0];

const pathUrl = url?.split(matchURL)?.[1];

const serviceName = matchURL?.replace(/\//g, '');


console.log(serviceName, pathUrl);