/**
 * Safely computes dynamic verification date ("Current Month - 1" with an 8-day rollover lag)
 * exclusively for preset-driven compliance specifications.
 */
export const getVerificationDate = () => {
  const d = new Date();
  const monthOffset = d.getDate() < 8 ? 2 : 1;
  d.setMonth(d.getMonth() - monthOffset);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
