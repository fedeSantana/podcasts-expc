// @ts-check
import PlayButton from "~/components/PlayButton/index";
import { PODCAST_STATE } from "~/constants";
import "./style.css";

/**
 * @param {{podcast: import("services/index").Podcast, index: number, handlers: import("App").Handlers }} props
 */
export default function Podcast({ index, podcast, handlers }) {
  const {
    state,
    time,
    duration,
    artwork,
    date,
    title,
    description,
    materialLink,
  } = podcast;


  const timeLeft = duration - time;
  const timeAngle = (time / duration) * 360;

  return (
    <div className="podcastCard" id={`podcast-${index}`}>
      <div className="podcastCard__artworkContainer">
        <img className="podcastCard__artwork" src={artwork} alt="" />
      </div>
      <div className="podcastCard__container">
        <p className="podcastCard__date">{date}</p>
        <h3 className="podcastCard__title">{title}</h3>
        <p className="podcastCard__description">{description}</p>
        <div className="podcastCard__buttons">
          {materialLink && (
            <button className="ilo-button ilo-button--contained yourRippleEffectClass">
              <a
                href={materialLink}
                download
                target="_blank"
                rel="noreferrer"
                type="button"
              >
                <svg
                  className="ilo-button-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M16.59 9H15V4C15 3.45 14.55 3 14 3H10C9.45 3 9 3.45 9 4V9H7.41C6.52 9 6.07 10.08 6.7 10.71L11.29 15.3C11.68 15.69 12.31 15.69 12.7 15.3L17.29 10.71C17.92 10.08 17.48 9 16.59 9ZM5 19C5 19.55 5.45 20 6 20H18C18.55 20 19 19.55 19 19C19 18.45 18.55 18 18 18H6C5.45 18 5 18.45 5 19Z"
                    fill="white"
                  />
                </svg>
                <div className="ilo-button__ripple contained" />
                <span className="ilo-button__label"> material docente </span>
              </a>
            </button>
          )}

          <PlayButton
            play={() =>
              state === PODCAST_STATE.playing
                ? handlers.pause()
                : handlers.play(podcast)
            }
            number={index}
            state={state}
            duration={duration}
            timeLeft={timeLeft}
            timeAngle={timeAngle}
          />
        </div>
      </div>
    </div>
  );
}
