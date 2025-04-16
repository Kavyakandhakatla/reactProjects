import { Howl } from 'howler';

// Create sound instances
const clickSound = new Howl({
  src: ['/sounds/click.mp3'],
  volume: 0.5,
  preload: true
});

const winSound = new Howl({
  src: ['/sounds/win.mp3'],
  volume: 0.7,
  preload: true
});

const drawSound = new Howl({
  src: ['/sounds/draw.mp3'],
  volume: 0.5,
  preload: true
});

// Export sound functions
export const playClickSound = () => {
  clickSound.play();
};

export const playWinSound = () => {
  winSound.play();
};

export const playDrawSound = () => {
  drawSound.play();
};
