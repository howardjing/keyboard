import * as React from 'react';
import { Record } from 'immutable';
import styled from 'styled-components';
import * as CardIcon from 'react-icons/lib/fa/credit-card'
import FixedAmount from './fixed-amount';
import CustomAmount from './custom-amount';
import Input from '../_common/input';
import Stripe from '../../api/stripe';
import { TipData } from '../../api/tip-jar';
import toDollars from './to-dollars';

enum TipType {
  Preset = 'PRESET',
  Custom = 'CUSTOM',
}

type PropTypes = {
  onSubmit: (tip: TipData) => any,
};

// TODO: this was bad idea, really easy to override errors this way
class TipJarError extends Record({
  server: '',
  email: '',
  card: '',
  zip: '',
}) {
  getServer() {
    return this.get('server');
  }
  setServer(server): this {
    return this.set('server', server) as this;
  }
  getEmail() {
    return this.get('email');
  }
  setEmail(email): this {
    return this.set('email', email) as this;
  }
  getCard() {
    return this.get('card');
  }
  setCard(card): this {
    return this.set('card', card) as this;
  }
  getZip() {
    return this.get('zip');
  }
  setZip(zip): this {
    return this.set('zip', zip) as this;
  }
  hasExistingErrors() {
    // NOTE: specifically ignore server errors
    return !this.get('email') &&
      !this.get('card') &&
      !this.get('zip');
  }
}

const BLANK_EMAIL_ERROR = 'Please enter an email.';
const BLANK_ZIP_ERROR = 'Please enter a zip code.';
const STRIPE_PROCESSING_ERROR = 'Error processing your card. Please try again later.';

