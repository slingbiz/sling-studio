import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import AppContext from '../../../../@sling/utility/AppContext';
import defaultConfig from '../../../../@sling/utility/ContextProvider/defaultConfig';
import ApiAuth from '../../../../@sling/services/ApiAuthConfig';
import {SERVICE_URL} from '../../../../shared/constants/Services';
import {SLING_CREAM, SLING_ORANGE, SLING_TENANT_THEME_PRESET} from '../../../aiBuilder/slingTheme';

const FIELD_GROUPS = [
  {
    title: 'Brand',
    hint: 'Buttons, links, and accents shoppers see first.',
    fields: [
      {
        label: 'Primary main',
        hint: 'Buttons and links',
        path: ['palette', 'primary', 'main'],
      },
      {
        label: 'Primary contrast',
        hint: 'Text on primary',
        path: ['palette', 'primary', 'contrastText'],
      },
      {
        label: 'Secondary main',
        hint: 'Secondary actions',
        path: ['palette', 'secondary', 'main'],
      },
    ],
  },
  {
    title: 'Surfaces',
    hint: 'Page and card backgrounds.',
    fields: [
      {
        label: 'Background paper',
        hint: 'Cards and panels',
        path: ['palette', 'background', 'paper'],
      },
      {
        label: 'Background default',
        hint: 'Page canvas',
        path: ['palette', 'background', 'default'],
      },
      {label: 'Divider', hint: 'Rules and borders', path: ['divider'], type: 'text'},
      {label: 'Gray 500', hint: 'Muted chrome', path: ['palette', 'gray', '500']},
    ],
  },
  {
    title: 'Text',
    hint: 'Readable type, not just hex.',
    fields: [
      {label: 'Text primary', hint: 'Headlines and body', path: ['palette', 'text', 'primary']},
      {label: 'Text secondary', hint: 'Hints and labels', path: ['palette', 'text', 'secondary']},
      {
        label: 'Font family',
        hint: 'Storefront typeface',
        path: ['typography', 'fontFamily'],
        type: 'text',
      },
    ],
  },
  {
    title: 'Navigation',
    hint: 'Studio and storefront sidebars.',
    fields: [
      {label: 'Sidebar bg', hint: 'Rail background', path: ['palette', 'sidebar', 'bgColor']},
      {label: 'Sidebar text', hint: 'Rail labels', path: ['palette', 'sidebar', 'textColor']},
    ],
  },
];

const MODE_OPTIONS = [
  {value: ThemeMode.LIGHT, label: 'Light'},
  {value: ThemeMode.SEMI_DARK, label: 'Semi-dark'},
  {value: ThemeMode.DARK, label: 'Dark'},
];

const getAt = (obj, path) => path.reduce((acc, key) => (acc == null ? acc : acc[key]), obj);

const setAt = (obj, path, value) => {
  const next = Array.isArray(obj) ? [...obj] : {...obj};
  const [head, ...rest] = path;
  next[head] = rest.length ? setAt(obj?.[head] || {}, rest, value) : value;
  return next;
};

const mergeTheme = (base, patch) => {
  const next = {...base, ...patch};
  if (base?.palette || patch?.palette) {
    next.palette = {
      ...base?.palette,
      ...patch?.palette,
      primary: {...base?.palette?.primary, ...patch?.palette?.primary},
      secondary: {...base?.palette?.secondary, ...patch?.palette?.secondary},
      background: {...base?.palette?.background, ...patch?.palette?.background},
      text: {...base?.palette?.text, ...patch?.palette?.text},
      sidebar: {...base?.palette?.sidebar, ...patch?.palette?.sidebar},
      gray: {...base?.palette?.gray, ...patch?.palette?.gray},
    };
  }
  if (base?.typography || patch?.typography) {
    next.typography = {...base?.typography, ...patch?.typography};
  }
  return next;
};

