import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';
import Pointer from './pointer';
import HuePicker from './hue-picker';

const POINT_SIZE = 2;
const CANVAS_SIZE = POINT_SIZE * 100;

const clamp = (n: number, min: number, max: number): number => (
  Math.min(Math.max(n, min), max)
);

const getCoordinatesFromColor = (color: Color.Color): { x: number, y: number } => {
  const hsl = color.hsl();
  const x = hsl.saturationl() * POINT_SIZE;
  const y = (100 - hsl.lightness()) * POINT_SIZE;

  return { x, y };
};

const getHue = (color: Color.Color | null) => color && color.hue();

class ColorGradient extends React.Component<{
  color: Color.Color | null,
  onColorChange: (color: Color.Color, preview?: boolean) => any,
}, {
  canvas?: HTMLCanvasElement,
  isMouseDown: boolean,
}> {

  state = {
    canvas: null,
    x: 0,
    y: 0,
    isMouseDown: false,
  };

  componentWillReceiveProps(nextProps) {
    const { color: nextColor } = nextProps;
    const { color } = this.props;

    if (nextColor !== color && nextColor && getHue(nextColor) !== getHue(color)) {
      const { canvas } = this.state;
      if (canvas) {
        this.drawGradient(canvas, nextColor);
      }
    }
  }

  handleCanvas = (canvas: HTMLCanvasElement | null) => {
    this.setState(() => ({
      canvas,
    }));

    if (!canvas) { return; }
    const { color } = this.props;
    this.drawGradient(canvas, color);
  };

  drawGradient = (canvas: HTMLCanvasElement, color: Color.Color) => {
    const ctx = canvas.getContext('2d');
    const hue = color.hue()

    for (let i=0; i < 100; i++) {
      for (let j=0; j < 100; j++) {
        ctx.fillStyle = `hsl(${hue}, ${i}%, ${100 - j}%)`;

        const x = i * POINT_SIZE;
        const y = j * POINT_SIZE;

        ctx.fillRect(x, y, POINT_SIZE, POINT_SIZE);
      }
    }
  }

  pickColor = (canvas, clientX, clientY, preview: boolean = false) => {
    const { top, left } = canvas.getBoundingClientRect();
    const relativeLeft = Math.floor(clientX - left);
    const relativeRight = Math.floor(clientY - top);

    const x = clamp(relativeLeft, 0, CANVAS_SIZE);
    const y = clamp(relativeRight, 0, CANVAS_SIZE);

    // update color
    const saturation = x / POINT_SIZE;
    const lightness = 100 - y / POINT_SIZE;

    const { color, onColorChange } = this.props;
    const hue = color.hue();
    onColorChange(Color({ h: hue, s: saturation, l: lightness }), preview);
  };

  cleanup = () => {
    document.removeEventListener('mouseup', this.handleMouseUp as any);
    window.removeEventListener('blur', this.handleMouseUp as any);
  };

  handleMouseUp = (e: React.MouseEvent<any>) => {
    const { canvas } = this.state;
    if (canvas) {
      this.pickColor(canvas, e.clientX, e.clientY);
    }

    this.setState(() => ({
      isMouseDown: false,
    }));

    this.cleanup();
  };

  handleMouseDown = () => {
    this.setState(() => ({
      isMouseDown: true,
    }));

    document.addEventListener('mouseup', this.handleMouseUp as any);
    window.addEventListener('blur', this.handleMouseUp as any);
  };

  handleMouseMove = (e: React.MouseEvent<any>) => {
    const { canvas, isMouseDown } = this.state;
    if (!isMouseDown || !canvas) { return; }

    this.pickColor(canvas, e.clientX, e.clientY, true);
  };

  render() {
    const { color, onColorChange } = this.props;

    let pointer;
    if (color) {
      const { x, y } = getCoordinatesFromColor(color);
      pointer = <Pointer x={x} y={y} />;
    } else {
      pointer = null;
    }

    return (
      <div>
        <SLWrapper
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
        >
          <canvas
            ref={this.handleCanvas}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
          />
          {pointer}
        </SLWrapper>
        <HuePicker color={color} width={CANVAS_SIZE} onColorChange={onColorChange} />
      </div>
    );
  }
}

const SLWrapper = styled.div`
  width: ${() => CANVAS_SIZE}px;
  height: ${() => CANVAS_SIZE}px;
  position: relative;
  cursor: pointer;
`;

export default ColorGradient;
