import ArcIcon from "~/components/ArcIcon/index";

/**
 * @typedef {Object} PauseProps
 * @property {!number} angle Angle from 0 to 359.
 * @property {!number} size The size of the element
 * @property {!number} radius The diameter of the circunference
 */

/**
 * @param {PauseProps} param0
 * @returns
 */
export default function Pause({ angle, size, radius }) {
  return (
    <svg
      className="ilo-button-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-label="play podcast"
    >
      <ArcIcon angle={angle} size={size} radius={radius} />
      <path
        d="M15.6359 11.9998L10.1814 15.9362V8.06348L15.6359 11.9998Z"
        fill="#0078D4"
      />
    </svg>
  );
}
