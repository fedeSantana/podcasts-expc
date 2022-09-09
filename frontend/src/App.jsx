// @ts-check
import "./styles/main.scss";
import { podcasts as podcastsService } from "~/services/index";
import { useCallback, useEffect, useState } from "react";
import Podcast from "~/components/Podcast/index";
import Player from "~/components/Player/index";
import { produce } from "immer";
import { PODCAST_STATE } from "~/constants/index";
import { useInterval } from "~/utils/index";

/** @typedef {import("services/index").Podcast} Podcast */
/**
 * @typedef {{
 *   play: (x: Podcast) => void,
 *   pause: () => void,
 *   backTen: () => void,
 *   nextTen: () => void,
 *   setTime: (time: number) => void
 * }} Handlers
 * */

const audio = new Audio();

/**
 * @returns {[{ podcasts: Podcast[], selectedPodcast: Podcast }, Handlers]}
 */
function usePodcasts() {
  /** @type {[Podcast[], React.Dispatch<Podcast[]>]} */
  const [podcasts, setPodcasts] = useState([]);

  /** @type {[string, React.Dispatch<string>]} */
  const [selected, select] = useState("");

  useEffect(() => {
    podcastsService.getAll().then((podcasts) => {
      setPodcasts(podcasts);
    });
  }, []);

  const getPodcast = useCallback(
    /** @param {Podcast[]} podcasts */
    (podcasts) => podcasts.find((p) => p.guid === selected),
    [selected]
  );

  useInterval(() => {
    setPodcasts(
      produce(podcasts, (/** @type {Podcast[]} */ draft) => {
        const podcast = getPodcast(draft);
        if (podcast === undefined) return;
        podcast.time = audio.currentTime;
      })
    );
  }, 100);

  /** @type {Handlers} */
  const handlers = {
    play: async (podcast) => {
      setPodcasts(
        produce(podcasts, (draft) => {
          draft.forEach((p) => {
            switch (p.state) {
              case PODCAST_STATE.initial:
                p.state = PODCAST_STATE.initial;
                break;
              default:
                p.state = PODCAST_STATE.pause;
            }
          });
          const selected = draft.find((p) => p.guid === podcast.guid);
          selected.state = PODCAST_STATE.playing;
        })
      );
      select(podcast.guid);
      audio.setAttribute("src", podcast.link.getAttribute("url"));
      audio.currentTime = podcast.time;
      try {
        await audio.play();
      } catch (e) {
        console.warn(e);
      }
    },
    pause: () => {
      setPodcasts(
        produce(podcasts, (/** @type {Podcast[]} */ draft) => {
          const selected = getPodcast(draft);
          selected.state = PODCAST_STATE.pause;
          selected.time = audio.currentTime;
        })
      );
      audio.pause();
    },
    backTen: () => {
      setPodcasts(
        produce(podcasts, (/** @type {Podcast[]} */ draft) => {
          const selected = getPodcast(draft);
          selected.time -= 10;
          audio.currentTime = selected.time;
        })
      );
    },
    nextTen: () => {
      setPodcasts(
        produce(podcasts, (/** @type {Podcast[]} */ draft) => {
          const selected = getPodcast(draft);
          selected.time += 10;
          audio.currentTime = selected.time;
        })
      );
    },
    setTime: (time) => {
      setPodcasts(
        produce(podcasts, (/** @type {Podcast[]} */ draft) => {
          const selected = getPodcast(draft);
          selected.time = time;
          audio.currentTime = selected.time;
        })
      );
    },
  };

  const selectedPodcast = getPodcast(podcasts);

  return [{ podcasts, selectedPodcast }, handlers];
}

function App() {
  const [{ podcasts, selectedPodcast }, handlers] = usePodcasts();

  return (
    <div className="App">
      <div className="podcasts-container">
        {podcasts.map((podcast, index) => (
          <Podcast
            handlers={handlers}
            podcast={podcast}
            index={index}
            key={podcast.guid}
          />
        ))}
      </div>
      <Player podcast={selectedPodcast} handlers={handlers} />
    </div>
  );
}

export default App;
