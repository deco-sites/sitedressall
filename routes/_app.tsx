import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { Context } from "deco/deco.ts";
import Theme from "../sections/Theme/Theme.tsx";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/berthold-akzidenz-grotesk.otf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/berthold-akzidenz-grotesk-light.otf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/berthold-akzidenz-grotesk-medium.otf")}
        />

        <link
          rel="preload"
          type="text/css"
          href={asset("/fonts/berthold-akzidenz-grotesk-bold.otf")}
        />

        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: "berthold";
              src: url(${
              asset("/fonts/berthold-akzidenz-grotesk.otf")
            }) format("opentype");
              font-weight: 400;
            }

            @font-face {
              font-family: "berthold";
              src: url(${
              asset("/fonts/berthold-akzidenz-grotesk-bold.otf")
            }) format("opentype");
              font-weight: 700;
            }

            @font-face {
              font-family: "berthold";
              src: url(${
              asset("/fonts/berthold-akzidenz-grotesk-medium.otf")
            }) format("opentype");
              font-weight: 500;
            }

            @font-face {
              font-family: "berthold";
              src: url(${
              asset("/fonts/berthold-akzidenz-grotesk-light.otf")
            }) format("opentype");
              font-weight: 300;
            }
            `,
          }}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
