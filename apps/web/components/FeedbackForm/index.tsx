import { BaseSyntheticEvent, useState } from 'react';
import {
  Button,
  Field,
  Input,
  Label,
  makeStyles,
  shorthands,
  Textarea,
  useId
} from '@fluentui/react-components';
import axios from 'axios';
import { validateEmail } from '@/utils/validate-email';

const useStyles = makeStyles({
  input: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap('2px'),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
    marginTop: '15px',
  },
  submitBtn: {
    marginTop: '15px',
    float: 'right',
  },
  danger: {
    color: 'red'
  }
});

interface FormData {
  form: {
    [key: string]: { value: string, isValid: boolean, isTouched: boolean }
  },
  isValid: boolean,
  isTouched: boolean
}

export default function FeedbackForm(
  props: { fetchFeedbacks: () => void, onClosePopover: () => void }
) {
  const classes = useStyles();
  const nameId = useId('name');
  const emailId = useId('email');
  const descriptionId = useId('description');

  const [formData, setFormData] = useState<FormData>({
    form: {
      [nameId]: { value: '', isValid: false, isTouched: false },
      [emailId]: { value: '', isValid: false, isTouched: false },
      [descriptionId]: { value: '', isValid: false, isTouched: false },
    },
    isValid: false,
    isTouched: false
  });

  const onUpdateFormData = async (type: string, value: string) => {
    setFormData((prevFormData): FormData => {
      const updatedFormData: FormData = { ...prevFormData };
      if (!updatedFormData.isTouched) {
        updatedFormData.isTouched = true;
      }
      updatedFormData.form[type].value = value;
      updatedFormData.form[type].isTouched = true;
      if (value.length) {
        updatedFormData.form[type].isValid = type === emailId ? validateEmail(value) : true;
      } else {
        updatedFormData.form[type].isValid = false;
      }
      const formDataArr = Object.entries(updatedFormData.form);
      const isValidArr: boolean[] = formDataArr.map(([key, value]) => {
        return value.isValid;
      });
      updatedFormData.isValid = isValidArr.every((res) => res);
      return updatedFormData
    });
  }

  const onInput = async (evt: BaseSyntheticEvent) => {
    await onUpdateFormData(evt.target.id, evt.target.value);
  }

  const onSubmitForm = async (evt: BaseSyntheticEvent) => {
    evt.preventDefault();
    if (formData.isValid) {
      const { data } = await axios.post('http://localhost:3333/api/feedbacks', {
        name: formData.form[nameId].value,
        email: formData.form[emailId].value,
        description: formData.form[descriptionId].value
      })
      props.fetchFeedbacks();
      props.onClosePopover();
    }
  };

  return (
    <div>
      <h1>Submit Feedback</h1>
      <form onSubmit={onSubmitForm} noValidate>
        <div className={classes.input}>
          <Label htmlFor={nameId} disabled={false}>
            Name
          </Label>
          <Input
            id={nameId}
            onChange={onInput}
            onBlur={onInput}
            required
          />
          { !formData.form[nameId].isValid && formData.form[nameId].isTouched && (
            <p className={classes.danger}>Please enter a valid name</p>
          )}
        </div>
        <div className={classes.input}>
          <Label htmlFor={emailId} disabled={false}>
            Email
          </Label>
          <Input
            id={emailId}
            onChange={onInput}
            onBlur={onInput}
            required
          />
          { !formData.form[emailId].isValid && formData.form[emailId].isTouched && (
            <p className={classes.danger}>Please enter a valid email</p>
          )}
        </div>
        <div className={classes.input}>
          <Field label="Description">
            <Textarea
              id={descriptionId}
              size="large"
              onChange={onInput}
              onBlur={onInput}
              required
            />
          </Field>
          { !formData.form[descriptionId].isValid && formData.form[descriptionId].isTouched && (
            <p className={classes.danger}>Please enter a valid description</p>
          )}
        </div>
        <div>
          <Button
            className={classes.submitBtn}
            type="submit"
            disabled={!formData.isValid}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
