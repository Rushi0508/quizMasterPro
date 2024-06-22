import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {navigationRef} from '../App';

/**
 * Error handler for async API functions
 * No need to use try-catch block for async functions.
 * @example
 * ```tsx
 * const fetchData = errorHandler(async () => {
 *  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
 *  return response.data;
 * });
 * const data = await fetchData({ showToast: true });
 * ```
 */

interface ErrorHandlerConfig {
  showToast?: boolean;
}

export const errorHandler = <T extends any[], R>(
  func: (...args: T) => Promise<R>,
): ((...args: [...T, ErrorHandlerConfig?]) => Promise<R | undefined | any>) => {
  return async (...args: [...T, ErrorHandlerConfig?]) => {
    let config: ErrorHandlerConfig = {showToast: true};
    let actualArgs: T;
    const lastArg = args[args.length - 1];
    if (
      typeof lastArg === 'object' &&
      lastArg !== null &&
      'showToast' in lastArg
    ) {
      config = lastArg as ErrorHandlerConfig;
      actualArgs = args.slice(0, -1) as T;
    } else {
      actualArgs = args as unknown as T;
    }

    try {
      return await func(...actualArgs); // Execute the passed function with arguments
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // For Development
        if (error.response?.status == 401 || error.response?.status == 403) {
          return {auth: false};
        }
        ToastAndroid.show(
          error.response?.data || 'Something went wrong',
          ToastAndroid.SHORT,
        );
      }

      return undefined;
    }
  };
};
