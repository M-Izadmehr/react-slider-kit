/* eslint no-debugger: "warn" */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';
import { AreaChart, Area, CartesianGrid, Tooltip } from 'recharts';
import './styles.scss';


const constants = {
    horizontal: {
        offsetLength: 'offsetWidth',
        offsetStart: 'offsetLeft',
        length: 'width',
        start: 'left',
        screen: 'pageX',
    },
    vertical: {
        offsetLength: 'offsetHeight',
        offsetStart: 'offsetTop',
        length: 'height',
        start: 'top',
        screen: 'pageY',
    }
};

class RangeSlider extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            active: true,
            sliderLength: 0,
            sliderStart: 0,
            handleRadius: 0,
            handleStyle: {},
            fillStyle: {}
        }
    }

    componentDidMount() {
        if (!this.slider) {
            // for shallow rendering
            return
        }
        const sliderLength = this.slider[constants[this.props.orientation].offsetLength];
        const sliderStart = this.slider[constants[this.props.orientation].offsetStart];
        this.setState({ sliderLength, sliderStart }, () => {
            const { value, lengthRatio, valuePixel } = this.calculatePositionByValue(this.props.start);
            this.changePositionStyle(value, lengthRatio, valuePixel);
        })
    }

    componentWillReceiveProps(nextProps) {
        const { value, lengthRatio, valuePixel } = this.calculatePositionByValue(nextProps.sliderTo);
        this.changePositionStyle(value, lengthRatio, valuePixel);

    }


    // Attach event listeners to mousemove/mouseup events
    handleStart = e => {
        const { onChangeStart } = this.props;
        document.addEventListener('mousemove', this.changePositionByDrag);
        document.addEventListener('mouseup', this.handleEnd);
        this.setState({ active: true }, () => onChangeStart && onChangeStart(e))
    };


    // Detach event listeners to mousemove/mouseup events
    handleEnd = e => {
        const { onChangeComplete } = this.props;
        this.setState({ active: false }, () => onChangeComplete && onChangeComplete(this.state.value));
        document.removeEventListener('mousemove', this.changePositionByDrag);
        document.removeEventListener('mouseup', this.handleEnd);
    };


    calculatePositionByValue = (value) => {
        const { sliderLength } = this.state;
        const { max, min, orientation } = this.props;
        const lengthRatio = (value - min) / (max - min);
        const valuePixel = orientation === 'vertical'
            ? (1 - lengthRatio) * sliderLength
            : lengthRatio * sliderLength;
        return { value, lengthRatio, valuePixel };

    };
    changePositionStyle = (value, lengthRatio, valuePixel) => {
        let handleStyle = {}, fillStyle = {};
        handleStyle[constants[this.props.orientation].start] = valuePixel;

        fillStyle[constants[this.props.orientation].length] = `${lengthRatio * 100}%`;
        this.setState({ value, handleStyle, fillStyle });
    };

    changePositionByDrag = e => {
        e.stopPropagation();
        const { sliderLength, sliderStart } = this.state;
        const { max, min, step, onChange, orientation } = this.props;
        const mousePosition = e[constants[orientation].screen];

        let valuePixel = mousePosition - sliderStart;

        // pixel value for handle left
        valuePixel = Math.min(Math.max(valuePixel, 0), sliderLength);

        // percent for progress fill
        let lengthRatio = orientation === 'vertical'
            ? 1 - valuePixel / sliderLength
            : valuePixel / sliderLength;

        // return value
        const value = parseInt(Math.round(lengthRatio * max / step), 10) * step + min;

        // handle sticky slider
        if (this.props.sticky) {
            lengthRatio = (value - min) / (max - min);
            valuePixel = lengthRatio * sliderLength;
        }

        this.changePositionStyle(value, lengthRatio, valuePixel);
        onChange && onChange(value, e);
        return value;
    };
    renderLabels = () => {
        return this.props.labels.map((item, index) => {
            const { valuePixel } = this.calculatePositionByValue(item.x);
            return (
                <div
                    className="handle-tooltip label-tooltip"
                    style={{ [constants[this.props.orientation].start]: valuePixel }} key={index}
                >{item.val}</div>
            )
        })
    };


    render() {
        const { tooltip, prefix, postfix, labels, chartData, orientation, chartLength } = this.props;
        const { fillStyle, handleStyle, value,sliderLength } = this.state;
        return (
            <div
                className="react-slider2d-x658" ref={slider => this.slider = slider}
                onMouseDown={this.handleStart}
                onTouchMove={this.changePositionByDrag}
                onTouchEnd={this.handleEnd}
                onKeyDown={this.handleKeyDown}
                onClick={this.changePositionByDrag}
            >
                {/*Charts Section*/}
                {chartData && <section
                    className={classNames({
                        'charts': true,
                        'vertical-chart': orientation === 'vertical'
                    })}
                >
                    <AreaChart
                        dataKey="val"
                        data={chartData}
                        width={orientation === 'vertical' ? sliderLength : chartLength}
                        height={orientation !== 'vertical' ? sliderLength : chartLength}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        {orientation==='horizontal' && this.props.chartTooltip  && <Tooltip />}
                        <Area type='monotone' dataKey='y' stroke='#8884d8' fill='#ddd' />
                    </AreaChart>

                    <div className="progress-chart" style={{ width: fillStyle[constants[orientation].length], }}>
                        <AreaChart
                            width={orientation === 'vertical' ? sliderLength : chartLength}
                            height={orientation !== 'vertical' ? sliderLength : chartLength}
                            data={this.props.chartData}
                        >
                            <defs>
                                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgb(0,85,255)" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="rgb(174,126,255)" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>

                            <Area type='monotone' dataKey='y' stroke='#8884d8' fill='url(#grad2)' />
                        </AreaChart>
                    </div>
                </section>}

                {/* Slider Section */}
                <section
                    className={classNames({
                        'slider-container': true,
                        'vertical-slider': orientation === 'vertical'
                    })}
                >
                    <div className="progressBar" style={fillStyle} />
                    {labels && this.renderLabels()}
                    <div
                        className={classNames({ 'handle': true, 'tooltip-onclick': tooltip === 'onClick' })}
                        style={handleStyle}
                    >
                        {(tooltip === 'always' || tooltip === 'onClick') &&
                        <div className='handle-tooltip'> {prefix}{value}{postfix} </div>}

                    </div>


                </section>
            </div>
        )
    }
}
RangeSlider.defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    chartLength: 200,
    chartTooltip: false,
    prefix: '',
    postfix: '',

    tooltip: 'always',
    labels: [],
    handleLabel: '',
    orientation: 'horizontal',
};
RangeSlider.propTypes = {
    chartData: propTypes.array,
    min: propTypes.number,
    max: propTypes.number,
    step: propTypes.number,
    chartTooltip: propTypes.bool,
    prefix: propTypes.string,
    postfix: propTypes.string,
};

export default RangeSlider;