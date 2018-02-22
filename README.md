# react-slider-kit
react-slider-kit is going to be a comprehensive solution to slider feature in react [https://m-izadmehr.github.io/react-slider-kit/](https://m-izadmehr.github.io/react-slider-kit/).

#
[![N|Solid](https://m-izadmehr.github.io/react-slider-kit/assets/logo.jpg?style=centerme)](https://github.com/M-Izadmehr/react-slider-kit)

react-slider-kit is going to be a comprehensive solution to slider feature in react. This component was originally inspired by dribble concept design [The Range Slider Component](https://dribbble.com/shots/3336283-The-Range-Slider-Component). 

This slider components is going to include:

  - 1D and 2D sliders
  - Single and range sliders
  - Horizontal and vertical sliders

-------------
## Demo
The working demo of this component can be find at [https://m-izadmehr.github.io/react-slider-kit/](https://m-izadmehr.github.io/react-slider-kit/). An image of the original dribble design is shown below:

[![N|Solid](https://cdn.dribbble.com/users/4878/screenshots/3336283/rsc-lightning.gif)](https://m-izadmehr.github.io/react-slider-kit/)




-------------
## Installation
Using `npm` (use `--save` to include it in your package.json)

```bash
$ npm install react-slider-kit --save
```

Using `yarn` (this command also adds react-rangeslider to your package.json dependencies)

```bash
$ yarn add react-slider-kit
```

## Getting Started
`react-slider-kit` is going to be a package of different sliders. In order to use a slider with a module bundler like webpack that supports either CommonJS or ES2015 modules, use as you would anything else:

```js
// Using an ES6 transpiler like Babel
import {} from 'react-rangeslider'

// Not using an ES6 transpiler
var Slider = require('react-rangeslider')
```

## Basic Example

```jsx
import React, { Component } from 'react'
import {SingleSlider} from 'react-slider-kit';

export default class SimpleExample extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: 0
    }
  }

  handleOnChange = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    return (
       <SingleSlider
            min={0}
             max={100}
            step={20}
            start={80}
            onChangeStart={() => console.log('start drag')}
            onChange={(value)=>console.log('drag value: ', value)}
            onChangeComplete={this.handleOnChange}
        />
    )
  }
}
```




## API
React-Slider-Kit is bundled as a combination of multiple components, and by default the single slider is imported.

### Component
```jsx
import {SingleSlider} from 'react-slider-kit';

// inside render

<SingleSlider
    min={Number}
    max={Number}
    step={Number}
    start={Number}
    sliderTo={Number}
    prefix={String}
    postfix={String}
    labels={Array}
    sticky={Boolean}
    tooltip={String}
    orientation={String}

    // chart configs
    chartData={Array}
    chartTooltip={Boolean}
    chartLength={Number}

    // methods
    onChangeStart={function}
    onChange={function}
    onChangeComplete={function}
/>
```

### Props
Prop   	 			 |  Type      |  Default      |  Description
---------  	|  -------   |  -------      |  -----------
`min`     	|  number    |  0				   	|  minimum value the slider can hold
`max`    	|  number    |  100				  |  maximum value the slider can hold
`step` 		|  number    |  1          	|  step in which increments/decrements have to be made
`start` 	|  number    |  0				   	|  starting value of slider
`sliderTo` 	|  number    |  undefined				   	|  used to change the value of slider manually (componentWillReceiveProps is listening for changes in this value)
`tooltip` 	|  string    |  'always'				   	|  controls when slider tooltip is shown (`always`/`onClick`/`never`)
`prefix` 	|  string    |  ''				   	|  prefix in tooltip label (eg. '$')
`postfix` 	|  string    |  ''				   	|  postfix in tooltip label (eg. 'kg')
`labels` 	|  array    |  []				   	|  custom labels to show on slider (eg. `[{x:0,val:'Start'}, {x:50,val:'Middle'},]`
`sticky` 	|  boolean    |  false				   	|  controls whether slider handle can move smoothly or it can only sit on step values
`orientation` 	|  string    |  'horizontal'				   	|  slider orientation (eg. `horizontal`, `vertical`)
`chartData` 	|  array    |  -				   	|  used for showing 2D frequency graph on the slider (eg. `[{ y: 0 }, { y: 0.1 }, { y: 1 }, { y: 1.5 },  { y: 3 }]`)
`chartTooltip` 	|  boolean    |  false				   	|  controls whether chart tooltip is shown on hover on data points
`chartLength` 	|  number    |  200				   	|  chart height (width) of chart in horizontal (vertical) orientation
`onChangeStart` 	|  function    |  -				   	|  function called on starting to drag slider
`onChange` 	|  function    |  -				   	|  function called during moving slider(on every pixel)
`onChangeComplete` 	|  function    |  -				   	|  function called after finishing slider move (used to set slider value on state)


## License
MIT