class TipJar extends React.PureComponent<PropTypes, {
  stripe: stripe.Stripe | null,
  card: stripe.Card | null,
  tipType: TipType,
  presetAmount: number,
  customAmount: number | null,
  email: string,
  zip: string,
  errors: TipJarError,
  finished: boolean,
}> {

  state = {
    stripe: null,
    card: null,
    presetAmount: 500,
    customAmount: null,
    tipType: TipType.Preset,
    syncing: false,
    name: '',
    email: '',
    zip: '',
    errors: new TipJarError(),
    finished: false,
  };

  componentWillMount() {
    Stripe.load().then(stripe => {
      this.setState(() => ({
        stripe,
      }));
    });
  }

  loadStripeCard = (el) => {
    const { stripe } = this.state;
    if (!el || !stripe) { return; }

    // build card
    const elements = stripe.elements();
    const card = elements.create('card', {
      hidePostalCode: true,
      style: CARD_STYLES
    });

    this.setState(() => ({
      card,
    }));

    card.mount(el);

    // handle errors
    card.addEventListener('change', ({ error }) => {
      const stripeError = error ? error.message : '';
      const { errors } = this.state;
      this.setState(() => ({
        errors: errors.setCard(stripeError),
      }));
    });
  };

  choosePresetAmount = (cents: number) => {
    this.setState(() => ({
      presetAmount: cents,
      tipType: TipType.Preset,
    }));
  };

  handleCustomClick = () => {
    const { customAmount } = this.state;

    // if no custom amount was entered, don't choose tip custom
    if (customAmount === null) { return; }

    this.setState(() => ({
      tipType: TipType.Custom,
    }));
  }

  chooseCustomAmount = (cents: number) => {
    const tipType = cents === null ? TipType.Preset : TipType.Custom;

    this.setState(() => ({
      customAmount: cents,
      tipType,
    }));
  }

  getChosenAmount = () => {
    const { tipType, presetAmount, customAmount } = this.state;
    return customAmount === null || tipType === TipType.Preset ?
      presetAmount :
      customAmount;
  };

  setName = (name: string) => {
    this.setState(() => ({
      name,
    }))
  }

  setEmail = (email: string) => {
    const emailError = email ? '' : BLANK_EMAIL_ERROR;
    const { errors } = this.state;
    this.setState(() => ({
      email,
      errors: errors.setEmail(emailError),
    }));
  };

  setZip = (zip: string) => {
    const zipError = zip ? '' : BLANK_ZIP_ERROR;
    const { errors } = this.state;
    this.setState(() => ({
      zip,
      errors: errors.setZip(zipError),
    }));
  };

  setSyncing = (syncing: boolean) => (
    this.setState(() => ({
      syncing,
    }))
  );

  isValid = () => {
    const { zip, email, errors } = this.state;
    const valid = (
      !this.validateAmount(this.getChosenAmount()) && errors.hasExistingErrors()
    );

    // TODO: kinda gross calling setState from here
    let newErrors = errors;
    if (!zip) {
      newErrors = newErrors.setZip(BLANK_ZIP_ERROR);
    }

    if (!email) {
      newErrors = newErrors.setEmail(BLANK_EMAIL_ERROR);
    }

    this.setState(() => ({
      errors: newErrors,
    }));

    return valid && errors === newErrors;
  }

  validateAmount = (cents) => {
    if (cents === null) {
      return 'Please choose an amount.';
    }

    if (cents < 100) {
      return 'Minimum amount is $1.';
    }

    if (cents > 10000) {
      return 'Maximum amount is $100.';
    }

    return '';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.isValid()) { return; }

    const { onSubmit } = this.props;
    const { stripe, card, name, email, zip, errors } = this.state;

    // TODO: don't think this should happen
    if (!stripe || !card) {
      this.setState(() => ({
        errors: errors.setServer(STRIPE_PROCESSING_ERROR),
      }));
      return;
    }

    this.setSyncing(true);

    stripe.createToken(card, {
      name,
      address_zip: zip,
    }).then(({ token, error }) => {
      // clientside errors
      if (error) {
        throw error;
      // we're good, clear errors, call backend
      } else {
        this.setState(() => ({
          errors: new TipJarError(),
        }));

        return onSubmit({
          token,
          email,
          cents: this.getChosenAmount(),
        });
      }
    })
    .then((response) => {
      this.setSyncing(false);
      this.setState(() => ({
        finished: true,
      }));
    }).catch((error) => {
      if (error.code === 'invalid_email') {
        this.setState(() => ({
          errors: errors.setEmail('Invalid email.'),
        }));
      } else if (error.code === 'incorrect_zip') {
        this.setState(() => ({
          errors: errors.setZip('Invalid zip.'),
        }));
      } else {
        this.setState(() => ({
          errors: errors.setServer(STRIPE_PROCESSING_ERROR),
        }));
      }

      this.setSyncing(false);
    });
  };

  render() {
    const {
      stripe,
      tipType,
      customAmount,
      name,
      email,
      zip,
      errors,
      syncing,
      finished,
    } = this.state;

    const serverError = errors.getServer();
    const stripeError = errors.getCard();
    const zipError = errors.getZip();
    const emailError = errors.getEmail();

    const cents = this.getChosenAmount();
    const isPresetTip = tipType === TipType.Preset;
    const isCustomTip= !isPresetTip;
    const amountError = this.validateAmount(cents);

    const form = stripe ?
      <Form onSubmit={this.handleSubmit} noValidate>
        <ErrorMessage>{serverError}</ErrorMessage>
        <Section>
          <SectionLabel>Amount</SectionLabel>
          <div>
            <FixedAmount
              cents={200}
              onClick={this.choosePresetAmount}
              active={isPresetTip && cents === 200}
            />
            <FixedAmount
              cents={500}
              onClick={this.choosePresetAmount}
              active={isPresetTip && cents === 500}
            />
            <FixedAmount
              cents={1000}
              onClick={this.choosePresetAmount}
              active={isPresetTip && cents === 1000}
            />
            <CustomAmount
              cents={customAmount}
              onClick={this.handleCustomClick}
              onChange={this.chooseCustomAmount}
              active={isCustomTip}
            />
          </div>
          <ErrorMessage>{amountError}</ErrorMessage>
        </Section>
        <Section>
          <SectionLabel>Payment Info</SectionLabel>
          <InputGroupWrapper>
            <InputGroup>
              <Label>Name</Label>
              <StyledInput
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={this.setName}
              />
            </InputGroup>
          </InputGroupWrapper>

          <InputGroupWrapper>
            <InputGroup>
              <Label>Email</Label>
              <StyledInput
                type="text"
                placeholder="jane.doe@example.com"
                value={email}
                onChange={this.setEmail}
              />
            </InputGroup>
            <ErrorMessage offset>{emailError}</ErrorMessage>
          </InputGroupWrapper>

          <InputGroupWrapper>
            <InputGroup>
              <Label>Card</Label>
              <CardInputWrapper>
                <CardInput innerRef={this.loadStripeCard} />
              </CardInputWrapper>
            </InputGroup>
            <ErrorMessage offset>{stripeError}</ErrorMessage>
          </InputGroupWrapper>

          <InputGroupWrapper>
            <InputGroup>
              <Label>Zip</Label>
                <StyledInput
                  type="text"
                  placeholder="12345"
                  value={zip}
                  onChange={this.setZip}
                />
            </InputGroup>
            <ErrorMessage offset>{zipError}</ErrorMessage>
          </InputGroupWrapper>
        </Section>
        <Submit
          type="submit"
          disabled={syncing}
        >
          <CardIcon /><IconLabel>Pay ${toDollars(cents)} with Card</IconLabel>
        </Submit>
        { syncing ? <span>processing...</span> : null}
      </Form> :
      null;

    return (
      finished ?
        <h1>Thanks! Now go make more keyboards!</h1> :
        <div>
          <Header>Tip Jar</Header>
          <p>Found the site useful? Give money!</p>
          <FormWrapper>
            {form}
          </FormWrapper>
          <p>Payments are processed by <a href="https://www.stripe.com">Stripe</a>.</p>
        </div>
    )
  }
}

const Header = styled.h2`
  margin: 0;
`;

const FormWrapper = styled.div`
  display: flex;
`;

const Form = styled.form`
  width: 400px;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Section = styled.div`
  margin: 0 0 10px 0;
`;

const SectionLabel = styled.h3`
  margin: 0 0 10px 0;
`;

const InputGroupWrapper = styled.div`
  margin-bottom: 10px;
`;

const InputGroup = styled.label`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  flex: 0 0 auto;
  display: inline-block;
  width: 50px;
`;

const StyledInput = styled(Input)`
  flex: 1 0 auto;
  border: 1px solid #aaa;
  padding: 5px;
  font-size: 16px;
`;

const CardInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

const CardInput = styled.div`
  border: 1px solid #aaa;
  padding: 5px;
  background-color: white;
`;

const ErrorMessage = styled.div`
  margin-left: ${({ offset }: { offset?: boolean }) => offset ? '50px' : 0 };
  color: #eb1c26;
`;

const Submit = styled.button`
  margin: 10px 0 0 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const IconLabel = styled.span`
  vertical-align: middle;

  &::before {
    content: ' ';
  }
`;

const CARD_STYLES = {
  base: {
    fontSize: '16px',
  },
};

export default TipJar;
