import type { ClarityAbiType } from '@clarigen/core';
import {
  isClarityAbiPrimitive,
  isClarityAbiBuffer,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiOptional,
  isClarityAbiList,
  isClarityAbiTuple,
  isClarityAbiResponse,
} from '@clarigen/core';
import { NumberField } from './fields/number-field';
import { BoolField } from './fields/bool-field';
import { PrincipalField } from './fields/principal-field';
import { BufferField } from './fields/buffer-field';
import { StringAsciiField } from './fields/string-ascii-field';
import { StringUtf8Field } from './fields/string-utf8-field';
import { OptionalField } from './fields/optional-field';
import { ResponseField } from './fields/response-field';
import { ListField } from './fields/list-field';
import { TupleField } from './fields/tuple-field';

export type ClarityFieldProps = {
  name: string;
  type: ClarityAbiType;
  label?: string;
  disabled?: boolean;
};

export function ClarityField({
  name,
  type,
  label,
  disabled,
}: ClarityFieldProps) {
  if (isClarityAbiPrimitive(type)) {
    switch (type) {
      case 'uint128':
        return (
          <NumberField
            disabled={disabled}
            label={label}
            name={name}
            signed={false}
            type={type}
          />
        );
      case 'int128':
        return (
          <NumberField
            disabled={disabled}
            label={label}
            name={name}
            signed={true}
            type={type}
          />
        );
      case 'bool':
        return (
          <BoolField
            disabled={disabled}
            label={label}
            name={name}
            type={type}
          />
        );
      case 'principal':
        return (
          <PrincipalField
            disabled={disabled}
            label={label}
            name={name}
            type={type}
          />
        );
      case 'trait_reference':
        return (
          <PrincipalField
            disabled={disabled}
            label={label}
            name={name}
            requireContract
            type={type}
          />
        );
      case 'none':
        return null;
    }
  }

  if (isClarityAbiBuffer(type)) {
    return (
      <BufferField
        disabled={disabled}
        label={label}
        maxLength={type.buffer.length}
        name={name}
        type={type}
      />
    );
  }

  if (isClarityAbiStringAscii(type)) {
    return (
      <StringAsciiField
        disabled={disabled}
        label={label}
        maxLength={type['string-ascii'].length}
        name={name}
        type={type}
      />
    );
  }

  if (isClarityAbiStringUtf8(type)) {
    return (
      <StringUtf8Field
        disabled={disabled}
        label={label}
        maxLength={type['string-utf8'].length}
        name={name}
        type={type}
      />
    );
  }

  if (isClarityAbiOptional(type)) {
    return (
      <OptionalField
        disabled={disabled}
        innerType={type.optional}
        label={label}
        name={name}
      />
    );
  }

  if (isClarityAbiResponse(type)) {
    return (
      <ResponseField
        disabled={disabled}
        errType={type.response.error}
        label={label}
        name={name}
        okType={type.response.ok}
      />
    );
  }

  if (isClarityAbiList(type)) {
    return (
      <ListField
        disabled={disabled}
        itemType={type.list.type}
        label={label}
        maxLength={type.list.length}
        name={name}
      />
    );
  }

  if (isClarityAbiTuple(type)) {
    return (
      <TupleField
        disabled={disabled}
        label={label}
        members={type.tuple}
        name={name}
      />
    );
  }

  return (
    <div className="border border-border border-dashed bg-muted/20 p-3 font-mono text-muted-foreground text-xs">
      unsupported type: {JSON.stringify(type)}
    </div>
  );
}
