export default function (_, res) {
  res.sendFile(new URL('../../public/index.html', import.meta.url).pathname);
}