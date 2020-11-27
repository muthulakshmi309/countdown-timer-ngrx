import { createReducer, on } from "@ngrx/store";
import { setCountdown, update, reset } from "./countdown.actions";
import { Timer } from "./app.component.ts";

export const initialState: Timer = {
  hrs: 0,
  mins: 0,
  secs: 0,
  ms: 0
};

const _countdownReducer = createReducer(
  initialState,
  on(setCountdown, (state, timer: Timer) => ({
    hrs: timer.hrs,
    mins: timer.mins,
    secs: timer.secs,
    ms: timer.ms
  })),
  on(update, (state) =>  updateCountdown(state)),
  on(reset, state => initialState)
);

function updateCountdown(timer: Timer) {
  if (timer.ms) {
    timer.ms--;
  } else {
    timer.ms = 999;
    if (timer.secs) {
      timer.secs--;
    } else {
      timer.secs = 59;
      if (timer.mins) {
        timer.mins--;
      } else {
        timer.mins = 59;
        timer.hrs--;
      }
    }
  }
  return timer;
}

export function countdownReducer(state, action) {
  return _countdownReducer(state, action);
}

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/
