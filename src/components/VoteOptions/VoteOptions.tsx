import type { VoteType } from '../../types/votes';
import css from './VoteOptions.module.css';

interface VoteOptionsProps {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}

export default function VoteOptions({ onVote, onReset, canReset }: VoteOptionsProps) {
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const type = event.currentTarget.textContent?.toLowerCase();
    if (!type) return;
    const validTypes: VoteType[] = ['good', 'neutral', 'bad'];
    if (!validTypes.includes(type as VoteType)) {
      return;
    }
    onVote(type as VoteType);
  };
  return (
    <div className={css.container}>
      <button className={css.button} onClick={handleClickBtn}>
        Good
      </button>
      <button className={css.button} onClick={handleClickBtn}>
        Neutral
      </button>
      <button className={css.button} onClick={handleClickBtn}>
        Bad
      </button>
      {canReset && (
        <button className={`${css.button} ${css.reset}`} onClick={onReset}>
          Reset
        </button>
      )}
    </div>
  );
}
