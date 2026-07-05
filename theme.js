/* ============================================================
   theme.js — Benevolent Class · Shared settings engine
   Load this BEFORE closing </body> on every page.
============================================================ */
(function () {

  /* ── 1. Token maps ──────────────────────────────────────── */
  const THEMES = {
    dark: {
      '--bg':          '#0A0A0F',
      '--bg-layer':    '#111118',
      '--glass':       'rgba(255,255,255,0.04)',
      '--glass-mid':   'rgba(255,255,255,0.08)',
      '--glass-high':  'rgba(255,255,255,0.13)',
      '--border':      'rgba(255,255,255,0.10)',
      '--border-hi':   'rgba(255,255,255,0.18)',
      '--ink':         '#F0EDE8',
      '--ink-soft':    '#8A8794',
      '--ink-mute':    '#4A4754',
      '--gold':        '#D4AF6A',
      '--gold-dim':    'rgba(212,175,106,0.18)',
      '--gold-glow':   'rgba(212,175,106,0.35)',
      '--slate':       '#7B9EA8',
      '--slate-dim':   'rgba(123,158,168,0.15)',
      '--dot-pattern': 'rgba(255,255,255,0.04)',
      '--ribbon-bg':   'rgba(10,10,15,0.72)',
      '--orb-a':       'rgba(212,175,106,0.12)',
      '--orb-b':       'rgba(123,158,168,0.10)',
    },
    cream: {
      '--bg':          '#F6F0E4',
      '--bg-layer':    '#EDE5D4',
      '--glass':       'rgba(0,0,0,0.03)',
      '--glass-mid':   'rgba(0,0,0,0.06)',
      '--glass-high':  'rgba(0,0,0,0.10)',
      '--border':      'rgba(0,0,0,0.09)',
      '--border-hi':   'rgba(0,0,0,0.16)',
      '--ink':         '#2C2417',
      '--ink-soft':    '#7A6A54',
      '--ink-mute':    '#B8A88A',
      '--gold':        '#C1633F',
      '--gold-dim':    'rgba(193,99,63,0.14)',
      '--gold-glow':   'rgba(193,99,63,0.30)',
      '--slate':       '#7A6A54',
      '--slate-dim':   'rgba(122,106,84,0.12)',
      '--dot-pattern': 'rgba(0,0,0,0.04)',
      '--ribbon-bg':   'rgba(246,240,228,0.80)',
      '--orb-a':       'rgba(193,99,63,0.10)',
      '--orb-b':       'rgba(122,106,84,0.08)',
    },
    sage: {
      '--bg':          '#EFF2E9',
      '--bg-layer':    '#E3E9D9',
      '--glass':       'rgba(0,0,0,0.03)',
      '--glass-mid':   'rgba(0,0,0,0.06)',
      '--glass-high':  'rgba(0,0,0,0.10)',
      '--border':      'rgba(0,0,0,0.08)',
      '--border-hi':   'rgba(0,0,0,0.14)',
      '--ink':         '#1E2719',
      '--ink-soft':    '#5A6B50',
      '--ink-mute':    '#9EAD92',
      '--gold':        '#4F5C45',
      '--gold-dim':    'rgba(79,92,69,0.14)',
      '--gold-glow':   'rgba(79,92,69,0.28)',
      '--slate':       '#4F5C45',
      '--slate-dim':   'rgba(79,92,69,0.12)',
      '--dot-pattern': 'rgba(0,0,0,0.035)',
      '--ribbon-bg':   'rgba(239,242,233,0.80)',
      '--orb-a':       'rgba(79,92,69,0.10)',
      '--orb-b':       'rgba(107,130,92,0.08)',
    },
    blush: {
      '--bg':          '#FBF0EF',
      '--bg-layer':    '#F5E2DF',
      '--glass':       'rgba(0,0,0,0.03)',
      '--glass-mid':   'rgba(0,0,0,0.06)',
      '--glass-high':  'rgba(0,0,0,0.10)',
      '--border':      'rgba(0,0,0,0.08)',
      '--border-hi':   'rgba(0,0,0,0.14)',
      '--ink':         '#2A1210',
      '--ink-soft':    '#8C5A55',
      '--ink-mute':    '#C9A09C',
      '--gold':        '#D4674F',
      '--gold-dim':    'rgba(212,103,79,0.14)',
      '--gold-glow':   'rgba(212,103,79,0.30)',
      '--slate':       '#8C5A55',
      '--slate-dim':   'rgba(140,90,85,0.12)',
      '--dot-pattern': 'rgba(0,0,0,0.035)',
      '--ribbon-bg':   'rgba(251,240,239,0.80)',
      '--orb-a':       'rgba(212,103,79,0.10)',
      '--orb-b':       'rgba(180,120,115,0.08)',
    },
  };

  const SPEEDS = { slow: '450s', normal: '300s', fast: '150s' };

  function applyTheme(name) {
    const tokens = THEMES[name] || THEMES.dark;
    const root = document.documentElement;
    Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute('data-theme', name);
  }

  /* ── 3. Apply filmstrip speed ───────────────────────────── */
  function applySpeed(name) {
    const dur = SPEEDS[name] || SPEEDS.normal;
    document.documentElement.style.setProperty('--film-speed', dur);
    /* Also patch live animation if track already exists */
    const track = document.getElementById('filmTrack');
    if (track) track.style.animationDuration = dur;
  }

  /* ── 4. Apply display toggles ───────────────────────────── */
  function applyToggles(prefs) {
    const root = document.documentElement;
    /* hover zoom on gallery */
    root.style.setProperty('--gallery-hover-scale', prefs.hover ? '1.05' : '1');
    root.style.setProperty('--gallery-hover-filter', prefs.hover ? 'saturate(1) brightness(1)' : 'saturate(0.8) brightness(0.85)');
    /* tilt on filmstrip */
    root.style.setProperty('--film-tilt-odd',  prefs.tilt ? '-2deg' : '0deg');
    root.style.setProperty('--film-tilt-even', prefs.tilt ? '1.5deg' : '0deg');
    /* saturation filter */
    const sat = prefs.sat ? 'saturate(0.8) brightness(0.85)' : 'saturate(1) brightness(1)';
    root.style.setProperty('--photo-filter', sat);
  }

  /* ── 5. Load & expose ───────────────────────────────────── */
  function loadAndApply() {
    const theme   = localStorage.getItem('benevolent-theme')   || 'dark';
    const speed   = localStorage.getItem('benevolent-speed')   || 'normal';
    const hover   = localStorage.getItem('benevolent-hover')   !== 'false';
    const tilt    = localStorage.getItem('benevolent-tilt')    !== 'false';
    const scroll  = localStorage.getItem('benevolent-scroll')  !== 'false';
    const sat     = localStorage.getItem('benevolent-sat')     !== 'false';

    applyTheme(theme);
    applySpeed(speed);
    applyToggles({ hover, tilt, sat });

    return { theme, speed, hover, tilt, scroll, sat };
  }

  /* Expose globally */
  window.BenevolentTheme = { THEMES, SPEEDS, applyTheme, applySpeed, applyToggles, loadAndApply };

  /* Apply immediately on script load (before DOMContentLoaded) */
  loadAndApply();
})();
