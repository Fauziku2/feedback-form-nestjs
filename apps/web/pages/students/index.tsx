import { Layout } from '@/components/Layout';
import {
  Card,
  CardHeader,
  Link,
  Title1,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { useFindAllStudents } from '@/queries/students';
import { AtSymbolIcon } from '@heroicons/react/20/solid';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: tokens.spacingVerticalL,
  },
  card: {
    width: '60vw',
  },
  atSymbolIcon: {
    width: '1rem',
    height: '1rem',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalXS,
  },
});

export default function Students() {
  const classes = useStyles();
  const { data: students } = useFindAllStudents();

  return (
    <Layout>
      <div className={classes.root}>
        <Title1>Students</Title1>
        {students?.map((student) => (
          <Card key={student.id} className={classes.card}>
            <CardHeader header={<Title3>{student.name}</Title3>} />
            <div className={classes.cardContent}>
              <AtSymbolIcon className={classes.atSymbolIcon} /> Email:{' '}
              <Link href={`mailto:${student.email}`}>{student.email}</Link>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
