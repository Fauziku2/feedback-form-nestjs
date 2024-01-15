import { Dropdown, makeStyles, Option, shorthands } from '@fluentui/react-components';
import { FeedbackSortBy } from '@/models/feedback';
import { BaseSyntheticEvent } from 'react';

const useStyles = makeStyles({
  root: {
    marginTop: '10px',
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  }
});

export default function FeedbackSortOptions(props: { onSelectedOption: (option: string | undefined) => void }) {
  const classes = useStyles();
  const options: { text: string, value: string }[] = [
    { text: 'Sort by Score(Descending)', value: FeedbackSortBy.DESCENDING_SCORE },
    { text: 'Sort by Score(Ascending)', value: FeedbackSortBy.ASCENDING_SCORE },
    { text: 'Sort by Date(Latest)', value: FeedbackSortBy.LATEST_DATE },
    { text: 'Sort by Date(Oldest)', value: FeedbackSortBy.OLDEST_DATE },
  ]

  const onSelect = async (
    evt: BaseSyntheticEvent,
    data: { optionValue: string | undefined, optionText: string | undefined, selectedOptions: string[] }
  ) => {
    props.onSelectedOption(data.optionValue)
  }

  return (
    <div className={classes.root}>
      <Dropdown onOptionSelect={onSelect} defaultValue={options[0].text}>
        {
          options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.text}
            </Option>
          ))
        }
      </Dropdown>
    </div>
  )
}
