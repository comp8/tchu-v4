interface IOptions {

}

class Database<T> {
  public raw: T;
  public isDirty: () => boolean;

  constructor(init: T, options: IOptions) {
    this.raw = init;
    this.isDirty = () => true;
  }
}

export { Database };