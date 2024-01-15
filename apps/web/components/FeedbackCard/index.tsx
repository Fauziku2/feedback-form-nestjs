import { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardHeader, makeStyles, Text, Spinner } from '@fluentui/react-components';
// @ts-ignore
import { ArrowSortUp24Regular, ArrowSortDown24Regular } from '@fluentui/react-icons';
import { Feedback } from '@/models/feedback';

const useStyles = makeStyles({
  card: {
    width: '800px',
    maxWidth: '100%',
    height: 'fit-content',
    marginTop: '15px'
  },
  spinner: {
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  score: {
    verticalAlign: 'middle'
  }
});

export default function FeedbackCard(props: { key: number, feedback: Feedback, updateFeedBacks: (data: Feedback) => void }) {
  const classes = useStyles();
  const [feedBack, setFeedback] = useState<Feedback>(props.feedback)
  const [loading, setLoading] = useState<boolean>(false)

  const upVote = async () => {
    setLoading(true);
    const score = feedBack.score + 1;
    await updateFeedback(score);
  }

  const downVote = async () => {
    setLoading(true);
    const score = feedBack.score - 1;
    await updateFeedback(score);
  }

  const updateFeedback = async(score: number) => {
    try {
      const { data } = await axios.put(`http://localhost:3333/api/feedbacks/${feedBack.id}`, { score });
      if (data) {
        setFeedback(data);
        props.updateFeedBacks(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      className={classes.card}
      floatingAction={
        <>
          { loading && <Spinner className={classes.spinner} size="extra-tiny" />  }
          {
            !loading && (
              <span className={classes.score}>
                {
                  feedBack.score === 0
                    ? ''
                    : feedBack.score < 0
                      ? '-'
                      : '+'
                }
                { Math.abs(feedBack.score) }
              </span>
            )
          }
          <Button
            appearance="transparent"
            icon={<ArrowSortUp24Regular />}
            aria-label="More options"
            data-testid="upVote"
            onClick={upVote}
            disabled={loading}
          />
          <Button
            appearance="transparent"
            icon={<ArrowSortDown24Regular />}
            aria-label="More options"
            data-testid="downVote"
            onClick={downVote}
            disabled={loading}
          />
        </>
      }
    >
      <CardHeader header={<Text weight="semibold">{ feedBack.name }</Text>}/>
      <p>{ feedBack.description }</p>
    </Card>
  );
}
