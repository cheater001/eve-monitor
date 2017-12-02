import { Action } from '@ngrx/store';
import { Killmail } from '../models/killmail';

export const ADD_KILLMAIL = '[Killmails] Add Killmail';
export const ADD_KILLMAIL_SUCCESS = '[Killmails] Add Killmail Success';
export const ADD_KILLMAIL_FAIL = '[Killmails] Add Killmail Fail';
export const LOAD = '[Killmails] Load';
export const LOAD_SUCCESS = '[Killmails] Load Success';
export const LOAD_FAIL = '[Killmails] Load Fail';

export class AddKillmail implements Action {
  readonly type = ADD_KILLMAIL;

  constructor(public payload: Killmail) {}
}

export class AddKillmailSuccess implements Action {
  readonly type = ADD_KILLMAIL_SUCCESS;

  constructor(public payload: Killmail) {}
}

export class AddKillmailFail implements Action {
  readonly type = ADD_KILLMAIL_FAIL;

  constructor(public payload: Killmail) {}
}

/**
 * Load Collection Actions
 */
export class Load implements Action {
  readonly type = LOAD;
}

export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;

  constructor(public payload: Killmail[]) {}
}

export class LoadFail implements Action {
  readonly type = LOAD_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddKillmail
  | AddKillmailSuccess
  | AddKillmailFail
  | Load
  | LoadSuccess
  | LoadFail;
