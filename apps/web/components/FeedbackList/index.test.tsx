import FeedbackList from '@/components/FeedbackList/index';
import { render, screen } from '@testing-library/react';
import { Feedback } from '@/models/feedback';

describe('FeedbackList', () => {
  test('renders Feedback List when feedbacks is not empty array', () => {
    const feedbacks: Feedback[] = [{
      id: 5,
      name: 'John',
      email: 'john@test.com',
      description: 'new description',
      score: 3,
      createdAt: '1705211022970',
      updatedAt: '1705230916880'
    }];
    render(<FeedbackList feedbacks={feedbacks} updateScore={() => {}} />);
    const titleElement = screen.getByText(/John/i);
    const scoreElement = screen.getByText(/3/i);
    expect(titleElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument();
  });
});
