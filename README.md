# theme-paperwhite.jsume

A clean and elegant **[Jsume](https://github.com/jsume)** theme featuring a minimal black-and-white color scheme.

<a href="https://demo-paperwhite-jsume.netlify.app/">
  <img width="3840" height="2160" alt="theme-paperwhite" src="https://github.com/user-attachments/assets/d748e591-d372-42fc-a3ae-de2fff03143f" />
</a>

<p align="center"><a href="https://demo-paperwhite-jsume.netlify.app/">Live Demo</a></p>

## Features

- **Powered by [Jsume](https://github.com/jsume)** — build your resume using simple JSON
- **GitHub Gist integration** — use Gist as a free and convenient data store
- **Server-side rendering (SSR)** — faster load times and better SEO
- **Responsive design** — looks great on both desktop and mobile
- **Fullscreen mode** — focus on what matters most
- **Zoom controls** — adjust text size to your preference
- **Drawing mode** — annotate during presentations or interviews
- **Keyboard shortcuts**
- **Multi-language support**, including:
  - English
  - 简体中文
  - 繁體中文 (HK)
  - 繁體中文 (TW)
  - 日本語
  - Español
  - Français
  - Deutsch
  - Русский
  - 한국어

For a regular static website, you need to redeploy it every time you make changes to the content.
However, this solution only requires updating the Jsume JSON file on Gist directly — the webpage will automatically updates with the latest data.

## Usage

### Keyboard Shortcuts

#### Menu

- <kbd>M</kbd> : toggle menu
- <kbd>ESC</kbd> : close menu

#### Fullscreen

- <kbd>F</kbd> : toggle fullscreen mode
- <kbd>ESC</kbd> : exit fullscreen mode

#### Zoom

- <kbd>I</kbd> : zoom in
- <kbd>O</kbd> : zoom out
- <kbd>U</kbd> : reset zoom

#### Drawing

- <kbd>P</kbd> : toggle drawing mode
- <kbd>ESC</kbd> : exit drawing mode
- <kbd>C</kbd> : clear drawings
- <kbd>L</kbd> : line
- <kbd>A</kbd> : arrow tool
- <kbd>D</kbd> : draw
- <kbd>S</kbd> : stylus
- <kbd>R</kbd> : rectangle
- <kbd>E</kbd> : ellipse
- <kbd>X</kbd> : erase
- <kbd>-</kbd> : decrease brush size
- <kbd>=</kbd> : increase brush size
- <kbd>⌘Z</kbd> / <kbd>^Z</kbd> : undo
- <kbd>⌘⇧Z</kbd> / <kbd>^⇧Z</kbd> : redo
- <kbd>1</kbd> , ... , <kbd>7</kbd> : color presets

## Deployment

### 1. Create a Gist

Create a [GitHub Gist](https://gist.github.com/) to store your Jsume JSON files.

Supported file names:

- `en-US.jsume.json`
- `zh-CN.jsume.json`
- `zh-HK.jsume.json`
- `zh-TW.jsume.json`
- `ja-JP.jsume.json`
- `es-ES.jsume.json`
- `fr-FR.jsume.json`
- `de-DE.jsume.json`
- `ru-RU.jsume.json`
- `ko-KR.jsume.json`

Each file name corresponds to a locale.
You can include multiple files to support multiple languages.
Check out the example Gist [here](https://gist.github.com/moo-w/787bff4db91d283c50ee9c691698561b).

The content of each file should be a valid Jsume JSON structure which you can find in the documentation of [@jsume/schemas](https://github.com/jsume/jsume/blob/main/packages/schemas/README.md#jsumeschemashttps://github.com/jsume/jsume/blob/main/packages/schemas/README.md#jsumeschemas).
You can easily generate and validate a Jsume JSON file using the [@jsume/cli](https://github.com/jsume/jsume/blob/main/packages/cli/README.md#jsumecli).

### 2. Deploy

You can **use this repository as a template** — making it easy to [sync updates](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork) from the source repo in the future.

Click the "Use this template" button at the top of this page to create a new repository based on this one.

> [!NOTE]
> Check out GitHub's documentation on "[Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)"

Then, follow the deployment instructions for your chosen platform:

[Deploy a Nuxt App](https://nuxt.com/deploy)

### 3. Set Environment Variables

There are several environment variables you need to set for the application to work correctly.

| Key | Description | Example |
| :-- | :-- | :-- |
| `NUXT_PUBLIC_DEFAULT_LOCALE` | Default display language | `en-US` |
| `NUXT_PUBLIC_GIST_ID` | ID of your Gist storing Jsume JSON files | `787bff4db91d283c50ee9c691698561b` |
| `NUXT_PUBLIC_GITHUB_ACCESS_TOKEN` | Github Personal Access Token (**optional**, for private Gists or higher rate limits) |  |
| `SERVER_PRESET` | Build target for Nuxt | `netlify_edge`,  `vercel_edge`, ... |

> [!IMPORTANT]
> `SERVER_PRESET` sets the building preset for Nuxt. For example, if you are [deploying to Netlify](https://nuxt.com/deploy/netlify#netlify-edge-functions), set it to `netlify_edge`. It's equivalent to running `nuxt build --preset=netlify_edge` command.

You can use with or without GitHub access token. However, to access private gists, you need to provide a GitHub access token. It is recommended to provide it, because authenticated requests have a [higher rate limit](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api).

> [!NOTE]
> Check out GitHub's documentation on "[Creating a fine-grained personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)"

## Credits

- [antfu/resume](https://github.com/antfu/resume)
- [JSON Resume](https://github.com/jsonresume)

## License

[MIT](./LICENSE) License © 2025–Present [Moozon Wei](https://github.com/moo-w)
