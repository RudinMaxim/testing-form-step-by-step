import style from './Timer.module.scss';
import { useTimer } from "./useTimer";

export interface TimerProps {
  durationInSeconds: number;
  testCompleted: boolean;
  stopTimer: () => void;
}


export function Timer(props: TimerProps) {
  const { formatTime, timeLeft } = useTimer(props);

  return (
    <time className={style.timer}>{formatTime(timeLeft)}</time>
  )
}
