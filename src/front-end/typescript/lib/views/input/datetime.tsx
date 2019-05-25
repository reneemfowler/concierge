import { Dispatch, View } from 'front-end/lib/framework';
import * as FormField from 'front-end/lib/views/form-field';
import * as Input from 'front-end/lib/views/input/input';
import { ChangeEvent, ChangeEventHandler, default as React, KeyboardEventHandler } from 'react';

export interface State extends FormField.State {
  type: 'date' | 'time' | 'datetime-local';
  min?: string;
  max?: string;
}

type OnEnter = () => void;

interface ExtraProps {
  onKeyUp: KeyboardEventHandler<HTMLInputElement>;
  onChangeDebounced?: Input.OnChangeDebounced;
}

export interface Props extends Pick<FormField.Props<State, HTMLInputElement, ExtraProps>, 'toggleHelp' | 'disabled'> {
  state: State;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onChangeDebounced?: Input.OnChangeDebounced;
  onEnter?: OnEnter;
}

interface Params extends Pick<State, 'id' | 'required' | 'type' | 'min' | 'max' | 'label' | 'help'> {
  value?: string;
}

export function init(params: Params): State {
  return {
    ...params,
    value: params.value || '',
    errors: []
  };
}

export function makeOnChange<Msg>(dispatch: Dispatch<Msg>, fn: (event: ChangeEvent<HTMLInputElement>) => Msg): ChangeEventHandler<HTMLInputElement> {
  return event => {
    dispatch(fn(event));
  };
}

function makeOnKeyUp(onEnter?: OnEnter): KeyboardEventHandler<HTMLInputElement> {
  return event => {
    if (event.key === 'Enter' && onEnter) { onEnter(); }
  };
};

const Child: View<FormField.ChildProps<State, HTMLInputElement, ExtraProps>> = props => {
  const { state, disabled, className, onChange, extraProps } = props;
  return (
    <Input.View
      id={state.id}
      type={state.type}
      value={state.value}
      className={`${className} form-control`}
      disabled={disabled}
      min={state.min}
      max={state.max}
      onChange={onChange}
      onChangeDebounced={extraProps && extraProps.onChangeDebounced}
      onKeyUp={extraProps && extraProps.onKeyUp} />
  );
};

export const view: View<Props> = ({ state, onChange, onChangeDebounced, onEnter, toggleHelp, disabled = false }) => {
  const extraProps: ExtraProps = {
    onKeyUp: makeOnKeyUp(onEnter),
    onChangeDebounced
  };
  return (
    <FormField.view Child={Child} state={state} onChange={onChange} toggleHelp={toggleHelp} extraProps={extraProps} disabled={disabled} />
  );
};
