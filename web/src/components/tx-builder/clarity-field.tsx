import type { ClarityAbiType } from '@clarigen/core';
import {
  isClarityAbiPrimitive,
  isClarityAbiBuffer,
  isClarityAbiStringAscii,
  isClarityAbiStringUtf8,
  isClarityAbiOptional,
  isClarityAbiList,
  isClarityAbiTuple,
} from '@clarigen/core';
import { NumberField } from './fields/number-field';
import { BoolField } from './fields/bool-field';
import { PrincipalField } from './fields/principal-field';
import { BufferField } from './fields/buffer-field';
import { StringAsciiField } from './fields/string-ascii-field';
import { StringUtf8Field } from './fields/string-utf8-field';
import { OptionalField } from './fields/optional-field';
import { ListField } from './fields/list-field';
import { TupleField } from './fields/tuple-field';

export interface ClarityFieldProps {
  name: string;
  type: ClarityAbiType;
  label?: string;
}

export function ClarityField({ name, type, label }: ClarityFieldProps) {
  if (isClarityAbiPrimitive(type)) {
    switch (type) {
      case 'uint128':
        return <NumberField name={name} label={label} signed={false} />;
      case 'int128':
        return <NumberField name={name} label={label} signed={true} />;
      case 'bool':
        return <BoolField name={name} label={label} />;
      case 'principal':
        return <PrincipalField name={name} label={label} />;
      case 'trait_reference':
        return <PrincipalField name={name} label={label} requireContract />;
      case 'none':
        return null;
    }
  }

  if (isClarityAbiBuffer(type)) {
    return <BufferField name={name} label={label} maxLength={type.buffer.length} />;
  }

  if (isClarityAbiStringAscii(type)) {
    return <StringAsciiField name={name} label={label} maxLength={type['string-ascii'].length} />;
  }

  if (isClarityAbiStringUtf8(type)) {
    return <StringUtf8Field name={name} label={label} maxLength={type['string-utf8'].length} />;
  }

  if (isClarityAbiOptional(type)) {
    return <OptionalField name={name} label={label} innerType={type.optional} />;
  }

  if (isClarityAbiList(type)) {
    return (
      <ListField
        name={name}
        label={label}
        itemType={type.list.type}
        maxLength={type.list.length}
      />
    );
  }

  if (isClarityAbiTuple(type)) {
    return <TupleField name={name} label={label} members={type.tuple} />;
  }

  return <div className="text-destructive text-sm">Unsupported type</div>;
}
