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
import Swatch from './swatches/swatch';
import ColorPicker from './color-picker';

interface PropTypes {
	keyboard: Keyboard,
	activeKeys: Set<Keycap>
	section: Section,
	backgroundColor: Color | null,
	legendColor: Color | null,
	handleSectionChange: (e: React.FormEvent<HTMLSelectElement>) => any,
	handleBackgroundColorChange: (color: Color, preview?: boolean) => any,
	handleCaseColorChange: (color: Color, preview?: boolean) => any,
	handleLegendColorChange: (color: Color, preview?: boolean) => any,
}

const toRgb = (color: Color): string => (
	color.rgb().string()
);

class KeycapEditor extends React.PureComponent<PropTypes, {}> {
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
								<Label>Section</Label>
								<select
									value={section}
									onChange={handleSectionChange}
								>
									<option value="base">Base</option>
									<option value="modifiers">Modifiers</option>
									<option
										value="custom"
										disabled
									>
										Custom
									</option>
								</select>
							</label>
						</InputGroup>
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
								<Label>Case color</Label>
								<Input
									type="text"
									value={caseColorString}
									placeholder="#1a1a1a"
									onChange={this.handleCaseColorChange}
								/>
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

