import React from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import compose from 'recompose/compose'
import { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

const styles = theme => ({
  paragraph: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
})

const AboutUsDialog = ({ classes, dialog, close }) => {
  return (
    <div>
      <DialogTitle id="form-dialog-title">Cosa è Bias Tracker</DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          Che tipo di parole usano i giornali nei social media? Cambiano nel
          tempo? Il progetto Bias Tracker è un tentativo di utilizzare
          l’intelligenza artificiale per analizzare automaticamente il sentiment
          nel tempo, così come viene espresso nella catena dei feed sui social
          media in vista delle elezioni italiane.
        </Typography>
        <Typography className={classes.paragraph}>
          Il sistema tiene traccia dei feed su Facebook di: Corriere della Sera,
          Fatto Quotidiano e la Repubblica.
        </Typography>
        <Typography className={classes.paragraph}>
          I post di ogni feed che riguardano gli argomenti chiave nella campagna
          elettorale vengono quindi analizzati e valutati in base alle parole
          emozionali. Questo ci dà un'immagine del ‘sentiment’ nei confronti di
          un tema. Tenendo traccia di questi argomenti nel tempo, è possibile
          vedere come si sviluppano e come una testata mainstream cambia il
          proprio tono?
        </Typography>
        <Typography className={classes.paragraph}>
          Il progetto è una collaborazione tra Ugo Barbàra e Arcangelo Rociola,
          giornalisti di Agi; l'Università di Urbino e gli sviluppatori di
          software <a href="https://vied12.github.io/">Edouard Richard</a> e
          Douglas Arellanes.
        </Typography>
        <Typography className={classes.paragraph}>
          E’ reso possibile grazie a un finanziamento di TechCamp
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
      </DialogActions>
    </div>
  )
}

export default compose(withStyles(styles))(AboutUsDialog)
