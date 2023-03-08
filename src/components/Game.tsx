import {useState, useCallback} from 'react'
import randomWords from 'random-words';
import useEventListener from '@use-it/event-listener';
import Letter from './Letter';
import Keyboard from './Keyboard';
import Person from './Person';

export default function Game() {
    const [word, setWord] = useState<string>(randomWords(1)[0]);
    const [guessed, setGuessed] = useState<string[]>([]);
    const [guessNumber, setGuessNumber] = useState<number>(-1);
    const [gameOver, setGameOver] = useState<boolean>(false);

    const handleGuess = useCallback((key: string) => {
        if(!guessed.includes(key)) {
            setGuessed([...guessed, key]);
            if (!word.includes(key)) {
                setGuessNumber(() => {
                    if(guessNumber + 1 === 6) {
                        setGameOver(true);
                    }
                    return guessNumber + 1
                });
            }
        }

        console.log('guess', guessNumber);
    }, [setGuessed, guessed, word, guessNumber]);

    const detectKeyDown = useCallback(
        (e: KeyboardEvent) => {
            console.log('hello', e.key);
            handleGuess(e.key);
        }, [handleGuess]);

    useEventListener("keydown", detectKeyDown);

    const reset = () => {
        setWord(randomWords(1)[0]);
        setGuessed([]);
        setGuessNumber(-1);
        setGameOver(false);
    };

  return (
    <div>
        <Person guessNumber={guessNumber}/>
        {word.split('').map((letter, i) => {
            return <Letter key={i} value={letter} visible={gameOver || guessed.includes(letter)}/>
        })}
        <Keyboard handleGuess={handleGuess} guessed={guessed}/>
        {gameOver && <button onClick={reset}>New Game?</button>}
    </div>
  )
}
