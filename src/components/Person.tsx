import {useEffect, useRef} from 'react'

type Props = {
  guessNumber: number
}

export default function Person({guessNumber}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(canvas) {
      const context = canvas.getContext('2d');
      if(context) {
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 10;
        draw(context, guessNumber, canvas);
      }
    }
  }, [guessNumber]);

  function draw(context: CanvasRenderingContext2D, guessNumber: number, canvas: HTMLCanvasElement) {
    switch(guessNumber) {
      case -1: //clear
        context.clearRect(0, 0, canvas.width, canvas.height);
        break;
      case 0: //gallows
        context.beginPath();
        context.moveTo(175, 225);
        context.lineTo(5, 225);
        context.moveTo(40, 225);
        context.lineTo(25, 5);
        context.lineTo(100, 5);
        context.lineTo(100, 25);
        context.stroke();
        break;
      case 1: //head
        context.lineWidth = 5;
        context.beginPath();
        context.arc(100, 50, 25, 0, Math.PI * 2, true);
        context.closePath();
        context.stroke();
        break;
      case 2: //body
        context.beginPath();
        context.moveTo(100, 75);
        context.lineTo(100, 140);
        context.stroke();
        break;
      case 3: //right arm
        context.beginPath();
        context.moveTo(100, 85);
        context.lineTo(60, 100);
        context.stroke();
        break;
      case 4: //left arm
        context.beginPath();
        context.moveTo(100, 85);
        context.lineTo(140, 100);
        context.stroke();
        break;
      case 5: //right leg
        context.beginPath();
        context.moveTo(100, 140);
        context.lineTo(80, 190);
        context.stroke();
        break;
      case 6: //left leg
        context.beginPath();
        context.moveTo(100, 140);
        context.lineTo(125, 190);
        context.stroke();
        break;
    }
  }

  return (
    <canvas ref={canvasRef} height="250"></canvas>
  )
}
