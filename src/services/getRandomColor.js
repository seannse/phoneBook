const [col1, col2, col3, col4, col5] = [
  'rgb(213, 192, 110)',
  'rgb(198, 62, 176)',
  'rgb(57, 171, 128)',
  'rgb(118, 146, 212)',
  'rgb(240, 63, 82)',
];

export const getRandomColor = idx => {
  if (idx === 0) return col5;
  if (idx % 5 === 0) return col5;
  if (idx % 4 === 0) return col4;
  if (idx % 3 === 0) return col3;
  if (idx % 2 === 0) return col2;
  if (idx % 1 === 0) return col1;
};
