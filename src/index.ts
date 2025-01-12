import PeerTubeVideo from "./peertube-video/peertube-video";
import YouTubeVideo from "./youtube-video/youtube-video";
import {ELEMENTS_PREFIX} from "./config";

customElements.define(`${ELEMENTS_PREFIX}-peertube-video`, PeerTubeVideo)
customElements.define(`${ELEMENTS_PREFIX}-youtube-video`, YouTubeVideo)

if (process.env.NODE_ENV === "development") {
    if (module && module.hot) {
        module.hot.accept();
    }
}
