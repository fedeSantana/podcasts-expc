// @ts-check
import { PODCAST_STATE } from "~/constants/index";
import Finished from "~/assets/icons/PlayButton/finished";
import Initial from "~/assets/icons/PlayButton/initial";
import Pause from "~/assets/icons/PlayButton/pause";
import Playing from "~/assets/icons/PlayButton/playing";

/** Object with the Icons from playButton */
const ICONS = {
  initial: Initial,
  playing: Playing,
  finished: Finished,
  /**
   * @param {number} angle
   * @param {number} size
   * @param {number} radius
   */
  pause: (angle, size, radius) => Pause({ angle, size, radius }),
};

/**
 * @param {{
 *   number: number,
 *   ariaLabel?: string,
 *   label: string,
 *   icon: JSX.Element,
 *   onClick: Function
 * }} param0
 */
const Button = ({ number, ariaLabel, label, icon, onClick }) => (
  <button
    onClick={() => onClick()}
    id={`playButton-${number}`}
    className={"ilo-button ilo-button--outlined yourRippleEffectClass"}
    aria-label={ariaLabel}
    type="button"
  >
    {icon}
    <span className="ilo-button__label">{label}</span>
  </button>
);

/**
 * @param {{
 *   play: Function,
 *   number: number,
 *   state: string,
 *   duration: number,
 *   timeLeft: number,
 *   timeAngle: number
 * }} props
 * @returns
 */
export default function PlayButton({
  play,
  number,
  state,
  duration,
  timeLeft,
  timeAngle,
}) {
  /** @typedef {{label: string, icon: JSX.Element, ariaLabel?: string}} ButtonProps */

  const durationMinutes = Math.floor(duration / 60);
  const timeLeftMinutes = Math.floor(timeLeft / 60);

  /** @type {Object<string, ButtonProps>} */
  const buttonProps = {
    [PODCAST_STATE.initial]: {
      label: ` ${durationMinutes} minutos`,
      icon: ICONS.initial(),
      ariaLabel: "play podcast",
    },
    [PODCAST_STATE.pause]: {
      label: ` quedan ${timeLeftMinutes} minutos`,
      icon: ICONS.pause(timeAngle, 24, 9.09),
      ariaLabel: "play podcast",
    },
    [PODCAST_STATE.stopped]: {
      label: ` quedan ${timeLeftMinutes} minutos`,
      icon: ICONS.pause(timeAngle, 24, 9.09),
      ariaLabel: "play podcast",
    },
    [PODCAST_STATE.playing]: {
      label: " reproduciendo",
      icon: ICONS.playing(),
    },
    [PODCAST_STATE.finished]: {
      label: " finalizado",
      icon: ICONS.finished(),
    },
  };

  return (
    <Button onClick={() => play()} number={number} {...buttonProps[state]} />
  );
}
