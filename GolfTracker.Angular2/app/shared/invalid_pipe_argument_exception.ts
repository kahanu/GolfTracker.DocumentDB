import {Type, stringify} from '@angular/common/src/facade/lang';
import {BaseException} from '@angular/common/src/facade/exceptions';

export class InvalidPipeArgumentException extends BaseException {
  constructor(type: Type, value: Object) {
    super(`Invalid argument '${value}' for pipe '${stringify(type)}'`);
  }
}