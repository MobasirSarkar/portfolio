export type SlideOffset = {
  readonly x: number;
  readonly y: number;
  readonly rotate: number;
};

export type SlideVars = SlideOffset & {
  readonly opacity: number;
  readonly duration: number;
  readonly delay: number;
  readonly ease: string;
};

export type WipeVars = {
  readonly clipPath: string;
  readonly duration: number;
  readonly delay: number;
  readonly ease: string;
};
