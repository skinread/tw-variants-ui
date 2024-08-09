export default function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Name your Component (e.g. Button)',
        // validate: (value) => {
        //   if (!/^[+a-z-]+/.test(value)) {
        //     return false;
        //   }
        // },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/react/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'component-react/Component.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/react/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'component-react/Component.tsx.hbs',
      },
      {
        type: 'modify',
        path: '../src/components/react/index.ts',
        pattern: /\/\* generator:new component \*\//,
        template: `export * from './{{pascalCase name}}/{{pascalCase name}}';\n/* generator:new component */`,
      },
    ],
  });
}
