import * as React from 'react';
import styled from 'styled-components';
import * as CardIcon from 'react-icons/lib/fa/credit-card'
import FixedAmount from './fixed-amount';
import CustomAmount from './custom-amount';
import Input from '../_common/input';
import Stripe from '../../api/stripe';
import toDollars from './to-dollars';

enum TipType {
  Preset = 'PRESET',
  Custom = 'CUSTOM',
}

type PropTypes = {
  syncing: boolean,
  setSyncing: (syncing: boolean) => any,
  onChange: (token: stripe.Token, cents: number) => any,
};

const ZIP_ERROR = 'Please enter a zip code.';
const STRIPE_PROCESSING_ERROR = 'Error processing your card. Please try again later.';

class TipJar extends React.PureComponent<PropTypes, {
  stripe: stripe.Stripe | null,
  card: stripe.Card | null,
  tipType: TipType,
  presetAmount: number,
  customAmount: number | null,
  name: string,
  zip: string,
  stripeError: string,
  zipError: string,
}> {

  state = {
    stripe: null,
    card: null,
    presetAmount: 500,
    customAmount: null,
    tipType: TipType.Preset,
    name: '',
    zip: '',
    stripeError: '',
    zipError: '',
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
      this.setState(() => ({
        stripeError,
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
    }));
  };

  setZip = (zip: string) => {
    const zipError = zip ? '' : ZIP_ERROR;
    this.setState(() => ({
      zip,
      zipError,
    }));
  };

  isValid = () => {
    const { zip, zipError, stripeError } = this.state;
    const valid = (
      !this.validateAmount(this.getChosenAmount()) &&
      !stripeError &&
      !!zip &&
      !zipError
    );

    // TODO: kinda gross calling setState from here
    if (!zip) {
      this.setState(() => ({
        zipError: ZIP_ERROR,
      }));
    }

    return valid;
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

    const { onChange, setSyncing } = this.props;
    const { stripe, card, name, zip } = this.state;

    // TODO: don't think this should happen
    if (!stripe || !card) {
      this.setState(() => ({
        stripeError: STRIPE_PROCESSING_ERROR,
      }));
      return;
    }

    setSyncing(true);

    stripe.createToken(card, {
      name,
      address_zip: zip,
    }).then(({ token, error }) => {
      // clientside errors
      if (error) {
        if (error.code === 'invalid_zip') {
          this.setState(() => ({
            zipError: error.message,
          }));
        } else {
          this.setState(() => ({
            stripeError: error.message,
          }));
        }

      // we're good
      } else {
        onChange(token, this.getChosenAmount());
      }

      setSyncing(false);
    }).catch(() => {
      this.setState(() => ({
        stripeError: STRIPE_PROCESSING_ERROR,
      }));

      setSyncing(false);
    });
  };

  render() {
    const {
      syncing,
    } = this.props;

    const {
      stripe,
      tipType,
      customAmount,
      name,
      zip,
      stripeError,
      zipError,
    } = this.state;

    const cents = this.getChosenAmount();
    const isPresetTip = tipType === TipType.Preset;
    const isCustomTip= !isPresetTip;
    const amountError = this.validateAmount(cents);

    const form = stripe ?
      <Form onSubmit={this.handleSubmit} noValidate>
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
      <div>
        <Header>Tip Jar</Header>
        <p>Found the site useful? Give money!</p>
        <FormWrapper>
          {form}
        </FormWrapper>
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
  max-width: 320px;
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
