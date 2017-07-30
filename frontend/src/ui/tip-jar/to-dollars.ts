const toDollars = (cents: number): string => (
  cents % 100 === 0 ?
    (cents / 100).toFixed(0) :
    (cents / 100).toFixed(2)
);

export default toDollars;
