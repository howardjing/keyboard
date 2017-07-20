import * as React from 'react';
import { List, Set } from 'immutable';
import styled from 'styled-components';
import * as Color from 'color';
import Editor from './editor';
import Keyboard, { Keycap } from '../../domains/keycap-editor/keyboard';
import {
	Section,
} from '../../domains/keycap-editor/reducer';
import KeyboardComponent from './keyboard';
import Swatches from './swatches';
import Swatch from './swatch';
import Input from './_common/input';
import ColorInput from './color-input';
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

	handleBackgroundColorChange = (color: Color.Color, preview?: boolean) => {
		const { handleBackgroundColorChange } = this.props;
		handleBackgroundColorChange(color, preview);
	};

	handleCaseColorChange = (color: Color.Color, preview?: boolean) => {
		const { handleCaseColorChange } = this.props;
		handleCaseColorChange(color, preview);
	};

	handleLegendColorChange = (color: Color.Color, preview?: boolean) => {
		const { handleLegendColorChange } = this.props;
		handleLegendColorChange(color, preview);
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
		} = this.props;
		const { tabIndex } = this.state;

		const backgroundColorString = backgroundColor ? toRgb(backgroundColor) : '';
		const legendColorString = legendColor ? toRgb(legendColor) : '';
		const caseColor = keyboard.getCaseColor();

		return (
			<div>
				<KeyboardComponent
					keyboard={keyboard}
				/>
				<EditorWrapper>
					<div>
						<Editor
							keyboard={keyboard}
							activeKeys={activeKeys}
						/>
					</div>
					<Form>
						<InputGroup>
							<label>
								<Label>Case color</Label>
								<ColorInput color={caseColor} onColorChange={this.handleCaseColorChange} />
							</label>
						</InputGroup>

						<TabbedSelect
							value={section}
							onSelect={handleSectionChange}
						>
							<Tab value="base">Base</Tab>
							<Tab value="modifiers">Modifiers</Tab>
							<Tab value="custom" disabled>Custom</Tab>
						</TabbedSelect>

						<InputGroup>
							<label>
								<Label>Background color</Label>
								<ColorInput color={backgroundColor} onColorChange={this.handleBackgroundColorChange}>
									<Swatches onClick={this.handleBackgroundColorChange} />
								</ColorInput>
							</label>
						</InputGroup>
						<InputGroup>
							<label>
								<Label>Legend color</Label>
								<ColorInput color={legendColor} onColorChange={this.handleLegendColorChange}>
									<Swatches onClick={this.handleLegendColorChange} />
								</ColorInput>
							</label>
						</InputGroup>
					</Form>
				</EditorWrapper>
			</div>
		);
	}
}

const EditorWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const Form = styled.div`
	max-width: 600px;
`;

const InputGroup = styled.div`
	margin: 10px;
`;

const Label = styled.span`
	display: inline-block;
	width: 140px;
`;

export default KeycapEditor;

