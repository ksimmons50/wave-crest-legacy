/**
 * A branded type that ensures coding agent prompts always start with "TODO(CODING_AGENT): "
 * This is enforced at compile time via template literal types.
 */
export type CodingAgentPrompt = `TODO(CODING_AGENT): ${string}`;

/**
 * Helper function to create a properly formatted coding agent prompt.
 * Use this if you're dynamically constructing prompts.
 */
export function createCodingAgentPrompt(instruction: string): CodingAgentPrompt {
  return `TODO(CODING_AGENT): ${instruction}` as CodingAgentPrompt;
}
