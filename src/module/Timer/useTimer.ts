import { useEffect, useState } from 'react';
import { TimerProps } from './TimerViwe';

export function useTimer({
	durationInSeconds,
	testCompleted,
	stopTimer,
}: TimerProps) {
	const [timeLeft, setTimeLeft] = useState(durationInSeconds);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds
			.toString()
			.padStart(2, '0')}`;
	};

	useEffect(() => {
		if (!testCompleted) {
			const intervalId = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [testCompleted]);

	useEffect(() => {
		if (timeLeft === 0) {
			stopTimer();
		}
	}, [timeLeft, stopTimer]);



	return {
		timeLeft,
		formatTime,
		stopTimer,
	};
}
