import { Trash2, Coins, Image, CircleDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type PostConditionsState,
  type PostConditionForm,
  type PostConditionType,
  createEmptyStxCondition,
  createEmptyFtCondition,
  createEmptyNftCondition,
  FUNGIBLE_COMPARATORS,
  NFT_COMPARATORS,
} from '@/lib/post-conditions';

type PostConditionsFieldProps = {
  value: PostConditionsState;
  onChange: (value: PostConditionsState) => void;
  disabled?: boolean;
};

export function PostConditionsField({
  value,
  onChange,
  disabled,
}: PostConditionsFieldProps) {
  const handleModeChange = (checked: boolean) => {
    onChange({ ...value, mode: checked ? 'allow' : 'deny' });
  };

  const handleAddCondition = (type: PostConditionType) => {
    let newCondition: PostConditionForm;
    switch (type) {
      case 'stx':
        newCondition = createEmptyStxCondition();
        break;
      case 'ft':
        newCondition = createEmptyFtCondition();
        break;
      case 'nft':
        newCondition = createEmptyNftCondition();
        break;
    }
    onChange({
      ...value,
      conditions: [...value.conditions, newCondition],
    });
  };

  const handleRemoveCondition = (index: number) => {
    onChange({
      ...value,
      conditions: value.conditions.filter((_, i) => i !== index),
    });
  };

  const handleUpdateCondition = (index: number, updated: PostConditionForm) => {
    onChange({
      ...value,
      conditions: value.conditions.map((c, i) => (i === index ? updated : c)),
    });
  };

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex items-center justify-between border border-border bg-muted/30 p-3">
        <div className="space-y-0.5">
          <Label className="font-medium text-xs">Post-Condition Mode</Label>
          <p className="text-[10px] text-muted-foreground">
            {value.mode === 'deny'
              ? 'Deny: only listed transfers allowed'
              : 'Allow: any transfers allowed'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">deny</span>
          <Switch
            checked={value.mode === 'allow'}
            disabled={disabled}
            onCheckedChange={handleModeChange}
          />
          <span className="text-muted-foreground text-xs">allow</span>
        </div>
      </div>

      {/* Conditions list */}
      {value.conditions.length > 0 && (
        <div className="space-y-3">
          {value.conditions.map((condition, index) => (
            <PostConditionItem
              condition={condition}
              disabled={disabled}
              key={index}
              onChange={(updated) => handleUpdateCondition(index, updated)}
              onRemove={() => handleRemoveCondition(index)}
            />
          ))}
        </div>
      )}

      {/* Add condition buttons */}
      {!disabled && (
        <div className="flex flex-wrap gap-2">
          <Button
            className="gap-1.5"
            onClick={() => handleAddCondition('stx')}
            size="sm"
            type="button"
            variant="outline"
          >
            <CircleDollarSign className="h-3.5 w-3.5" />
            <span>+ STX</span>
          </Button>
          <Button
            className="gap-1.5"
            onClick={() => handleAddCondition('ft')}
            size="sm"
            type="button"
            variant="outline"
          >
            <Coins className="h-3.5 w-3.5" />
            <span>+ Fungible Token</span>
          </Button>
          <Button
            className="gap-1.5"
            onClick={() => handleAddCondition('nft')}
            size="sm"
            type="button"
            variant="outline"
          >
            <Image className="h-3.5 w-3.5" />
            <span>+ NFT</span>
          </Button>
        </div>
      )}

      {value.conditions.length === 0 && (
        <p className="text-muted-foreground text-xs">
          No post-conditions defined.
        </p>
      )}
    </div>
  );
}

type PostConditionItemProps = {
  condition: PostConditionForm;
  onChange: (condition: PostConditionForm) => void;
  onRemove: () => void;
  disabled?: boolean;
};

function PostConditionItem({
  condition,
  onChange,
  onRemove,
  disabled,
}: PostConditionItemProps) {
  const typeIcon =
    condition.type === 'stx' ? (
      <CircleDollarSign className="h-4 w-4" />
    ) : condition.type === 'ft' ? (
      <Coins className="h-4 w-4" />
    ) : (
      <Image className="h-4 w-4" />
    );

  const typeLabel =
    condition.type === 'stx' ? 'STX' : condition.type === 'ft' ? 'FT' : 'NFT';

  return (
    <div className="border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-border border-b bg-muted/30 px-3 py-2">
        <div className="flex items-center gap-2 font-medium text-xs">
          {typeIcon}
          <span>{typeLabel} Post-Condition</span>
        </div>
        {!disabled && (
          <Button
            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            size="sm"
            type="button"
            variant="ghost"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-3 p-3">
        {/* Address */}
        <div className="space-y-1.5">
          <Label className="text-xs">Principal Address</Label>
          <Input
            className="font-mono"
            disabled={disabled}
            onChange={(e) =>
              onChange({
                ...condition,
                address: e.target.value,
              } as PostConditionForm)
            }
            placeholder="SP... or ST..."
            value={condition.address}
          />
        </div>

        {/* Condition comparator */}
        {condition.type !== 'nft' ? (
          <div className="space-y-1.5">
            <Label className="text-xs">Condition</Label>
            <Select
              disabled={disabled}
              onValueChange={(val) =>
                onChange({ ...condition, condition: val } as PostConditionForm)
              }
              value={condition.condition}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FUNGIBLE_COMPARATORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Label className="text-xs">Condition</Label>
            <Select
              disabled={disabled}
              onValueChange={(val) =>
                onChange({ ...condition, condition: val } as PostConditionForm)
              }
              value={condition.condition}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NFT_COMPARATORS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Asset (for FT and NFT) */}
        {(condition.type === 'ft' || condition.type === 'nft') && (
          <div className="space-y-1.5">
            <Label className="text-xs">Asset</Label>
            <Input
              className="font-mono"
              disabled={disabled}
              onChange={(e) =>
                onChange({
                  ...condition,
                  asset: e.target.value,
                } as PostConditionForm)
              }
              placeholder="SP...contract::token-name"
              value={condition.asset}
            />
            <p className="text-[10px] text-muted-foreground">
              Format: contract-address::asset-name
            </p>
          </div>
        )}

        {/* Amount (for STX and FT) */}
        {(condition.type === 'stx' || condition.type === 'ft') && (
          <div className="space-y-1.5">
            <Label className="text-xs">Amount (micro-units)</Label>
            <Input
              className="font-mono"
              disabled={disabled}
              inputMode="numeric"
              onChange={(e) =>
                onChange({
                  ...condition,
                  amount: e.target.value,
                } as PostConditionForm)
              }
              placeholder="1000000"
              value={condition.amount}
            />
            <p className="text-[10px] text-muted-foreground">
              {condition.type === 'stx'
                ? '1 STX = 1,000,000 micro-STX'
                : 'Enter raw amount'}
            </p>
          </div>
        )}

        {/* Asset ID (for NFT) */}
        {condition.type === 'nft' && (
          <div className="space-y-1.5">
            <Label className="text-xs">Asset ID</Label>
            <Input
              className="font-mono"
              disabled={disabled}
              onChange={(e) =>
                onChange({
                  ...condition,
                  assetId: e.target.value,
                } as PostConditionForm)
              }
              placeholder="1"
              value={condition.assetId}
            />
            <p className="text-[10px] text-muted-foreground">
              NFT identifier (numeric)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
