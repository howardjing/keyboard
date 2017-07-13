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
import Input from './_common/input';
import { TabbedSelect, Tab } from './_common/tabbed-select';
import Swatch from './swatches/swatch';
import ColorPicker from './color-picker';

interface PropTypes {
	keyboard: Keyboard,
	activeKeys: Set<Keycap>
	section: Section,
	backgroundColor: Color | null,
	legendColor: Color | null,
	handleSectionChange: (section: Section) => any,
	handleBackgroundColorChange: (color: Color, preview?: boolean) => any,
	handleCaseColorChange: (color: Color, preview?: boolean) => any,
	handleLegendColorChange: (color: Color, preview?: boolean) => any,
}

interface State {
	tabIndex: number,
};

const toRgb = (color: Color): string => (
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

	handleColor = (fn: (color: Color) => any, color: string) => {
		try {
			fn(Color(color))
		} catch (e) {

		}
	};

	handleBackgroundColorChange = (color: string) => {
		const { handleBackgroundColorChange } = this.props;
		this.handleColor(handleBackgroundColorChange, color);
	};

	handleCaseColorChange = (color: string) => {
		const { handleCaseColorChange } = this.props;
		this.handleColor(handleCaseColorChange, color);
	};

	handleLegendColorChange = (color: string) => {
		const { handleLegendColorChange } = this.props;
		this.handleColor(handleLegendColorChange, color);
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
		const caseColorString = toRgb(keyboard.getCaseColor());

		return (
			<div>
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
								<Input
									type="text"
									value={caseColorString}
									placeholder="#1a1a1a"
									onChange={this.handleCaseColorChange}
								/>
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
								<Input
									type="text"
									value={backgroundColorString}
									onChange={this.handleBackgroundColorChange}
									placeholder="#fff"
								/>
								<Swatches onClick={this.handleBackgroundColorChange} />
							</label>
						</InputGroup>
						<InputGroup>
							<label>
								<Label>Legend color</Label>
								<Input
									type="text"
									value={legendColorString}
									placeholder="#000"
									onChange={this.handleLegendColorChange}
								/>
								<Swatches onClick={this.handleLegendColorChange} />
							</label>
						</InputGroup>

						<InputGroup>
							<label>
								<Label>Background color</Label>
								<Swatch
									color={backgroundColorString}
									height={20}
									width={100}
								/>
								<ColorPicker
									color={backgroundColor}
									onColorChange={handleBackgroundColorChange}
								/>
							</label>
						</InputGroup>
					</Form>
				</EditorWrapper>
				<h3>Preview</h3>
				<KeyboardComponent
					keyboard={keyboard}
				/>
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

