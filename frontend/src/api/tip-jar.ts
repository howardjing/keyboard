import Keeb from './keeb';

const tip = ({ token, cents, email }: TipData) => {
  return Keeb.post('/api/tip-jar', {
    token: token.id,
    cents,
    email: email,
  });
}

export type TipData = {
  token: stripe.Token,
  cents: number,
  email: string,
};

export default { tip };
