import {PEERTUBE_BASE_URL} from "../config";
import PeerTubeVideoTemplate from "./peertube-video.tmpl";

class PeerTubeVideo extends HTMLElement {
    constructor() {
        super();

        const video = this.getAttribute("video");
        const ratio = this.getAttribute("ratio") || "16/9";
        const classList = this.getAttribute("class");
        const title = this.getAttribute("title") || "";

        const clone = PeerTubeVideoTemplate.content.cloneNode(true) as HTMLElement;
        const iframe = clone.querySelector("iframe")!;

        if (video) {
            const videoId = video.startsWith("http")
                ? new URL(video).pathname.split("/").pop()
                : video;
            iframe.src = `${PEERTUBE_BASE_URL}/videos/embed/${videoId}`;
        }
        iframe.title = title;
        iframe.style.aspectRatio = ratio;
        if (classList) {
            iframe.classList.add(classList);
        }

        this.attachShadow({mode: "open"})
            .appendChild(clone);

    }
}

export default PeerTubeVideo;