const toColorInput = (value) => {
  if (typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)) {
    return value;
  }
  if (typeof value === 'string' && /^#[0-9a-fA-F]{3}$/.test(value)) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return '#000000';
};

const useStyles = makeStyles(() => ({
  saveBtn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'none',
    backgroundColor: SLING_ORANGE,
    color: '#fff',
    borderRadius: 8,
    padding: '8px 18px',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#f57c00',
      boxShadow: 'none',
    },
    '&:disabled': {
      backgroundColor: '#ffd59a',
      color: '#fff',
    },
  },
  ghostBtn: {
    fontWeight: Fonts.MEDIUM,
    textTransform: 'none',
    color: SLING_ORANGE,
    borderColor: '#ffd59a',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  page: {
    padding: '24px 28px 40px',
    overflow: 'auto',
    background: `linear-gradient(180deg, ${SLING_CREAM} 0%, #ffffff 240px)`,
    minHeight: '100%',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 340px',
    gap: 28,
    alignItems: 'start',
    '@media (max-width: 960px)': {
      gridTemplateColumns: '1fr',
    },
  },
  intro: {
    marginBottom: 20,
  },
  eyebrow: {
    color: SLING_ORANGE,
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  introTitle: {
    fontWeight: 700,
    fontSize: 22,
    color: '#1a1a1a',
    marginBottom: 6,
  },
  introCopy: {
    color: '#666',
    fontSize: 14,
    lineHeight: 1.5,
    maxWidth: 520,
  },
  group: {
    marginBottom: 22,
  },
  groupTitle: {
    fontWeight: 700,
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  groupHint: {
    color: '#888',
    fontSize: 12,
    marginBottom: 12,
  },
  tokenGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 12,
  },
  token: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 10,
    border: '1px solid #f0e6d8',
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px rgba(33, 33, 33, 0.04)',
  },
  swatchWrap: {
    position: 'relative',
    width: 44,
    height: 44,
    flexShrink: 0,
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.08)',
  },
  swatchInput: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
    border: 'none',
    padding: 0,
  },
  tokenMeta: {
    minWidth: 0,
    flex: 1,
  },
  tokenLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#1a1a1a',
    lineHeight: 1.2,
  },
  tokenHint: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  tokenField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 6,
      backgroundColor: '#fff',
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: SLING_ORANGE,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: SLING_ORANGE,
        borderWidth: 2,
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '8px 10px',
      fontSize: 13,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    },
  },
  modes: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  modeBtn: {
    textTransform: 'none',
    borderRadius: 8,
    borderColor: '#eadfce',
    color: '#555',
    backgroundColor: '#fff',
    padding: '6px 14px',
  },
  modeBtnActive: {
    textTransform: 'none',
    borderRadius: 8,
    borderColor: SLING_ORANGE,
    color: '#7a4a00',
    backgroundColor: SLING_CREAM,
    fontWeight: 600,
    padding: '6px 14px',
  },
  previewWrap: {
    position: 'sticky',
    top: 12,
  },
  previewCard: {
    borderRadius: 14,
    overflow: 'hidden',
    border: '1px solid #f0e6d8',
    boxShadow: '0 12px 32px rgba(255, 152, 0, 0.08)',
    backgroundColor: '#fff',
  },
  previewLabel: {
    padding: '12px 16px 0',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: SLING_ORANGE,
  },
  previewStage: {
    display: 'flex',
    minHeight: 280,
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid rgba(0,0,0,0.06)',
  },
  previewRail: {
    width: 64,
    padding: '14px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  previewRailDot: {
    height: 8,
    borderRadius: 99,
  },
  previewMain: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  previewBar: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 12px',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
  },
  previewBody: {
    flex: 1,
    padding: 16,
  },
  previewHero: {
    borderRadius: 8,
    padding: 14,
    border: '1px solid transparent',
  },
  previewCta: {
    display: 'inline-block',
    marginTop: 10,
    padding: '7px 14px',
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
  },
  previewNote: {
    padding: '0 16px 16px',
    fontSize: 12,
    color: '#888',
    lineHeight: 1.45,
  },
  banner: {
    marginBottom: 16,
    padding: '10px 12px',
    borderRadius: 8,
    fontSize: 13,
  },
}));

