const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'speaker-zx7':
          "url('apps/client/src/assets/home/mobile/image-speaker-zx7.jpg')",
        'YX1-EARPHONES':
          "url('apps/client/src/assets/home/mobile/image-earphones-yx1.jpg')",
        'image-header':
          "url('apps/client/src/assets/home/mobile/image-header.jpg')",
        'location-img':
          "url('apps/client/src/assets/product-xx99-mark-two-headphones/mobile/image-gallery-1.jpg')",
        'circle-speaker': "url:('apps/client/src/assets/speaker-circle.svg')",
        'ZX7-SPEAKER': "url:('apps/client/src/assets/speaker2-background.svg')",
        'image-hero':
          "url:('apps/client/src/assets/home/desktop/image-hero.jpg')",
        'ZX9-SPEAKER': "url:('apps/client/src/assets/zx9-speaker.svg')",
      },
      colors: {
        white2: '#f1f1f1',
        orange2: '#d87d4a',
        black2: '#101010',
        gray2: '#ccc',
        orangeHover: '#fbaf85',
      },
    },
    screens: {
      md: '900px',
    },
  },
  plugins: [],
};
