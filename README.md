# Solaris Library

**Solaris** is a library of 3D web effects, shaders, and animations designed for web developers. Built using **Three.js** and **GLSL shaders**, Solaris allows you to easily add stunning, interactive 3D visuals to your website.

The library includes various effects, such as the **Neptune Effect**, which features a rotating Neptune planet and an animated atmosphere. More effects will be added over time, so you can quickly enhance your site with beautiful, performant animations.

## How to Use

To integrate an effect from **Solaris** into your project, follow these simple steps:

### 1. Install the library

You can install **Solaris** in one of two ways:

#### Clone the repository:

```bash
git clone https://github.com/yourusername/solaris.git
```

#### Or install via npm (once it’s published):

```bash
npm install solaris
```

#### 2. Import the effect

After installation, import the desired effect into your project:

```javascript
import { Neptune } from "solaris";
```

#### 3. Use the effect

To use the Neptune Effect, instantiate it and start the animation:

```javascript
const neptuneEffect = new Neptune();
neptuneEffect.start();
```

### License

This project is licensed under the MIT License - see the LICENSE file for details.
