import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Subtle from '../img/full-bloom.png';


const styles = {
  root: {
    width: 500,
    backgroundImage: `url(${Subtle})`,
    margin: '0 auto',
    lineHeight: '2.5',
  },
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (

      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}
        style={{ position: 'fixed', bottom: -10, width: '100%' }}
      >
        <b>TimeClock9000</b>
      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(SimpleBottomNavigation);
