declare module 'cursify' {
  interface CursifyOptions {
    type?: 'magic' | 'pointer' | 'text' | 'crosshair' | 'default';
    color?: string;
    size?: number;
    magnetism?: boolean;
    magnetStrength?: number;
  }

  interface CursifyInstance {
    destroy: () => void;
  }

  export function cursify(options?: CursifyOptions): CursifyInstance;
}