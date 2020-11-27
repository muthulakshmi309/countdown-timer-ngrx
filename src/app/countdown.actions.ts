import { createAction } from '@ngrx/store';

export const setCountdown = createAction('[Countdown Component] setCountdown', (timer) => timer);
export const reset = createAction('[Countdown Component] reset');
export const update = createAction('[Countdown Component] update');

/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/