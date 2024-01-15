import { fireEvent, render, screen } from '@testing-library/react';
import FeedbackForm from '@/components/FeedbackForm/index';

describe('FeedbackForm', () => {
  test('renders Student Feedback Form title', () => {
    render(<FeedbackForm fetchFeedbacks={() => {}} onClosePopover={() => {}} />);
    const titleElement = screen.getByText(/Submit Feedback/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders Student Feedback Form properly', () => {
    render(<FeedbackForm fetchFeedbacks={() => {}} onClosePopover={() => {}} />);
    const nameLabel = screen.getByText(/Name/i);
    const emailLabel = screen.getByText(/Email/i);
    const descriptionLabel = screen.getByText(/Description/i);
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('type', 'text');
  });

  test('renders a button with correct text', () => {
    render(<FeedbackForm fetchFeedbacks={() => {}} onClosePopover={() => {}} />);
    const buttonElement = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('disabled');
  });

  test('button should be disabled when form fields are not empty', async () => {
    render(<FeedbackForm fetchFeedbacks={() => {}} onClosePopover={() => {}} />);
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    fireEvent.change(nameInput, { 'target': { 'value': 'John' } });
    fireEvent.change(emailInput, { 'target': { 'value': 'John@test.com' } });
    fireEvent.change(descriptionInput, { 'target': { 'value': 'new description' } });
    const buttonElement = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(buttonElement).not.toHaveAttribute('disabled');
  });
});
