type Props = {
  handleGuess: (key: string) => void;
  guessed: string[];
}

export default function Keyboard({handleGuess, guessed}: Props) {
  const letters = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];
  const onClick = (letter: string) => {
    handleGuess(letter);
  }
  return (
    <div className='keyboard'>
      {letters.map((row, i) => {
        return (
          <div key={i}> 
            {row.map((letter, j) => {
              const isGuessed = guessed.includes(letter);
              return (
                <button 
                  onClick={() => onClick(letter)}
                  className={`keyboardBtn ${isGuessed && 'guessed'}`}
                  key={j}
                  disabled={isGuessed}>{letter}
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}