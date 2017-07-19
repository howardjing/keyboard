import * as React from 'react';
import * as ReactDOM from 'react-dom';

// https://github.com/kentor/react-click-outside/blob/master/index.js
class Dismissible extends React.Component<{
  onDismiss: () => any,
  children: any,
  className?: string,
}, {
  el: HTMLDivElement | null,
}> {

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    const { el } = this.state;
    if (!el || !el.contains(e.target)) {
      const { onDismiss } = this.props;
      onDismiss();
    }
  };

  cacheEl = (el) => {
    this.setState(() => ({
      el,
    }));
  };

  render() {
    const { className, children } = this.props;
    return (
      <div className={className} ref={this.cacheEl}>
        {children}
      </div>
    )
  }
}

export default Dismissible;
