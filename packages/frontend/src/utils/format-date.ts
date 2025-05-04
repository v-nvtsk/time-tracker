export const formatDate = new Intl.DateTimeFormat('ru-RU', {
  formatMatcher: 'best fit',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format;