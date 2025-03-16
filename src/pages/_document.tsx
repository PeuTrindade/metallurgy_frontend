import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css" />
      <script src="https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js" defer></script>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
