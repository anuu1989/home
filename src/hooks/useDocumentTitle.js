import { useEffect } from 'react';

const SITE_NAME = 'Anurag Vaidhya';

/**
 * Sets a per-route document title (falls back to the site default on unmount)
 * so browser tabs, history, and bookmarks differentiate between pages.
 */
export const useDocumentTitle = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME;

    let descriptionTag;
    let previousDescription;
    if (description) {
      descriptionTag = document.querySelector('meta[name="description"]');
      if (descriptionTag) {
        previousDescription = descriptionTag.getAttribute('content');
        descriptionTag.setAttribute('content', description);
      }
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription !== undefined) {
        descriptionTag.setAttribute('content', previousDescription);
      }
    };
  }, [title, description]);
};
