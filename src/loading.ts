import type { Ora } from "ora";
import ora from "ora";

let spinner: Ora;
export function startLoading() {
  spinner = ora("正在努力的回答中 请稍等\r").start();
}

export function stopLoading() {
  spinner.stop();
}
