/**
 * asynchronously loads stripe js
 */

// <script src="https://js.stripe.com/v3/" async></script>
declare var process: any;
let promise;
const key = process.env.CONFIG.STRIPE_API_KEY;

const load = (): Promise<stripe.Stripe> => {
  if (!promise) {
    promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        const stripe = Stripe(key)
        resolve(stripe);
      };
      script.onerror = reject;
      document.body.appendChild(script);
    });
  }

  return promise;
};

export default {
  load,
};
