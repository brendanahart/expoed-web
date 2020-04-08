export class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}
