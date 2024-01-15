import FeedbackCard from '@/components/FeedbackCard/index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Feedback } from '@/models/feedback';
import axios from 'axios';

jest.mock('axios', () => {
  return {
    put: jest.fn().mockResolvedValue({ data: {} })
  }
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('FeedbackCard', () => {
  test('renders name as card header', () => {
    const feedback: Feedback = {
      id: 5,
      name: 'John',
      email: 'john@test.com',
      description: 'new description',
      score: 3,
      createdAt: '1705211022970',
      updatedAt: '1705230916880'
    }
    render(<FeedbackCard key={1} feedback={feedback} updateFeedBacks={() => {}} />);
    const titleElement = screen.getByText(/John/i);
    const scoreElement = screen.getByText(/3/i);
    expect(titleElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });

  test('click upVote btn will call make an axios put request', async () => {
    const feedback: Feedback = {
      id: 5,
      name: 'John',
      email: 'john@test.com',
      description: 'new description',
      score: 3,
      createdAt: '1705211022970',
      updatedAt: '1705230916880'
    }
    render(<FeedbackCard key={1} feedback={feedback} updateFeedBacks={() => {}} />);
    const upVoteBtn = screen.getByTestId('upVote');
    const updateFeedbackSpy = jest.spyOn(axios, 'put');
    fireEvent.click(upVoteBtn);
    await waitFor(() => {
      expect(upVoteBtn).toBeInTheDocument();
      expect(updateFeedbackSpy).toHaveBeenCalled();
    });
  });

  test('click downVote btn will call make an axios put request', async () => {
    const feedback: Feedback = {
      id: 5,
      name: 'John',
      email: 'john@test.com',
      description: 'new description',
      score: 3,
      createdAt: '1705211022970',
      updatedAt: '1705230916880'
    }
    render(<FeedbackCard key={1} feedback={feedback} updateFeedBacks={() => {}} />);
    const downVoteBtn = screen.getByTestId('downVote');
    const updateFeedbackSpy = jest.spyOn(axios, 'put');
    fireEvent.click(downVoteBtn);
    await waitFor(() => {
      expect(downVoteBtn).toBeInTheDocument();
      expect(updateFeedbackSpy).toHaveBeenCalled();
    });
  });
});
