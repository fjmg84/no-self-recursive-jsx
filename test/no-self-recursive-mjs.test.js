const noSelfRecursiveJsxRule = require("../no-self-recursive.cjs");

const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("no-self-recursive", noSelfRecursiveJsxRule, {
  valid: [
    {
      code: `
const Child = () => <div>Child</div>;
const Parent = () => <Child />;
      `,
    },
    {
      code: `
const Component = () => <h1>Hello World</h1>;
      `,
    },
    {
      code: `
const App = () => <div>
  <footer>Footer</footer>
</div>;
      `,
    },
    {
      code: `
const Component = () => <lowercase-component prop={true} />;
      `,
    },
    {
      code: `
const Component = () => <div>
  {recursiveVar()}
</div>;
      `,
    },
    {
      code: `
const child = () => <div>child</div>;
const Component = () => <child />;
      `,
    },
    {
      code: `
function a() { return <div>A</div>; }
function b() { return <A />; }
      `,
    },
    {
      code: `
const App = () => <Component prop={false} />;
      `,
    },
  ],
  invalid: [
    {
      code: `
const Component = () => <Component prop={false} />;
            `,
      errors: [
        {
          messageId: "noSelfRecursive",
        },
      ],
    },
    {
      code: `
function Component() {
  return (
    <Component
      component={false} 
      Component={false} 
    />
  );
}
            `,
      errors: [
        {
          messageId: "noSelfRecursive",
        },
      ],
    },
    {
      code: `
const Component = () => Component();
            `,
      errors: [
        {
          messageId: "noSelfRecursiveCall",
        },
      ],
    },
    {
      code: `
function Component() {
  return (
    <Component
      component={false}
    />
  );
}
            `,
      errors: [
        {
          messageId: "noSelfRecursive",
        },
      ],
    },
    {
      code: `
function Component() {
  return Component();
}
            `,
      errors: [
        {
          messageId: "noSelfRecursiveCall",
        },
      ],
    },
    {
      code: `
function Component() {
  const Child = () => <Child />;
  return <Child />;
}
            `,
      errors: [{ messageId: "noSelfRecursive" }],
    },
    {
      code: `
function Component() {
  const Recursive = () => Recursive(<Component />);
  return <Recursive ref={(instance) => {}} attr="attr" />;
}
            `,
      errors: [{ messageId: "noSelfRecursiveCall" }],
    },
    {
      code: `
function Component() {
  const Recursive = () => Recursive();
}
            `,
      errors: [{ messageId: "noSelfRecursiveCall" }],
    },
    {
      code: `
const ComponentA = () => <ComponentA prop={false} />;
const ComponentB = () => <ComponentB />;
            `,
      errors: [
        { messageId: "noSelfRecursive" },
        { messageId: "noSelfRecursive" },
      ],
    },
    {
      code: `
function Component() {
  return <Component prop={false} onClick={() => {}} className="test" />;
}`,
      errors: [{ messageId: "noSelfRecursive" }],
    },
    {
      code: `
const Component = () => {
  return <Component>
    <span>Nested self-reference</span>
  </Component>;
}
            `,
      errors: [{ messageId: "noSelfRecursive" }],
    },
  ],
});
