import type { SlideOffset, SlideVars } from "@/types/animations";
import { Position } from "@/types/positions";


export const slideOffsets  = {
  [Position.Top]: {
    x: 0,
    y: -70,
    rotate: 0,
  },
  [Position.Bottom]: {
    x: 0,
    y: 70,
    rotate: 0,
  },
  [Position.Left]: {
    x: -70,
    y: 0,
    rotate: -2,
  },
  [Position.Right]: {
    x: 70,
    y: 0,
    rotate: 2,
  },
  }as const satisfies Record<
    Exclude<Position, Position.Wipe>,
    SlideOffset
  >;


export const getSlideVars = (
  from: Exclude<Position, Position.Wipe>,
  delay = 0,
): SlideVars => ({
  opacity: 0,
  ...slideOffsets[from],
  duration: 0.85,
  delay,
  ease: "power3.out",
});
