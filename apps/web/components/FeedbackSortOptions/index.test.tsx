import FeedbackSortOptions from '@/components/FeedbackSortOptions/index';
import { render, screen } from '@testing-library/react';

describe('FeedbackSortOptions', () => {
  test('renders FeedbackSortOptions correctly', () => {
    render(<FeedbackSortOptions onSelectedOption={() => {}} />);
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();
  });
});
