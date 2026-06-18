const pastelColors = [
  '#E8D5F5', '#D5E8F5', '#D5F5E8', '#F5E8D5',
  '#F5D5E8', '#E8F5D5', '#D5F5F5', '#F5F5D5',
  '#E0D5F5', '#D5E0F5', '#D5F5E0', '#F5E0D5',
];

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getAvatarColor(name) {
  return pastelColors[hashString(name) % pastelColors.length];
}

export function getInitials(name) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}
