import * as React from 'react';
import * as Color from 'color';
import { List, Set } from 'immutable';
import styled from 'styled-components';
import Editor from './editor';
import Keyboard, { Keycap, KeycapColor } from '../../domains/keycap-editor/keyboard';
import { buildShareUrl } from '../../domains/keycap-editor/sharing';
import {
	Section,
} from '../../domains/keycap-editor/reducer';
import KeyboardComponent from './keyboard';
import Swatches from './swatches';
import Swatch from './swatch';
import Input from '../_common/input';
import ColorInput from './color-input';
import ShareInput from './share-input';
import { TabbedSelect, Tab } from './_common/tabbed-select';

interface PropTypes {
	keyboard: Keyboard,
	activeKeys: Set<Keycap>
	section: Section,
	backgroundColor: Color.Color | null,
	legendColor: Color.Color | null,
	handleSectionChange: (section: Section) => any,
	handleBackgroundColorChange: (color: Color.Color, preview?: boolean) => any,
	handleCaseColorChange: (color: Color.Color, preview?: boolean) => any,
	handleLegendColorChange: (color: Color.Color, preview?: boolean) => any,
	handleShiftColor: (from: Color.Color, to: Color.Color, preview?: boolean) => any,
	selectKeycapsWithColor: (color: Color.Color) => any,
}

interface State {
	tabIndex: number,
};

const toRgb = (color: Color.Color): string => (
	color.rgb().string()
);

const SECTIONS: Section[] = [
	'base',
	'modifiers',
	'custom',
];

const SECTIONS_MAP: { [section: string]: number } = (() => {
	const mapping = {};

	SECTIONS.forEach((section, i) => {
		mapping[section] = i;
	});

	return mapping;
})();

const mapSectionToTabIndex = (section: Section): number => SECTIONS_MAP[section];
const mapTabIndexToSection = (index: number): Section => {
	if (index < 0 || index >= SECTIONS.length) {
		throw new Error(`invalid index: ${index}`);
	}

	return SECTIONS[index];
};

class KeycapEditor extends React.PureComponent<PropTypes, State> {

	state = {
		tabIndex: 0,
	};

	componentWillMount() {
		const { section } = this.props;

		this.setState(() => ({
			tabIndex: mapSectionToTabIndex(section),
		}))
	}

	handleSectionChange = (tabIndex: number) => {
		const { handleSectionChange } = this.props;
		const section = mapTabIndexToSection(tabIndex);
		handleSectionChange(section);

		this.setState(() => ({
			tabIndex,
		}));
	};

	render() {
		const {
			keyboard,
			activeKeys,
			section,
			backgroundColor,
			legendColor,
			handleSectionChange,
			handleBackgroundColorChange,
			handleLegendColorChange,
			handleShiftColor,
			handleCaseColorChange,
			selectKeycapsWithColor,
		} = this.props;
		const { tabIndex } = this.state;

		const backgroundColorString = backgroundColor ? toRgb(backgroundColor) : '';
		const legendColorString = legendColor ? toRgb(legendColor) : '';
		const caseColor = keyboard.getCaseColor();
		const pallet = keyboard.getPallet();
		const shareUrl = buildShareUrl(keyboard);

		return (
			<Wrapper>
				<Main>
					<KeyboardWrapper>
						<Header>Preview</Header>
						<KeyboardComponent
							keyboard={keyboard}
						/>
					</KeyboardWrapper>
					<div>
						<Header>Editor</Header>
						<EditorWrapper>
							<div>
								<Editor
									keyboard={keyboard}
									activeKeys={activeKeys}
								/>
							</div>
							<Form>
								<FormSection>
									<InputGroup>
										<Label>Case</Label>
										<ColorInput color={caseColor} onColorChange={handleCaseColorChange} />
									</InputGroup>
								</FormSection>

								<TabbedSelect
									value={section}
									onSelect={handleSectionChange}
								>
									<Tab value="base">Base</Tab>
									<Tab value="modifiers">Modifiers</Tab>
									<Tab value="custom" disabled>Custom</Tab>
								</TabbedSelect>
								<InputGroup>
									<Label>Background</Label>
									<ColorInput color={backgroundColor} onColorChange={handleBackgroundColorChange}>
										<Swatches onClick={handleBackgroundColorChange} />
									</ColorInput>
								</InputGroup>
								<InputGroup>
									<Label>Legend</Label>
									<ColorInput color={legendColor} onColorChange={handleLegendColorChange}>
										<Swatches onClick={handleLegendColorChange} />
									</ColorInput>
								</InputGroup>
							</Form>
						</EditorWrapper>
					</div>
				</Main>
				<Secondary>
					<div>
						<Header>Share</Header>
						<StyledShare url={shareUrl} />
					</div>
					<div>
					<Header>Pallet</Header>
						{pallet.map((color, i) => (
							<div key={i}>
								<ColorInput
									color={color}
									onOpen={() => selectKeycapsWithColor(color)}
									onColorChange={(to, preview) => handleShiftColor(color, to, preview)}
								>
									<Swatches onClick={to => handleShiftColor(color, to)} />
								</ColorInput>
							</div>
						))}
					</div>
			</Secondary>
			</Wrapper>
		);
	}
}

const Wrapper = styled.div`
	display: flex;
`;

const Main = styled.div`
	flex-grow: 1;
`;

// TODO: be less lazy, don't just text-align: right
const Secondary = styled.div`
`;

const Header = styled.h3`
	margin: 0 0 10px 0;
`;

const KeyboardWrapper = styled.div`
	margin-bottom: 20px;s
`;

const EditorWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const Form = styled.div`
	max-width: 600px;
	margin: 0 20px;
	background: #fffff5;
	border-radius: 5px;
	padding: 20px;
`;

const FormSection = styled.div`
	margin-bottom: 20px;
`;

const InputGroup = styled.label`
	display: flex;
	margin: 5px 10px;
`;

const Label = styled.span`
	display: inline-block;
	flex: 0 0 auto;
	width: 100px;
`;

const StyledShare = styled(ShareInput)`
	margin-bottom: 20px;
`;

export default KeycapEditor;

