import {
  FailedResponse,
  SuccessResponse,
} from "../common/types";

/**
 * Creates a successful response object with a specified payload.
 *
 * @template P - The type of the payload to be included in the response.
 * @param {P} payload - The data to include in the successful response.
 * @returns {SuccessResponse<P>} An object with `success: true` and the provided `payload`.
 *
 * @example
 * // Example with a simple payload
 * const response = successResponse<LoginResponse>({ username: 'user', token: 'abc123' });
 * // Returns: { success: true, payload: { username: 'user', token: 'abc123' } }
 *
 * @example
 * // Example with no payload (void)
 * const response = successResponse<LogoutResponse>(undefined);
 * // Returns: { success: true, payload: undefined }
 */
export const successResponse = <P>(
  payload: P
): SuccessResponse<P> => ({
  success: true,
  payload,
});
/**
 * Creates a failed response object with an error message.
 *
 * @param {string} error - The error message explaining the reason for the failure.
 * @returns {FailedResponse} An object with `success: false` and the provided `error` message.
 *
 * @example
 * // Example with an error message
 * const response = failedResponse('Invalid credentials');
 * // Returns: { success: false, error: 'Invalid credentials' }
 */
export const failedResponse = (error: string): FailedResponse => ({
  success: false,
  error,
});