import { useState } from 'react';
import CafeInfo from '../CafeInfo/CafeInfo.tsx';
import Notification from '../Notification/Notification.tsx';
import VoteOptions from '../VoteOptions/VoteOptions.tsx';
import VoteStats from '../VoteStats/VoteStats.tsx';
import type { Votes, VoteType } from '../../types/votes.ts';
import css from './App.module.css';

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;
  const canReset = totalVotes ? true : false;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={canReset} />
      {totalVotes > 0 && (
        <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />
      )}
      {totalVotes === 0 && <Notification />}
    </div>
  );
}
