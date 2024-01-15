import Home from '.';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios', () => {
  return {
    get: jest.fn().mockResolvedValue({ data: {} })
  }
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Home Component Tests', () => {
  test('renders Student Feedback Component title', () => {
    render(<Home />);
    const titleElement = screen.getByText(/Student Feedback Form/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('make an axios get request on component init', () => {
    render(<Home />);
    expect(axios.get).toHaveBeenCalled();
  });

  test('renders open feedback form button', () => {
    render(<Home />);
    const  feedbackFormBtn = screen.getByTestId('openFeedbackFormBtn');
    expect(feedbackFormBtn).toBeInTheDocument();
  });

  test('clicking open feedback form button will show the feedback form', () => {
    render(<Home />);
    const  feedbackFormBtn = screen.getByTestId('openFeedbackFormBtn');
    fireEvent.click(feedbackFormBtn);
    const titleElement = screen.getByText(/Student Feedback/i);
    const nameLabel = screen.getByText(/Name/i);
    const emailLabel = screen.getByText(/Email/i);
    const descriptionLabel = screen.getByText(/Description/i);
    expect(titleElement).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(descriptionLabel).toBeInTheDocument();
  });
});
