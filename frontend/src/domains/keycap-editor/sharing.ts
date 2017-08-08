import { Map } from 'immutable';
import * as Color from 'color';
import Keyboard, { KeycapColor } from './keyboard';

declare var process: any;
const ROOT_URL = process.env.CONFIG.ROOT_URL;

/**
 * returns an object that will be serialized as part of url params
 */
const toKeycapColorParam = (keycapColor: KeycapColor) => ({
	background: keycapColor.background.hex(),
	legend: keycapColor.legend.hex(),
});

/**
 * rehydrates keycap color param
 */
const fromKeycapColorParam = (color: {
	background: string,
	legend: string,
}): KeycapColor => ({
	background: Color(color.background),
	legend: Color(color.legend),
});

const buildShareUrl = (keyboard: Keyboard): string => {
	const {
		base,
		modifier,
		overrides,
	} = keyboard.getColors();

	// replace colors with hex representations
	const pojo = {
		base: toKeycapColorParam(base),
		modifier: toKeycapColorParam(modifier),
		overrides: overrides.map(toKeycapColorParam).toJS(),
	};

	const colors = encodeURIComponent(JSON.stringify(pojo));
	return `${ROOT_URL}?colors=${colors}`;
}

const extractColors = (search: string): {
	base: KeycapColor,
	modifier: KeycapColor,
	overrides: Map<string, KeycapColor>,
} | null => {
	const colors = new URLSearchParams(search).get('colors');
	if (!colors) { return null; }

	try {
		const json = JSON.parse(colors);
		return {
			base: fromKeycapColorParam(json.base),
			modifier: fromKeycapColorParam(json.modifier),
			overrides: Map(json.overrides).map(fromKeycapColorParam) as Map<string, KeycapColor>,
		};
	} catch (e) {
		return null;
	}
}

export {
	buildShareUrl,
	extractColors,
};
