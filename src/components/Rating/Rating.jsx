import css from './Rating.module.css';

export default function Rating({ value, variant = 'badge' }) {
  const rounded = Math.round(value * 10); 

  let colorClass = '';
  if (rounded >= 70) colorClass = css.green;
  else if (rounded >= 50) colorClass = css.yellow;
  else colorClass = css.red;

  const className =
    variant === 'inline' ? `${css.inlineRating} ${colorClass}` : `${css.scoreBadge} ${colorClass}`;

  return (
    <div className={className}>
      <span>{rounded}<sup>%</sup></span>
    </div>
  );
}
