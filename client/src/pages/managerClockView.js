
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SimpleLineChart from '../components/SimpleLineChart';
import SimpleTable from '../components/SimpleTable';
import SimpleMenu from '../components/rangeMenu';
import Schedule from '../components/scheduleView';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});


class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>


          <main className={classes.content}>
            <Typography>
              <Schedule />
            </Typography>
            <div className={classes.appBarSpacer} />
            <Typography variant="h4" gutterBottom component="h2">
              How many clocked in
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
              <SimpleLineChart />
            </Typography>
            <Typography variant="h4" gutterBottom component="h2" />


            <div className={classes.tableContainer}>
              <Grid container justify="flex-start">
                <SimpleMenu />
              </Grid>
              <SimpleTable />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
