import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #7d44f0',
  },
  tabsIndicator: {
    backgroundColor: '#7d44f0',
  },
  tabSelected: {
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
    codeLang: [],
    codeSnippet: []
  };

  constructor(props) {
    super(props);
    this.state = {value:0, codeLang: props.codeLang, codeSnippet: props.codeSnippet};
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const  value  = this.state.value;
    const codeLang = this.state.codeLang;
    const codeSnippet = this.state.codeSnippet;

    const singleItem = (item, index) => {
      return(<Tab label={item} disableRipple />)
    }

    const codeSnippetItem = (item, index) => {
      return (value === index && item)
    }
    const pStyle = {
        margin: '0 26px',
        width: '93%',
        background:'#7d44f0',
    };


    return (
      <div className={classes.root}>
        <AppBar position="static" style={pStyle}>
          <Tabs value={value} onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
           {codeLang.map(singleItem)}
          </Tabs>
        </AppBar>
            {codeSnippet.map(codeSnippetItem)}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
