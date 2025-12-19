import { useState } from 'react';
import * as dn from 'dnum';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FocusedField } from '@/hooks/use-focused-field';

// Common token decimals
const PRESET_DECIMALS = [
  { label: 'STX (6)', value: 6 },
  { label: 'USDC (6)', value: 6 },
  { label: 'BTC (8)', value: 8 },
  { label: 'ETH (18)', value: 18 },
  { label: 'Custom', value: -1 },
] as const;

type UintHelperProps = {
  field: FocusedField;
  onApply: (value: string) => void;
};

export function UintHelper({ field, onApply }: UintHelperProps) {
  const [humanAmount, setHumanAmount] = useState('');
  const [selectedDecimals, setSelectedDecimals] = useState('6');
  const [customDecimals, setCustomDecimals] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [error, setError] = useState('');

  const isCustom = selectedDecimals === '-1';
  const decimalsToUse = isCustom
    ? Number.parseInt(customDecimals, 10) || 0
    : Number.parseInt(selectedDecimals, 10);

  const handleConvert = () => {
    setError('');
    setConvertedValue('');

    if (!humanAmount.trim()) {
      setError('Enter an amount to convert');
      return;
    }

    if (isCustom && !customDecimals.trim()) {
      setError('Enter custom decimals');
      return;
    }

    try {
      // Parse the human amount with the specified decimals
      const dnum = dn.from(humanAmount, decimalsToUse);
      // The value (first element of the tuple) is the bigint representation
      const converted = dnum[0].toString();
      setConvertedValue(converted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid number format');
    }
  };

  const handleApply = () => {
    if (!convertedValue) {
      setError('Convert first, then apply');
      return;
    }
    onApply(convertedValue);
    // Clear form after successful apply
    setHumanAmount('');
    setConvertedValue('');
    setError('');
  };

  const isSigned = field.type === 'int128';

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-muted-foreground text-xs">
          Convert human-readable amounts to {isSigned ? 'int' : 'uint'} values
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-xs" htmlFor="human-amount">
            Amount
          </Label>
          <Input
            className="font-mono text-sm"
            id="human-amount"
            inputMode="decimal"
            onChange={(e) => setHumanAmount(e.target.value)}
            placeholder="10.5"
            type="text"
            value={humanAmount}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-xs" htmlFor="decimals-preset">
            Decimals
          </Label>
          <Select
            onValueChange={(value) => setSelectedDecimals(value || '6')}
            value={selectedDecimals}
          >
            <SelectTrigger className="text-sm" id="decimals-preset">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRESET_DECIMALS.map((preset) => (
                <SelectItem key={preset.value} value={preset.value.toString()}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isCustom && (
          <div className="space-y-2">
            <Label className="text-xs" htmlFor="custom-decimals">
              Custom Decimals
            </Label>
            <Input
              className="font-mono text-sm"
              id="custom-decimals"
              max="38"
              min="0"
              onChange={(e) => setCustomDecimals(e.target.value)}
              placeholder="6"
              type="number"
              value={customDecimals}
            />
          </div>
        )}

        <Button
          className="w-full"
          onClick={handleConvert}
          size="sm"
          variant="secondary"
        >
          Convert
        </Button>

        {convertedValue && (
          <div className="space-y-2 rounded-md border border-border bg-muted/50 p-3">
            <p className="text-muted-foreground text-xs">Converted Value:</p>
            <p className="break-all font-mono text-sm">{convertedValue}</p>
          </div>
        )}

        {error && (
          <div className="rounded border border-destructive/20 bg-destructive/10 p-2 text-destructive text-xs">
            {error}
          </div>
        )}

        <Button
          className="w-full"
          disabled={!convertedValue}
          onClick={handleApply}
          size="sm"
        >
          Apply to Field
        </Button>
      </div>

      <div className="space-y-1 border-border border-t pt-2 text-muted-foreground text-xs">
        <p className="font-medium">Examples:</p>
        <p>• 1 STX (6 decimals) = 1000000</p>
        <p>• 10.5 USDC (6 decimals) = 10500000</p>
        <p>• 0.001 BTC (8 decimals) = 100000</p>
      </div>
    </div>
  );
}
