import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import AllSources from 'components/AllSources'
import Highlights from 'components/Highlights'
import SearchInput from 'components/SearchInput'
import Hero from 'components/Hero'

const styles = theme => ({
  root: {},
  intro: {
    paddingTop: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 3,
    '& aside': {
      fontSize: '1rem',
      marginBottom: theme.spacing.unit * 3,
    },
  },
  right: {
    paddingTop: theme.spacing.unit * 3,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
  },
  fristPart: {
    backgroundColor: theme.palette.primary[50],
  },
})

class Source extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container className={classes.fristPart}>
          <Grid item xs={12} md={3} lg={2}>
            <div className={classes.intro}>
              <Typography variant="body2">
                Monitora il ‘sentiment’ di una testata giornalistica riguardo
                uno specifico argomento. Vengono presi in esame i post
                pubblicati da una testata sulla propria pagina social in un
                certo arco di tempo.
              </Typography>
              <Typography variant="body2">
                Clicca su una testata per vedere gli argomenti selezionati. I
                grafici illustrano la forza del ‘sentiment’ espresso nel post:
                punti più alti o più bassi nel grafico, indicano ‘sentiment’ più
                positivo o negativo.
              </Typography>
              <Typography variant="body2">
              Bias Tracker raccoglie gli elementi testuali dalle pagine Facebook
              di 12 testate italiane. Vengono analizzate per estrarre automaticamente
              gli argomenti e determinare il sentiment delle parole. Per farlo viene
              usato uno strumento che sfrutta l’intelligenza artificiale. Questi
              elementi vengono poi combinati per creare i grafici che vedere qui.
              Cliccando sui grafici avrete il dettaglio del singolo post.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            <div className={classes.right}>
              <div style={{ paddingBottom: 20 }}>
                <SearchInput />
              </div>
              <Highlights />
            </div>
          </Grid>
        </Grid>
        <div>
          <Hero title="Fonti" description="And their top concerns" />
          <AllSources />
        </div>
      </div>
    )
  }
}

export default compose(withStyles(styles))(Source)
