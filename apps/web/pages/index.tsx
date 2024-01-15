import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
  Title1,
  makeStyles,
} from '@fluentui/react-components';
import axios from 'axios';
// @ts-ignore
import { Add24Regular } from '@fluentui/react-icons';
import { Layout } from '@/components/Layout';
import FeedbackForm from '@/components/FeedbackForm'
import FeedbackList from '@/components/FeedbackList';
import FeedbackSortOptions from '@/components/FeedbackSortOptions';
import { Feedback, FeedbackSortBy } from '@/models/feedback';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  button: {
    position: 'fixed',
    right: '2em',
    bottom: '2em'
  },
  popover: {
    width: '420px',
  },
  card: {
    width: '800px',
    maxWidth: '100%',
    height: 'fit-content',
    marginTop: '15px'
  },
  score: {
    verticalAlign: 'middle',
    paddingRight: '10px'
  }
});

export default function Home() {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);
  const [openPopover, setOpenPopover] = useState(false);
  const [sortOption, setSortOption] = useState<string | undefined>(FeedbackSortBy.DESCENDING_SCORE);

  const fetchFeedbacks = async (initialLoad: boolean=false) => {
    try {
      const { data } = await axios.get('http://localhost:3333/api/feedbacks');
      if (data.length) {
        setFeedbacks(data);
        await onSort(sortOption);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeedbacks(true)
  }, []);

  const onTogglePopover = async () => {
    setOpenPopover(prevState => !prevState);
  }

  const onSelectedOption = async (option: string | undefined) => {
    if (option) {
      setSortOption(option);
      await onSort(option);
    }
  }

  const onSort = async(sortType: string | undefined)=> {
    if (sortType === FeedbackSortBy.DESCENDING_SCORE) {
      setFeedbacks(prevState => {
        const sortedFeedbacks = [ ...prevState ];
        sortedFeedbacks.sort((a: Feedback, b: Feedback) => b.score - a.score);
        return sortedFeedbacks;
      });
    }
    if (sortType === FeedbackSortBy.ASCENDING_SCORE) {
      setFeedbacks(prevState => {
        const sortedFeedbacks = [ ...prevState ];
        sortedFeedbacks.sort((a: Feedback, b: Feedback) => a.score - b.score);
        return sortedFeedbacks;
      });
    }
    if (sortType === FeedbackSortBy.LATEST_DATE) {
      setFeedbacks(prevState => {
        const sortedFeedbacks = [ ...prevState ];
        sortedFeedbacks.sort((a: Feedback, b: Feedback) => {
          let da = new Date(Number(a.createdAt)).getTime();
          let db = new Date(Number(b.createdAt)).getTime();
          return db - da;
        });
        return sortedFeedbacks;
      });
    }
    if (sortType === FeedbackSortBy.OLDEST_DATE) {
      setFeedbacks(prevState => {
        const sortedFeedbacks = [ ...prevState ];
        sortedFeedbacks.sort((a: Feedback, b: Feedback) => {
          let da = new Date(Number(a.createdAt)).getTime();
          let db = new Date(Number(b.createdAt)).getTime();
          return da - db;
        });
        return sortedFeedbacks;
      });
    }
  }

  const updateScore = async (data: Feedback) => {
    setFeedbacks(prevState => {
      const updatedFeedbacks = [ ...prevState ];
      const index = updatedFeedbacks.findIndex((feedback: Feedback) => feedback.id === data.id);
      (updatedFeedbacks[index] as Feedback) = data;
      return updatedFeedbacks;
    });
    await onSort(sortOption);
  }

  return (
    <Layout>
      <div className={classes.root}>
        <Title1>Student Feedback Form</Title1>
        <FeedbackSortOptions onSelectedOption={onSelectedOption} />
        <FeedbackList feedbacks={feedbacks} updateScore={updateScore} />
        <Popover size="small" open={openPopover}>
          <PopoverTrigger disableButtonEnhancement>
            <Button
              size="large"
              shape="circular"
              className={classes.button}
              onClick={onTogglePopover}
              data-testid="openFeedbackFormBtn"
              icon={<Add24Regular />}
            />
          </PopoverTrigger>
          <PopoverSurface className={classes.popover}>
            <FeedbackForm fetchFeedbacks={fetchFeedbacks} onClosePopover={onTogglePopover} />
          </PopoverSurface>
        </Popover>
      </div>
    </Layout>
  );
}
