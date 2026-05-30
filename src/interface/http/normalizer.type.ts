export interface SerializeOptions {
  groups?: string[];
  metadata?: Metadata;
}

interface PropertyMetadata {
  ignore?: boolean;
  groups?: string[];
  serializedName?: string;
  metadata?: Metadata;
}

type Metadata = { [key: string]: PropertyMetadata };

export type Normalizer = (input: unknown, options?: SerializeOptions) => unknown;
