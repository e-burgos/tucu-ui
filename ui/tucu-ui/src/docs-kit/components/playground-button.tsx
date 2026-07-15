import { LucideIcons, Button, DOCUMENTATION_URL } from '../../../index';

export const PlaygroundButton = () => {
  return (
    <Button
      variant="ghost"
      size="small"
      fullWidth
      onClick={() => {
        window.open(DOCUMENTATION_URL, '_blank');
      }}
    >
      <div className="flex items-center gap-2">
        <LucideIcons.PlayCircle className="w-4 h-4 animate-pulse" />
        <span className="text-sm font-medium">Playground</span>
      </div>
    </Button>
  );
};
