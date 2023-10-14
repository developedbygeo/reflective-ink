import { useReducer, useState } from 'react';

type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTED'; payload: boolean }
  | { type: 'SET_VALUE'; payload: string };

type State = {
  isLoading: boolean;
  isSubmitted: boolean;
  value: string | null;
};

const initialState: State = {
  isLoading: false,
  isSubmitted: false,
  value: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING': {
      return { ...state, isLoading: action.payload };
    }
    case 'SET_SUBMITTED': {
      return { ...state, isSubmitted: action.payload };
    }
    case 'SET_VALUE': {
      return { ...state, value: action.payload };
    }
    default:
      throw new Error('Invalid action type');
  }
};

const useEditorSubmit = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setIsLoading = (isLoading: boolean) =>
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  const setIsSubmitted = (isSubmitted: boolean) =>
    dispatch({ type: 'SET_SUBMITTED', payload: isSubmitted });
  const setValue = (value: string) =>
    dispatch({ type: 'SET_VALUE', payload: value });

  return {
    ...state,
    setIsLoading,
    setIsSubmitted,
    setValue,
  };
};

export default useEditorSubmit;
