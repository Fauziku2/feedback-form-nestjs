import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
});

export function Layout({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
}
