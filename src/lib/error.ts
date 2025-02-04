export type ErrorKind = {
  kind:
    | 'io'
    | 'reqwest'
    | 'headerValue'
    | 'serdeJson'
    | 'invalidKey'
    | 'poison'
    | 'tauriStore'
    | 'custom'
  message: string
}
