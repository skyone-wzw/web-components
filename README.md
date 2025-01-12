# Web Components

![LICENSE MIT](https://img.shields.io/github/license/skyone-wzw/web-components)

Some self-used web components. Packaged by webpack + babel + typescript.
Zero runtime dependencies.

Now includes:

* [PeerTubeVideo](/src/peertube-video/peertube-video.ts)

```html
<so-peertube-video video="a5ea9b1c-5bbe-4ad2-b9ee-a36a70513ce9" title="如果 - 星尘"></so-peertube-video>
```

* [YoutubeVideo](/src/youtube-video/youtube-video.ts)

```html
<so-youtube-video video="eGlf8cGHp2o" title="A Day in Kivotos"></so-youtube-video>
```

PR welcome.

## Build Guide

```bash
npm run build
```

The `dist/web-components.html` should be inserted into your html `<head>` tag.

## Develop Guide

```bash
cp public/index.html.example public/index.html
cp .env.example .env
npm run start
```

Then create or modify components in `src` directory.

Add a new component in `src` directory, and import it in `src/index.ts`.

```js
import NewComponent from './new-component/new-component';

customElements.define(`${ELEMENTS_PREFIX}-new-component`, NewComponent);
```

Then add the new component in `index.html`.

## License

[MIT](LICENSE)
