import red from 'material-ui/colors/red'
import blue from 'material-ui/colors/blue'

export const mainTheme = {
  typography: {
    // Use the system font.
    fontFamily: "'Nunito Sans', sans-serif",
    title: {
      fontFamily: 'Bungee',
    },
  },
  palette: {
    primary: {
      ...red,
      500: red[400],
      400: '#ff997d',
      200: '#ffb599',
      100: '#ffceb1',
      50: '#ffeed8',
    },
    secondary: blue,
    background: {
      default: 'cornsilk',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        minWidth: 'auto',
        minHeight: 'auto',
        textTransform: 'none',
      },
      raised: {
        backgroundColor: 'rgba(0,0,0, .2)',
        padding: '4px 10px 4px 6px',
        borderRadius: '3px',
        whiteSpace: 'nowrap',
        margin: '4px',
        boxShadow: 'unset',
      },
      raisedPrimary: {
        boxShadow: '3px 3px 0px rgba(0,0,0,0.1)',
      },
    },
  },
}
