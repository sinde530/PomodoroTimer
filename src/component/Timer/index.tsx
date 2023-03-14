import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

export const Container = styled.div({
    width: '400px',
    height: '400px',
    border: '4px solid #fff',
    borderRadius: '100%',
    position: 'relative',
    background: '#fff',
});

export const Box = styled.div({
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    color: '#000',
    top: '50%',
    left: '50%',
});

export default function Timer() {
    const [time, setTime] = useState<number>(25 + 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isBreak, setIsBreak] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: number | undefined;

        const startInterval = () => {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        };

        const resetTimer = () => {
            setIsActive(false);
            setIsBreak((prevIsBreak) => prevIsBreak);
            setTime(isBreak ? 5 * 60 : 25 * 60);
        };

        if (isActive && time > 0) {
            startInterval();
        } else if (isActive && time === 0) {
            resetTimer();
        }
        return () => clearInterval(intervalId);
    }, [time, isActive, isBreak]);

    const handleStartStop = () => {
        setIsActive((prevIsActive) => !prevIsActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setIsBreak(false);
        setTime(25 * 60);
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Container>
            <Box>
                <h1>{isBreak ? 'Break' : 'pomodoro'}</h1>
                <h2>{formatTime()}</h2>
                <button type="button" onClick={handleStartStop}>
                    {isActive ? 'Stop' : 'Start'}
                </button>
                <button type="button" onClick={handleReset}>
                    Reset
                </button>
            </Box>
        </Container>
    );
}
