import red from 'material-ui/colors/red'
import blue from 'material-ui/colors/blue'

export const mainTheme = {
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
}
