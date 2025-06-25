import { Routes } from '../constants/routes.const';
import { HttpStatus } from '../constants/httpStatus.const';

type InternalApiOptions = RequestInit & {
  onUnauthorized?: () => void;
  onForbidden?: () => void;
};

export const internalAPI = async (url: string, options: InternalApiOptions = {}) => {
  try {
    const target = Routes.API_GATEWAY + url;
    const response = await fetch(target, options);

    if (response.status === HttpStatus.UNAUTHORIZED && options.onUnauthorized) {
      options.onUnauthorized();
    }
    if (response.status === HttpStatus.FORBIDDEN && options.onForbidden) {
      options.onForbidden();
    }

    return response;
  } catch (error) {
    throw error;
  }
};
