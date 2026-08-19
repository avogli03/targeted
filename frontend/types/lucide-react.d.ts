declare module "lucide-react" {
  import type { ComponentType, SVGProps } from "react";

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
  };

  export const Menu: ComponentType<LucideProps>;
  export const Search: ComponentType<LucideProps>;
  export const ChevronLeft: ComponentType<LucideProps>;
  export const ChevronRight: ComponentType<LucideProps>;
  export const Mail: ComponentType<LucideProps>;
  export const CalendarDays: ComponentType<LucideProps>;
  export const CircleUser: ComponentType<LucideProps>;
  export const PhoneCall: ComponentType<LucideProps>;
  export const SendHorizontal: ComponentType<LucideProps>;
}
