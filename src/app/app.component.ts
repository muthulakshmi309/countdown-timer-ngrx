import { Component, ViewChild, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { setCountdown, reset, update } from "./countdown.actions";

@Component({
  selector: "cntdown-timer",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @ViewChild("inpTimer", { static: false }) input;
  @ViewChild("startBtn", { static: false }) startBtn;
  @ViewChild("stopBtn", { static: false }) stopBtn;
  @ViewChild("pauseBtn", { static: false }) pauseBtn;
  @ViewChild("resumeBtn", { static: false }) resumeBtn;

  countdownTimer$;
  timerInterval;

  constructor(private store: Store<{ countdownTimer: Timer }>) {
    this.store.pipe(select("countdownTimer")).subscribe(st => {
      this.countdownTimer$ = st;
      // localStorage.setItem("countdown", this.countdownTimer$);
    });
  }

  ngOnInit() {
    let localStorageData = localStorage.getItem("countdown");
    let timer = localStorageData && JSON.parse(localStorageData);
    if (timer) {
      this.store.dispatch(setCountdown(timer));
    }
  }

  onInputChange() {
    this.setTimer();
  }

  getInputValue() {
    return this.input.nativeElement.value;
  }

  setTimer() {
    let inputValue = this.getInputValue();
    let time = this.convertToTime(inputValue);
    this.store.dispatch(setCountdown(time));
    localStorage.setItem("countdown", JSON.stringify(this.countdownTimer$));
    // this.store.pipe(setCountdown(time)).subscribe(st => {
    //   this.countdownTimer$ = st;
    // })
    // this.countdownTimer$ = this.convertToTime(inputValue);
  }

  convertToTime(timeStr: string): Timer {
    let timer;
    let timeArr = timeStr.split(":");
    timer = {
      hrs: Number(timeArr[0].trim()) || 0,
      mins: Number(timeArr[1].trim()) || 0,
      secs: Number(timeArr[2].trim()) || 0,
      ms: Number(timeArr[3].trim()) || 0
    };
    return timer;
  }

  startCountdown() {
    this.timerInterval = setInterval(() => {
      this.store.dispatch(update());
      localStorage.setItem("countdown", JSON.stringify(this.countdownTimer$));
      // if (this.timer.ms) {
      //   this.timer.ms--;
      // } else {
      //   this.timer.ms = 999;
      //   if (this.timer.secs) {
      //     this.timer.secs--;
      //   } else {
      //     this.timer.secs = 59;
      //     if (this.timer.mins) {
      //       this.timer.mins--;
      //     } else {
      //       this.timer.mins = 59;
      //       this.timer.hrs--;
      //     }
      //   }
      // }
    }, 1);
    this.startBtn.nativeElement.classList.add("hide");
    this.stopBtn.nativeElement.classList.remove("hide");
  }

  start() {
    this.startCountdown();

    this.resumeBtn.nativeElement.classList.add("hide");
    this.pauseBtn.nativeElement.classList.remove("hide");
  }

  stop() {
    this.pause();
    this.input.nativeElement.value = "";
    // this.timer = null;
    this.store.dispatch(reset());
    localStorage.setItem("countdown", JSON.stringify(this.countdownTimer$));
    this.startBtn.nativeElement.classList.remove("hide");
    this.stopBtn.nativeElement.classList.add("hide");
  }

  pause() {
    clearInterval(this.timerInterval);
    this.pauseBtn.nativeElement.classList.add("hide");
    this.resumeBtn.nativeElement.classList.remove("hide");
  }

  resume() {
    this.startCountdown();
    this.resumeBtn.nativeElement.classList.add("hide");
    this.pauseBtn.nativeElement.classList.remove("hide");
  }
}

export interface Timer {
  hrs: number;
  mins: number;
  secs: number;
  ms: number;
}
