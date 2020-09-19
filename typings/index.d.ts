declare module 'slay-terminus' {
  import { TerminusOptions } from '@godaddy/terminus';

  type SlayTerminus = (app: any, opts: Object, done: () => any) => void;

  function createSlayTerminus(TerminusOptions: TerminusOptions): SlayTerminus;

  export = createSlayTerminus;
}
