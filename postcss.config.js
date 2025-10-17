export default {
  plugins: {
    'tailwindcss/nesting': {}, // Enable nesting support
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
        'nesting-rules': false, // Disable since we're using tailwindcss/nesting
      },
    },
    'cssnano': process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        colormin: true,
        minifyFontValues: true,
        minifyGradients: true,
        minifySelectors: true,
      }]
    } : false,
  },
        }
