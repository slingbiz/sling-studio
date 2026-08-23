import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from '@material-ui/core';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppsHeader from '../../../../@sling/core/AppsContainer/AppsHeader';
import AppContext from '../../../../@sling/utility/AppContext';
import defaultConfig from '../../../../@sling/utility/ContextProvider/defaultConfig';
import ApiAuth from '../../../../@sling/services/ApiAuthConfig';
import {SERVICE_URL} from '../../../../shared/constants/Services';

const FIELD_GROUPS = [
  {
    title: 'Palette',
    fields: [
      {label: 'Primary main', path: ['palette', 'primary', 'main']},
      {label: 'Primary contrast', path: ['palette', 'primary', 'contrastText']},
      {label: 'Secondary main', path: ['palette', 'secondary', 'main']},
      {label: 'Background paper', path: ['palette', 'background', 'paper']},
      {label: 'Background default', path: ['palette', 'background', 'default']},
      {label: 'Text primary', path: ['palette', 'text', 'primary']},
      {label: 'Text secondary', path: ['palette', 'text', 'secondary']},
      {label: 'Sidebar bg', path: ['palette', 'sidebar', 'bgColor']},
      {label: 'Sidebar text', path: ['palette', 'sidebar', 'textColor']},
    ],
  },
  {
    title: 'Extras',
    fields: [
      {label: 'Gray 500', path: ['palette', 'gray', '500']},
      {label: 'Divider', path: ['divider'], type: 'text'},
      {label: 'Font family', path: ['typography', 'fontFamily'], type: 'text'},
    ],
  },
];

const getAt = (obj, path) => path.reduce((acc, key) => (acc == null ? acc : acc[key]), obj);

const setAt = (obj, path, value) => {
  const next = Array.isArray(obj) ? [...obj] : {...obj};
  const [head, ...rest] = path;
  next[head] = rest.length ? setAt(obj?.[head] || {}, rest, value) : value;
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

const ThemeSettings = (props) => {
  const {titleKey} = props;
  const {updateTheme, themeMode} = useContext(AppContext);
  const [theme, setTheme] = useState(defaultConfig.theme);
  const [mode, setMode] = useState(themeMode || defaultConfig.themeMode);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

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
    setTheme((prev) => setAt(prev, path, value));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
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
    } catch (err) {
      setError(err.message || 'Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AppsHeader>
        <Box fontWeight={Fonts.BOLD} component='h3' style={{textTransform: 'capitalize'}}>
          {titleKey}
        </Box>
        <Button color='primary' variant='contained' onClick={handleSave} disabled={saving}>
          Save theme
        </Button>
      </AppsHeader>
      <Box style={{padding: 24, overflow: 'auto'}}>
        {!loaded && (
          <Typography color='textSecondary' style={{marginBottom: 16}}>
            Loading theme...
          </Typography>
        )}
        {error && (
          <Typography color='error' style={{marginBottom: 16}}>
            {error}
          </Typography>
        )}
        {FIELD_GROUPS.map((group) => (
          <Box key={group.title} style={{marginBottom: 28}}>
            <Typography variant='h6' style={{marginBottom: 12}}>
              {group.title}
            </Typography>
            <Grid container spacing={3}>
              {group.fields.map((field) => {
                const value = getAt(theme, field.path) || '';
                const isColor = field.type !== 'text';
                return (
                  <Grid item xs={12} sm={6} md={4} key={field.label}>
                    <Box style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      {isColor && (
                        <>
                          <input
                            type='color'
                            aria-label={`${field.label} swatch`}
                            value={toColorInput(value)}
                            onChange={(e) => handleField(field.path, e.target.value)}
                            style={{width: 36, height: 36, border: 'none', background: 'transparent', padding: 0}}
                          />
                          <Box
                            aria-hidden
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              background: toColorInput(value),
                              border: '1px solid #ddd',
                            }}
                          />
                        </>
                      )}
                      <TextField
                        label={field.label}
                        value={value}
                        onChange={(e) => handleField(field.path, e.target.value)}
                        fullWidth
                        size='small'
                        variant='outlined'
                        inputProps={{'aria-label': field.label}}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
        <Box>
          <Typography variant='h6' style={{marginBottom: 12}}>
            Theme mode
          </Typography>
          <TextField
            label='Theme mode'
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            size='small'
            variant='outlined'
          />
        </Box>
      </Box>
    </>
  );
};

export default ThemeSettings;
