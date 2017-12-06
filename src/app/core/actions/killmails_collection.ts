import { Action } from '@ngrx/store';
import { Killmail } from '../models/killmail';

export const ADD_KILLMAILS         = '[Killmails] Add Killmails';
export const ADD_KILLMAILS_SUCCESS = '[Killmails] Add Killmails Success';
export const ADD_KILLMAILS_FAIL    = '[Killmails] Add Killmails Fail';

export const LOAD = '[Killmails] Load';
export const LOAD_SUCCESS = '[Killmails] Load Success';
export const LOAD_FAIL = '[Killmails] Load Fail';

export const GET = '[Killmails] Get';
export const GET_SUCCESS = '[Killmails] Get Success';
export const GET_FAIL = '[Killmails] Get Fail';

export class AddKillmails implements Action {
  readonly type = ADD_KILLMAILS;

  constructor(public payload: Killmail[]) {}
}

export class AddKillmailsSuccess implements Action {
  readonly type = ADD_KILLMAILS_SUCCESS;

  constructor(public payload: number[]) {}
}

export class AddKillmailsFail implements Action {
  readonly type = ADD_KILLMAILS_FAIL;

  constructor(public payload: Killmail[]) {}
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

/**
 * Get Collection Actions
 */
export class Get implements Action {
  readonly type = GET;

  constructor(public payload: any) {}
}

export class GetSuccess implements Action {
  readonly type = GET_SUCCESS;

  constructor(public payload: Killmail[]) {}
}

export class GetFail implements Action {
  readonly type = GET_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | AddKillmails
  | AddKillmailsSuccess
  | AddKillmailsFail
  | Load
  | LoadSuccess
  | LoadFail
  | Get
  | GetSuccess
  | GetFail;
