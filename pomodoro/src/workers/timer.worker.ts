/* eslint-disable no-restricted-globals */
import {
    MessageReady,
    MessageTick,
    SetupTimerMessage,
    StartTimerMessage,
    TimerStoppedMessage,
    TimerTypes,
    TimerWorkerMessage,
} from "../types/timer";

const worker = () => {
    class Timer {
        interval: null | ReturnType<typeof setInterval> | null;
        duration: number | null;
        startAt: null | number;
        now: null | number;
        type: null | TimerTypes;

        constructor() {
            this.interval = null;
            this.duration = null;
            this.startAt = null;
            this.now = null;
            this.type = null;
        }

        stopTimer() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }

            this.now = null;
            this.startAt = null;
        }

        setupTimer({ duration, type }: SetupTimerMessage["payload"]) {
            this.duration = duration;
            this.type = type;
        }

        startTimer({ startAt }: StartTimerMessage["payload"]) {
            if (this.interval) return;
            this.startAt = startAt;

            this.interval = setInterval(() => {
                this.now = new Date().getTime();
                this.tick();
            }, 1000);
        }

        tick() {
            const message: MessageTick = {
                event: "tick",
                payload: this.countdown,
            };
            self.postMessage(message);

            if (this.countdown <= 0) {
                this.stopTimer();
            }
        }

        get countdown() {
            if (
                this.duration == null ||
                this.now == null ||
                this.startAt == null
            ) {
                return 0;
            }

            return Math.round(this.duration - (this.now - this.startAt) / 1000);
        }

        get percentage() {
            return 100 - (100 * this.countdown) / (this.duration ?? 1);
        }
    }

    const timer = new Timer();

    self.onmessage = (message: MessageEvent<TimerWorkerMessage>) => {
        switch (message.data.event) {
            case "setupTimer":
                timer.setupTimer(message.data.payload);
                break;

            case "startTimer": {
                timer.startTimer(message.data.payload);
                break;
            }
            case "stopTimer": {
                timer.stopTimer();
                break;
            }
            default:
                break;
        }
    };
};

const workerString = worker.toString();

const blobWorker = new Blob(
    [
        workerString.substring(
            workerString.indexOf("{") + 1,
            workerString.lastIndexOf("}") - 1
        ),
    ],
    { type: "application/javascript" }
);

export default blobWorker;
