import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface LinkIconProps extends LucideProps {
  name: string;
}

export const LinkIcon = ({ name, ...props }: LinkIconProps) => {
  const Icon = (LucideIcons as any)[name];
  if (!Icon) return <LucideIcons.ExternalLink {...props} />;
  return <Icon {...props} />;
};
