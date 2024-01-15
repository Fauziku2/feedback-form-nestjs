import FeedbackCard from '@/components/FeedbackCard';
import { Feedback } from '@/models/feedback';

export default function FeedbackList(props: { feedbacks: Feedback[], updateScore: (data: Feedback) => void }) {
  const updateScore = (data: Feedback) => props.updateScore(data);
  return (
    <div>
      {
        !!props.feedbacks.length && props.feedbacks.map((feedback: Feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} updateFeedBacks={updateScore}  />
        ))
      }
    </div>
  )
}
