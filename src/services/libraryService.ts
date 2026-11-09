export const LIBRARY_EXTERNAL_URL =
  import.meta.env.VITE_LIBRARY_URL?.trim() ||
  'https://xn--80abaqnbpf2a4b.xn--21-dlc2ep.xn--p1ai';

export const libraryService = {
  getLibraryUrl(): string {
    const separator = LIBRARY_EXTERNAL_URL.includes('?') ? '&' : '?';
    return `${LIBRARY_EXTERNAL_URL}${separator}from=vuc_ios`;
  },

  redirectToLibrary(newTab = false): void {
    const targetUrl = this.getLibraryUrl();
    if (newTab) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = targetUrl;
    }
  },
};
