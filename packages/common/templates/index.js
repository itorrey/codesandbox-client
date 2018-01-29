import ReactIcon from 'common/components/logos/React';
import PreactIcon from 'common/components/logos/Preact';
import VueIcon from 'common/components/logos/Vue';
import SvelteIcon from 'common/components/logos/Svelte';
import DojoIcon from 'common/components/logos/Dojo';

import { decorateSelector } from '../theme';

export const react = {
  name: 'create-react-app',
  niceName: 'React',
  url: 'https://github.com/facebookincubator/create-react-app',
  shortid: 'new',
  Icon: ReactIcon,
  color: decorateSelector(() => '#6CAEDD'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd build && serve -s ./',
      },
    },
  }),
};

export const reactTs = {
  name: 'create-react-app-typescript',
  niceName: 'React + TS',
  url: 'https://github.com/wmonk/create-react-app-typescript',
  shortid: 'react-ts',
  color: decorateSelector(() => '#009fff'),

  sourceConfig: {
    typescript: true,
    entry: 'index.tsx',
  },
};

export const dojo = {
  name: '@dojo/cli',
  niceName: 'Dojo 2',
  url: 'https://github.com/nicknisi/dojo2-app',
  Icon: DojoIcon,
  shortid: 'dojo',
  color: decorateSelector(() => '#DA1920')
};

export const vue = {
  name: 'vue-cli',
  niceName: 'Vue',
  url: 'https://github.com/vuejs/vue-cli',
  shortid: 'vue',
  Icon: VueIcon,
  color: decorateSelector(() => '#41B883'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd dist && serve -s ./',
      },
    },
  }),
};

export const preact = {
  name: 'preact-cli',
  niceName: 'Preact',
  url: 'https://github.com/developit/preact-cli',
  shortid: 'preact',
  Icon: PreactIcon,
  color: decorateSelector(() => '#AD78DC'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd build && serve -s ./',
      },
    },
  }),
};

export const svelte = {
  name: 'svelte',
  niceName: 'Svelte',
  url: 'https://github.com/sveltejs/svelte',
  shortid: 'svelte',
  Icon: SvelteIcon,
  color: decorateSelector(() => '#AA1E1E'),

  alterDeploymentData: apiData => ({
    ...apiData,
    package: {
      ...apiData.package,
      devDependencies: {
        ...apiData.package.devDependencies,
        serve: '^5.0.1',
      },
      scripts: {
        ...apiData.package.scripts,
        'now-start': 'cd public && serve -s ./',
      },
    },
  }),
};

export default function getDefinition(
  theme:
    | 'create-react-app'
    | 'vue-cli'
    | 'preact-cli'
    | 'svelte'
    | 'create-react-app-typescript'
    | 'dojo'
) {
  if (!theme) {
    return react;
  }

  switch (theme) {
    case react.name:
      return react;
    case vue.name:
      return vue;
    case preact.name:
      return preact;
    case reactTs.name:
      return reactTs;
    case svelte.name:
      return svelte;
    case dojo.name:
      return dojo;
    default:
      return react;
  }
}
