// @flow
import { react, vue, svelte, preact, reactTs, dojo } from 'common/templates';

import reactPreset from './presets/create-react-app';
import reactTsPreset from './presets/create-react-app-typescript';
import vuePreset from './presets/vue-cli';
import preactPreset from './presets/preact-cli';
import sveltePreset from './presets/svelte';
import dojoPreset from './presets/dojo';

export default function getPreset(template: string) {
  switch (template) {
    case react.name:
      return reactPreset();
    case reactTs.name:
      return reactTsPreset();
    case vue.name:
      return vuePreset();
    case preact.name:
      return preactPreset();
    case svelte.name:
      return sveltePreset();
    case dojo.name:
      return dojoPreset();
    default:
      return reactPreset();
  }
}
