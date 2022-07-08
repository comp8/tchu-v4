type ThemeMode = 'light' | 'dark';
type Format = 'default';
type Scale = '1.0' | '2.0' | '3.0';

export function getEmoteUrl(id: string, theme_mode: ThemeMode = 'light', format: Format = 'default', scale: Scale = '1.0') {
  return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${format}/${theme_mode}/${scale}`;
}