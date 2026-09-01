import type { ReactNode } from 'react';
import { cvToString, principalToString } from '@clarigen/core';
import {
  ClarityType,
  type ClarityValue,
} from '@stacks/transactions';
import { cn } from '@/lib/utils';

function TypeBadge({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'font-mono text-[10px] text-muted-foreground uppercase tracking-wider',
        className
      )}
    >
      {children}
    </span>
  );
}

function Primitive({
  type,
  value,
  valueClassName,
}: {
  type: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <TypeBadge>{type}</TypeBadge>
      <span
        className={cn(
          'break-all font-mono text-xs',
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Nested({
  type,
  typeClassName,
  count,
  children,
}: {
  type: string;
  typeClassName?: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <div className="border border-border bg-muted/10">
      <div className="flex items-center gap-2 border-border border-b bg-muted/30 px-3 py-1.5">
        <TypeBadge className={typeClassName}>{type}</TypeBadge>
        {count !== undefined ? (
          <span className="font-mono text-[10px] text-muted-foreground">
            {count}
          </span>
        ) : null}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export function ClarityValueView({ value }: { value: ClarityValue }) {
  switch (value.type) {
    case ClarityType.BoolTrue:
      return (
        <Primitive
          type="bool"
          value="true"
          valueClassName="text-green-600 dark:text-green-500"
        />
      );
    case ClarityType.BoolFalse:
      return (
        <Primitive
          type="bool"
          value="false"
          valueClassName="text-destructive"
        />
      );
    case ClarityType.Int:
      return <Primitive type="int" value={value.value.toString()} />;
    case ClarityType.UInt:
      return <Primitive type="uint" value={`u${value.value.toString()}`} />;
    case ClarityType.Buffer:
      return <Primitive type="buffer" value={`0x${value.value}`} />;
    case ClarityType.OptionalNone:
      return <Primitive type="optional" value="none" />;
    case ClarityType.OptionalSome:
      return (
        <Nested type="some">
          <ClarityValueView value={value.value} />
        </Nested>
      );
    case ClarityType.ResponseOk:
      return (
        <Nested type="ok" typeClassName="text-green-600 dark:text-green-500">
          <ClarityValueView value={value.value} />
        </Nested>
      );
    case ClarityType.ResponseErr:
      return (
        <Nested type="err" typeClassName="text-destructive">
          <ClarityValueView value={value.value} />
        </Nested>
      );
    case ClarityType.PrincipalStandard:
    case ClarityType.PrincipalContract:
      return <Primitive type="principal" value={principalToString(value)} />;
    case ClarityType.List:
      return (
        <Nested count={value.value.length} type="list">
          {value.value.length === 0 ? (
            <p className="font-mono text-muted-foreground text-xs">empty</p>
          ) : (
            <div className="space-y-2">
              {value.value.map((item, index) => (
                <div key={`${index}:${cvToString(item)}`}>
                  <div className="mb-1 font-mono text-[10px] text-muted-foreground">
                    {index}
                  </div>
                  <ClarityValueView value={item} />
                </div>
              ))}
            </div>
          )}
        </Nested>
      );
    case ClarityType.Tuple: {
      const keys = Object.keys(value.value);
      return (
        <Nested count={keys.length} type="tuple">
          {keys.length === 0 ? (
            <p className="font-mono text-muted-foreground text-xs">empty</p>
          ) : (
            <div className="space-y-3">
              {keys.map((key) => {
                const inner = value.value[key];
                if (!inner) return null;
                return (
                  <div key={key}>
                    <div className="mb-1 font-mono text-muted-foreground text-xs">
                      {key}
                    </div>
                    <ClarityValueView value={inner} />
                  </div>
                );
              })}
            </div>
          )}
        </Nested>
      );
    }
    case ClarityType.StringASCII:
      return <Primitive type="string-ascii" value={`"${value.value}"`} />;
    case ClarityType.StringUTF8:
      return <Primitive type="string-utf8" value={`u"${value.value}"`} />;
    default:
      return <Primitive type="unknown" value={cvToString(value)} />;
  }
}
