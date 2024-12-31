import { ToastPromiseParams, toast } from "react-toastify";
import debounce from "lodash.debounce";

export class DelayAPI {
	private timeout: number;
	private timeoutID: NodeJS.Timeout|undefined;
	private promise: Promise<void>|undefined;
	private cb: () => Promise<void>;
	private queueCb: ((value: unknown) => void);
	private toastID: string;
	private toastPromiseParams: ToastPromiseParams;
	private debouncedTrigger: () => void;

	constructor(timeout: number, toastID: string, toastPromiseParams: ToastPromiseParams) {
		this.timeout = timeout;
		this.queueCb = () => {
			// NOOP
		};
		this.cb = async () => {
			// NOOP
		};
		this.toastID = toastID;
		this.toastPromiseParams = toastPromiseParams;
		this.debouncedTrigger = debounce(() => {
			this.queue(this.cb);
		}, this.timeout);
	}

	queue(cb: () => Promise<void>) {
		clearTimeout(this.timeoutID);
		this.cb = cb;

		toast(this.toastParams);
		this.debouncedTrigger();
		if (!this.promise) {
			this.promise = new Promise((resolve) => {
				this.queueCb = resolve;
			}).then(() => this.cb()).then(() => {
				this.promise = undefined;
			});
			toast.promise(
				this.promise,
				this.toastPromiseParams,
				{
					toastId: this.toastID,
				}
			);
		}

		this.timeoutID = setTimeout(this.queueCb, this.timeout);
		return this.promise;
	}
}
