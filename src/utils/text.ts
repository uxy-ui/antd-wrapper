export const nameHash = (name?: string) => {
  if (name) {
    const nameFormated = name.replace(/\s/g, '');
    if (nameFormated.length === 0) {
      return '无';
    } else if (nameFormated.length <= 2) {
      return nameFormated;
    } else {
      return nameFormated.slice(-2);
    }
  } else {
    return '无';
  }
};

export const textToColor = (text?: string): string => {
  const str = text || '无';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  const saturation = 70 + (hash % 10); // 70-79%
  const lightness = 40 + (hash % 10); // 40-49%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