const ThemeSettings = (props) => {
  const {titleKey} = props;
  const classes = useStyles();
  const {updateTheme, updateThemeMode, themeMode} = useContext(AppContext);
  const [theme, setTheme] = useState(defaultConfig.theme);
  const [mode, setMode] = useState(themeMode || defaultConfig.themeMode);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const Api = await ApiAuth();
        const res = await Api.get(`${SERVICE_URL}v1/theme`);
        if (cancelled || !res?.data?.theme) {
          return;
        }
        setTheme(res.data.theme);
        if (res.data.themeMode) {
          setMode(res.data.themeMode);
        }
        setLoaded(true);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load theme');
          setLoaded(true);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleField = (path, value) => {
    setSaved(false);
    setTheme((prev) => setAt(prev, path, value));
  };

  const handlePreset = () => {
    setSaved(false);
    setTheme((prev) => mergeTheme(prev, SLING_TENANT_THEME_PRESET));
    setMode(ThemeMode.LIGHT);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const Api = await ApiAuth();
      const res = await Api.put(`${SERVICE_URL}v1/theme`, {
        theme,
        themeMode: mode,
      });
      const savedTheme = res?.data?.theme || theme;
      setTheme(savedTheme);
      if (updateTheme) {
        updateTheme(savedTheme);
      }
      if (updateThemeMode) {
        updateThemeMode(mode);
      }
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  const primary = getAt(theme, ['palette', 'primary', 'main']) || '#000000';
  const contrast = getAt(theme, ['palette', 'primary', 'contrastText']) || '#fff';
  const paper = getAt(theme, ['palette', 'background', 'paper']) || '#fff';
  const canvas = getAt(theme, ['palette', 'background', 'default']) || '#f7f7f7';
  const textPrimary = getAt(theme, ['palette', 'text', 'primary']) || '#222';
  const textSecondary = getAt(theme, ['palette', 'text', 'secondary']) || '#666';
  const sidebarBg = getAt(theme, ['palette', 'sidebar', 'bgColor']) || '#222';
  const sidebarText = getAt(theme, ['palette', 'sidebar', 'textColor']) || '#aaa';
  const fontFamily = getAt(theme, ['typography', 'fontFamily']) || 'Open Sans, sans-serif';

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3' style={{textTransform: 'capitalize'}}>
          {titleKey}
        </Box>
        <Box style={{display: 'flex', gap: 8}}>
          <Button
            className={classes.ghostBtn}
            variant='outlined'
            onClick={handlePreset}
            disabled={saving}>
            Use Sling orange
          </Button>
          <Button className={classes.saveBtn} variant='contained' onClick={handleSave} disabled={saving}>
            Save theme
          </Button>
        </Box>
      </AppsHeader>
      <Box className={classes.page}>
        {!loaded && (
          <Typography color='textSecondary' style={{marginBottom: 16}}>
            Loading theme...
          </Typography>
        )}
        {error && (
          <Box className={classes.banner} style={{background: '#fff1f0', color: '#a8071a'}}>
            {error}
          </Box>
        )}
        {saved && (
          <Box className={classes.banner} style={{background: '#fff8f0', color: '#7a4a00'}}>
            Theme saved. Refresh the storefront to see buttons, links, and themed widgets change.
          </Box>
        )}

        <Box className={classes.layout}>
          <Box>
            <Box className={classes.intro}>
              <Typography className={classes.eyebrow}>Storefront brand</Typography>
              <Typography className={classes.introTitle}>Make the shop look like you</Typography>
              <Typography className={classes.introCopy}>
                These colors drive the storefront. Click a swatch or paste a hex.
                Save, then refresh the shop to see it.
              </Typography>
            </Box>

            {FIELD_GROUPS.map((group) => (
              <Box key={group.title} className={classes.group}>
                <Typography className={classes.groupTitle}>{group.title}</Typography>
                <Typography className={classes.groupHint}>{group.hint}</Typography>
                <Box className={classes.tokenGrid}>
                  {group.fields.map((field) => {
                    const value = getAt(theme, field.path) || '';
                    const isColor = field.type !== 'text';
                    return (
                      <Box key={field.label} className={classes.token}>
                        {isColor && (
                          <Box
                            className={classes.swatchWrap}
                            style={{background: toColorInput(value)}}>
                            <input
                              type='color'
                              aria-label={`${field.label} swatch`}
                              value={toColorInput(value)}
                              onChange={(e) => handleField(field.path, e.target.value)}
                              className={classes.swatchInput}
                            />
                          </Box>
                        )}
                        <Box className={classes.tokenMeta}>
                          <Typography className={classes.tokenLabel}>{field.label}</Typography>
                          <Typography className={classes.tokenHint}>{field.hint}</Typography>
                          <TextField
                            value={value}
                            onChange={(e) => handleField(field.path, e.target.value)}
                            fullWidth
                            size='small'
                            variant='outlined'
                            className={classes.tokenField}
                            inputProps={{'aria-label': field.label}}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            ))}

            <Box className={classes.group}>
              <Typography className={classes.groupTitle}>Theme mode</Typography>
              <Typography className={classes.groupHint}>Light chrome, dark rail, or full dark.</Typography>
              <Box className={classes.modes}>
                {MODE_OPTIONS.map((option) => (
                  <Button
                    key={option.value}
                    variant='outlined'
                    className={mode === option.value ? classes.modeBtnActive : classes.modeBtn}
                    onClick={() => {
                      setSaved(false);
                      setMode(option.value);
                    }}>
                    {option.label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>

          <Box className={classes.previewWrap}>
            <Box className={classes.previewCard}>
              <Typography className={classes.previewLabel}>Live preview</Typography>
              <Box className={classes.previewStage} data-testid='theme-preview'>
                <Box className={classes.previewRail} style={{background: sidebarBg}}>
                  <Box className={classes.previewRailDot} style={{background: SLING_ORANGE, width: 28}} />
                  <Box className={classes.previewRailDot} style={{background: sidebarText, width: 36, opacity: 0.7}} />
                  <Box className={classes.previewRailDot} style={{background: sidebarText, width: 24, opacity: 0.45}} />
                  <Box className={classes.previewRailDot} style={{background: sidebarText, width: 32, opacity: 0.45}} />
                </Box>
                <Box className={classes.previewMain} style={{background: canvas, fontFamily}}>
                  <Box className={classes.previewBar} style={{background: paper}}>
                    <span style={{fontSize: 11, fontWeight: 700, color: textPrimary}}>Your store</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        color: contrast,
                        background: primary,
                        borderRadius: 4,
                        padding: '3px 8px',
                      }}>
                      Cart
                    </span>
                  </Box>
                  <Box className={classes.previewBody}>
                    <Box
                      className={classes.previewHero}
                      style={{background: paper, borderColor: getAt(theme, ['divider']) || '#eee'}}>
                      <div style={{fontSize: 16, fontWeight: 700, color: textPrimary, marginBottom: 4}}>
                        Summer drop
                      </div>
                      <div style={{fontSize: 12, color: textSecondary}}>
                        New arrivals, priced for the week.
                      </div>
                      <span
                        data-testid='theme-preview-cta'
                        className={classes.previewCta}
                        style={{backgroundColor: primary, color: contrast}}>
                        Shop now
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Typography className={classes.previewNote}>
                Buttons, links, and widgets that read the theme update on refresh.
                Old rating greens and reds stay as-is.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ThemeSettings;
