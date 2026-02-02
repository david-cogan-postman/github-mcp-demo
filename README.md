# GitHub MCP Demo API

Test repository for demonstrating Postman Agent Mode prompts with GitHub MCP.

## Known Issues

- `src/types.ts` - User type is missing fields returned by the API
- `src/orderHandler.ts` - Order validation doesn't check for negative quantities

## Testing the Prompts

1. **Create PR with Copilot**: Run the "Get User" request in Postman, then use the prompt to update `src/types.ts`
2. **CI/CD Pipeline**: Use the prompt to add a GitHub Actions workflow
3. **Debug Loop**: Run "Create Order (Error)" and use the prompt to create an issue and fix PR
