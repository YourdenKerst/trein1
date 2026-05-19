import { useState, useEffect } from 'react';

const cache = {};

export function useWikiImage(wikiTitle) {
  const [url, setUrl] = useState(cache[wikiTitle] ?? null);

  useEffect(() => {
    if (!wikiTitle) return;
    if (cache[wikiTitle] !== undefined) { setUrl(cache[wikiTitle]); return; }

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiTitle)}`)
      .then(r => r.json())
      .then(data => {
        const src = data?.thumbnail?.source ?? null;
        cache[wikiTitle] = src;
        setUrl(src);
      })
      .catch(() => {
        cache[wikiTitle] = null;
        setUrl(null);
      });
  }, [wikiTitle]);

  return url;
}
