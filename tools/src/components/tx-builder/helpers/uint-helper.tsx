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

interface UintHelperProps {
  field: FocusedField;
  onApply: (value: string) => void;
}

export function UintHelper({ field, onApply }: UintHelperProps) {
  const [humanAmount, setHumanAmount] = useState('');
  const [selectedDecimals, setSelectedDecimals] = useState('6');
  const [customDecimals, setCustomDecimals] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [error, setError] = useState('');

  const isCustom = selectedDecimals === '-1';
  const decimalsToUse = isCustom
    ? parseInt(customDecimals, 10) || 0
    : parseInt(selectedDecimals, 10);

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
        <p className="text-xs text-muted-foreground">
          Convert human-readable amounts to {isSigned ? 'int' : 'uint'} values
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="human-amount" className="text-xs">
            Amount
          </Label>
          <Input
            id="human-amount"
            type="text"
            placeholder="10.5"
            value={humanAmount}
            onChange={e => setHumanAmount(e.target.value)}
            className="font-mono text-sm"
            inputMode="decimal"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="decimals-preset" className="text-xs">
            Decimals
          </Label>
          <Select
            value={selectedDecimals}
            onValueChange={value => setSelectedDecimals(value || '6')}
          >
            <SelectTrigger id="decimals-preset" className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRESET_DECIMALS.map(preset => (
                <SelectItem key={preset.value} value={preset.value.toString()}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isCustom && (
          <div className="space-y-2">
            <Label htmlFor="custom-decimals" className="text-xs">
              Custom Decimals
            </Label>
            <Input
              id="custom-decimals"
              type="number"
              min="0"
              max="38"
              placeholder="6"
              value={customDecimals}
              onChange={e => setCustomDecimals(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
        )}

        <Button onClick={handleConvert} variant="secondary" size="sm" className="w-full">
          Convert
        </Button>

        {convertedValue && (
          <div className="space-y-2 p-3 bg-muted/50 border border-border rounded-md">
            <p className="text-xs text-muted-foreground">Converted Value:</p>
            <p className="font-mono text-sm break-all">{convertedValue}</p>
          </div>
        )}

        {error && (
          <div className="text-xs text-destructive p-2 bg-destructive/10 border border-destructive/20 rounded">
            {error}
          </div>
        )}

        <Button onClick={handleApply} disabled={!convertedValue} size="sm" className="w-full">
          Apply to Field
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
        <p className="font-medium">Examples:</p>
        <p>• 1 STX (6 decimals) = 1000000</p>
        <p>• 10.5 USDC (6 decimals) = 10500000</p>
        <p>• 0.001 BTC (8 decimals) = 100000</p>
      </div>
    </div>
  );
}
