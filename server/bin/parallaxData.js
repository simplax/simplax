const parallaxData = [
  {
    category: 'transform',
    property: 'translateY',
    startValue: 0,
    endValue: -60,
    minValue: -150,
    maxValue: 150,
    unit: 'vh',
    start: 'self',
    startOffsetIn: 0,
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'translateX',
    startValue: 0,
    endValue: 25,
    minValue: -150,
    maxValue: 150,
    unit: 'vw',
    start: 'self',
    startOffsetIn: 0,
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'skewY',
    startValue: 0,
    endValue: 45,
    minValue: -360,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'skewX',
    startValue: 0,
    endValue: 45,
    minValue: -360,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'skew',
    startValue: 0,
    endValue: 45,
    minValue: -360,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'rotateY',
    startValue: 0,
    endValue: 75,
    minValue: -360,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'rotateX',
    startValue: 0,
    endValue: 75,
    minValue: -360,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'rotate',
    startValue: 0,
    endValue: 45,
    minValue: -360,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'scaleY',
    startValue: 0.5,
    endValue: 1.2,
    minValue: 0,
    maxValue: 10,
    unit: '',
    start: 'self',
    startOffsetIn: 0,
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'scaleX',
    startValue: 1,
    endValue: 1.5,
    minValue: 0,
    maxValue: 10,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'transform',
    property: 'scale',
    startValue: 1,
    endValue: 1.5,
    minValue: 0,
    maxValue: 10,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'backgroundColor',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'borderColor',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'borderBottomColor',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'borderTopColor',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'borderLeftColor',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'borderRightColor',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'colors',
    property: 'color',
    startValue: '#6b34c9',
    endValue: '#fead7b',
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'opacity',
    startValue: 0.2,
    endValue: 1,
    minValue: 0,
    maxValue: 1,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'blur',
    startValue: 0,
    endValue: 5,
    minValue: 0,
    maxValue: 50,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'brightness',
    startValue: 0.2,
    endValue: 1.8,
    minValue: 0,
    maxValue: 5,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'contrast',
    startValue: 0.2,
    endValue: 2,
    minValue: 0,
    maxValue: 5,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'grayscale',
    startValue: 0,
    endValue: 1,
    minValue: 0,
    maxValue: 1,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'hueRotate',
    startValue: 0,
    endValue: 90,
    minValue: 0,
    maxValue: 360,
    unit: 'deg',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'invert',
    startValue: 0,
    endValue: 1,
    minValue: 0,
    maxValue: 1,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'saturate',
    startValue: 1,
    endValue: 0,
    minValue: 0,
    maxValue: 1,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  },
  {
    category: 'css-filter',
    property: 'sepia',
    startValue: 0,
    endValue: 1,
    minValue: 0,
    maxValue: 1,
    unit: '',
    start: 'self',
    startOffsetIn: '10vw',
    startOffsetOut: '60vh',
    end: 'self',
    endOffsetIn: '50vh',
    endOffsetOut: '100vh',
    easing: 'easeInSine'
  }
];

module.exports = parallaxData;
