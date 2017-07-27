import * as React from 'react';
import styled from 'styled-components';
import * as Color from 'color';
import Pointer from './pointer';

const DEGREES = 360;
const HEIGHT = 12;

const getXFromColor = (color: Color.Color, width: number): number => (
  Math.round((color.hue() * (width - 1)) / DEGREES)
);

const clamp = (n: number, min: number, max: number): number => (
  Math.min(Math.max(n, min), max)
);

const getHueFromX = (x: number, width: number): number => (
  clamp(Math.round((x / (width - 1)) * DEGREES), 0, DEGREES - 1)
);

class HuePicker extends React.Component<{
  color: Color.Color,
  width: number,
  onColorChange: (color: Color.Color, preview?: boolean) => any,
}, {
  canvas?: HTMLCanvasElement,
  isMouseDown: boolean,
}> {

  handleCanvas = (canvas: HTMLCanvasElement | null) => {
    this.setState(() => ({
      canvas,
    }));

    if (!canvas) { return; }
    const { width } = this.props;
    this.drawGradient(canvas, width);
  };

  drawGradient = (canvas: HTMLCanvasElement, width: number) => {
    const ctx = canvas.getContext('2d');

    for (let i=0; i < width; i++) {
      const degrees = getHueFromX(i, width);
      ctx.fillStyle = `hsl(${degrees}, 100%, 50%)`;
      ctx.fillRect(i, 0, 1, HEIGHT);
    }
  };

  pickColor = (canvas, width, clientX, preview: boolean = false) => {
    const { top, left } = canvas.getBoundingClientRect();
    const relativeLeft = Math.floor(clientX - left);

    const degrees = getHueFromX(relativeLeft, width);

    // update color
    const { color, onColorChange } = this.props;
    const saturation = color.saturationl();
    const lightness = color.lightness();
    onColorChange(Color({ h: degrees, s: saturation, l: lightness }), preview);
  };

  cleanup = () => {
    document.removeEventListener('mouseup', this.handleMouseUp as any);
    window.removeEventListener('blur', this.handleMouseUp as any);
  };

  handleMouseUp = (e: React.MouseEvent<any>) => {
    const { width } = this.props;
    const { canvas } = this.state;
    if (canvas) {
      this.pickColor(canvas, width, e.clientX);
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
    const { width } = this.props;
    const { canvas, isMouseDown } = this.state;
    if (!isMouseDown || !canvas) { return; }

    this.pickColor(canvas, width, e.clientX, true);
  };

  render() {
    const { color, width } = this.props;
    const pointer = color ?
       <Pointer x={getXFromColor(color, width)} y={9} /> :
       null;

    return (
      <Wrapper
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        <canvas
          ref={this.handleCanvas}
          width={width}
          height={HEIGHT}
        />
        {pointer}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  width: ${({ width }) => width}px;
  position: relative;
  cursor: pointer;
`;

export default HuePicker;
