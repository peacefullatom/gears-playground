interface ITreeProps {
  [key: string]: any;
}

export interface IBranch {
  props?: ITreeProps;
  reference?: HTMLElement;
  children?: ITree[];
}

export interface ITree {
  [key: string]: IBranch;
}
