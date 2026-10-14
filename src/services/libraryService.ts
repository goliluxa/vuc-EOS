export const LIBRARY_EXTERNAL_URL =
  import.meta.env.VITE_LIBRARY_URL?.trim() ||
  'https://xn--80abaqnbpf2a4b.xn--21-dlc2ep.xn--p1ai';

export const libraryService = {
  getLibraryUrl(): string {
    return LIBRARY_EXTERNAL_URL;
  },

  redirectToLibrary(newTab = false): void {
    if (newTab) {
      window.open(LIBRARY_EXTERNAL_URL, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = LIBRARY_EXTERNAL_URL;
    }
  },
};
