const isPascalCase = (value) => /^[A-Z]/.test(value);

const noSelfRecursiveJsxRule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents React components from rendering themselves recursively in JSX.",
    },
    schema: [],
    messages: {
      noSelfRecursive:
        "The component '{{name}}' renders itself in JSX, which can cause infinite recursion.",
      noSelfRecursiveCall:
        "The component '{{name}}' calls itself, which can cause infinite recursion.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;

    const getEnclosingComponentName = (node) => {
      const ancestors = sourceCode.getAncestors(node);

      for (let i = ancestors.length - 1; i >= 0; i -= 1) {
        const ancestor = ancestors[i];

        if (
          ancestor.type === "FunctionDeclaration" &&
          ancestor.id &&
          isPascalCase(ancestor.id.name)
        ) {
          return ancestor.id.name;
        }

        if (
          ancestor.type === "ArrowFunctionExpression" ||
          ancestor.type === "FunctionExpression"
        ) {
          const parent = ancestors[i - 1];

          if (
            parent &&
            parent.type === "VariableDeclarator" &&
            parent.id.type === "Identifier" &&
            parent.init === ancestor &&
            isPascalCase(parent.id.name)
          ) {
            return parent.id.name;
          }
        }
      }

      return null;
    };

    return {
      JSXOpeningElement(node) {
        if (node.name.type !== "JSXIdentifier") return;

        const renderedName = node.name.name;
        if (!isPascalCase(renderedName)) return;

        const componentName = getEnclosingComponentName(node);
        if (!componentName) return;

        if (componentName === renderedName) {
          context.report({
            node,
            messageId: "noSelfRecursive",
            data: { name: componentName },
          });
        }
      },
      CallExpression(node) {
        if (node.callee.type !== "Identifier") return;

        const calledName = node.callee.name;
        if (!isPascalCase(calledName)) return;

        const componentName = getEnclosingComponentName(node);
        if (!componentName) return;

        if (componentName === calledName) {
          context.report({
            node,
            messageId: "noSelfRecursiveCall",
            data: { name: componentName },
          });
        }
      },
    };
  },
};

export default noSelfRecursiveJsxRule;
