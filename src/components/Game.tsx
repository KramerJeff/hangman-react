import {useState, useCallback} from 'react'
import randomWords from 'random-words';
import useEventListener from '@use-it/event-listener';
import Letter from './Letter';
import Keyboard from './Keyboard';
import Person from './Person';

export default function Game() {

    //handle input
    //show guessed letters
    //set letters visibility?
    console.log('render');
    const [word, setWord] = useState<string>(randomWords(1)[0]); //I want to try and not make the Game component re-render... ?
    const [guessed, setGuessed] = useState<string[]>([]);
    const [guessNumber, setGuessNumber] = useState(-1);

    const handleGuess = useCallback((key: string) => {
        if(!guessed.includes(key)) {
            setGuessed([...guessed, key]);
        }
        if(!word.includes(key)) {
          setGuessNumber(() => guessNumber+1);
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
    };

  return (
    <div>
        {/* hangman figure */}
        <Person guessNumber={guessNumber}/>
        {word.split('').map((letter, i) => {
            return <Letter key={i} value={letter} visible={guessed.includes(letter)}/>
        })}
        <Keyboard handleGuess={handleGuess} guessed={guessed}/>
        <button onClick={reset}>Reset</button>
    </div>
  )
}
