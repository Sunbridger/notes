/**
 * node --experimental-modules esmodule.mjs 开起import模式了
 */
import t from './1.mjs';
import module from 'module'
console.log(t, 't')
import fs, { readFileSync } from 'fs';

fs.readFileSync = () => Buffer.from('Hello, ESM');

import DJSON from './data2.json'
console.log(DJSON, 'sss')
console.log(module.builtinModules)
