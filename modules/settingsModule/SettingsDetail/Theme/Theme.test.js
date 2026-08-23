import React from 'react';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppContext from '../../../../@sling/utility/AppContext';
import ThemeSettings from './index';

const mockGet = jest.fn();
const mockPut = jest.fn();

jest.mock('../../../../@sling/services/ApiAuthConfig', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      get: (...args) => mockGet(...args),
      put: (...args) => mockPut(...args),
      post: (...args) => mockPut(...args),
    }),
  ),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const defaultTheme = {
  palette: {
    primary: {main: '#0A8FDC', contrastText: '#fff'},
    secondary: {main: '#F04F47'},
    background: {paper: '#FFFFFF', default: '#F4F7FE'},
    text: {primary: '#495057', secondary: '#74788d'},
    sidebar: {bgColor: '#313541', textColor: '#808183'},
    gray: {500: '#A8A8A8'},
  },
  typography: {fontFamily: 'Open Sans,sans-serif'},
  divider: 'rgba(0, 0, 0, 0.12)',
};

const renderTheme = (updateTheme = jest.fn()) =>
  render(
    <AppContext.Provider value={{theme: defaultTheme, updateTheme, themeMode: 'light'}}>
      <ThemeSettings titleKey='Theme' pageKey='theme' />
    </AppContext.Provider>,
  );

describe('Settings → Theme', () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockPut.mockReset();
    mockGet.mockResolvedValue({
      data: {theme: defaultTheme, themeMode: 'light'},
    });
    mockPut.mockResolvedValue({
      data: {
        theme: {
          ...defaultTheme,
          palette: {
            ...defaultTheme.palette,
            primary: {main: '#123456', contrastText: '#fff'},
          },
        },
        themeMode: 'light',
      },
    });
  });

  test('renders theme template variables, not Coming Soon', async () => {
    renderTheme();

    expect(screen.queryByText(/Coming Soon/i)).not.toBeInTheDocument();
    expect(await screen.findByRole('textbox', {name: 'Primary main'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Primary contrast'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Secondary main'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Background paper'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Background default'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Text primary'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Text secondary'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Sidebar bg'})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: 'Sidebar text'})).toBeInTheDocument();
  });

  test('changing a color and saving posts the edited theme', async () => {
    renderTheme();

    const primary = await screen.findByRole('textbox', {name: 'Primary main'});
    fireEvent.change(primary, {target: {value: '#123456'}});

    await userEvent.click(screen.getByRole('button', {name: /save theme/i}));

    await waitFor(() => {
      expect(mockPut).toHaveBeenCalled();
    });

    const [, body] = mockPut.mock.calls[0];
    expect(body.theme.palette.primary.main).toBe('#123456');
  });

  test('after save, Studio applies the new primary color to context', async () => {
    const updateTheme = jest.fn();
    renderTheme(updateTheme);

    const primary = await screen.findByRole('textbox', {name: 'Primary main'});
    fireEvent.change(primary, {target: {value: '#123456'}});
    await userEvent.click(screen.getByRole('button', {name: /save theme/i}));

    await waitFor(() => {
      expect(updateTheme).toHaveBeenCalled();
    });
    expect(updateTheme.mock.calls[0][0].palette.primary.main).toBe('#123456');
  });
});
