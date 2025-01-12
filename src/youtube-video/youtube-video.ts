import YouTubeVideoTemplate from "./youtube-video.tmpl";

class YoutubeVideo extends HTMLElement {
    constructor() {
        super();

        const video = this.getAttribute("video");
        const ratio = this.getAttribute("ratio") || "16/9";
        const classList = this.getAttribute("class");
        const title = this.getAttribute("title") || "";

        const clone = YouTubeVideoTemplate.content.cloneNode(true) as HTMLElement;
        const iframe = clone.querySelector("iframe")!;

        if (video) {
            const videoId = video.startsWith("http")
                ? new URL(video).pathname.split("/").pop()
                : video;
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
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

export default YoutubeVideo;
