import { createGlobalStyle } from 'styled-components';

import ExtraLightTtf from '../fonts/PlusJakartaSans-ExtraLight.ttf';
import ExtraLightItalicTtf from '../fonts/PlusJakartaSans-ExtraLightItalic.ttf';
import LightTtf from '../fonts/PlusJakartaSans-Light.ttf';
import LightItalicTtf from '../fonts/PlusJakartaSans-LightItalic.ttf';
import RegularTtf from '../fonts/PlusJakartaSans-Regular.ttf';
import ItalicTtf from '../fonts/PlusJakartaSans-Italic.ttf';
import MediumTtf from '../fonts/PlusJakartaSans-Medium.ttf';
import MediumItalicTtf from '../fonts/PlusJakartaSans-MediumItalic.ttf';
import SemiBoldTtf from '../fonts/PlusJakartaSans-SemiBold.ttf';
import SemiBoldItalicTtf from '../fonts/PlusJakartaSans-SemiBoldItalic.ttf';
import BoldTtf from '../fonts/PlusJakartaSans-Bold.ttf';
import BoldItalicTtf from '../fonts/PlusJakartaSans-BoldItalic.ttf';
import ExtraBoldTtf from '../fonts/PlusJakartaSans-ExtraBold.ttf';
import ExtraBoldItalicTtf from '../fonts/PlusJakartaSans-ExtraBoldItalic.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${ExtraLightTtf}) format('truetype');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${ExtraLightItalicTtf}) format('truetype');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${LightTtf}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${LightItalicTtf}) format('truetype');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${RegularTtf}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${ItalicTtf}) format('truetype');
    font-weight: 400;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${MediumTtf}) format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${MediumItalicTtf}) format('truetype');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${SemiBoldTtf}) format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${SemiBoldItalicTtf}) format('truetype');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${BoldTtf}) format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${BoldItalicTtf}) format('truetype');
    font-weight: 700;
    font-style: italic;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${ExtraBoldTtf}) format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Plus Jakarta Sans';
    src: url(${ExtraBoldItalicTtf}) format('truetype');
    font-weight: 800;
    font-style: italic;
    font-display: swap;
  }
`;
