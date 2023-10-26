class AutoMapper {
  static map<TSource extends {}, TDestination extends {}>(
    source: new () => TSource,
    destination: new () => TDestination,
  ): Partial<TDestination> {
    const sourceObject = new source();
    const destinationObject = new destination();
    const commonKeys = Object.keys(sourceObject).filter((key) =>
      Object.keys(destinationObject).includes(key),
    );
    const mappedObject: Partial<TDestination> = {};

    commonKeys.forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mappedObject[key] = sourceObject[key];
    });

    return mappedObject;
  }

  static mapArray<TSource extends {}, TDestination extends {}>(
    sourceArray: new () => TSource,
    destination: new () => TDestination,
    sourceArrayLength: number,
  ): Partial<TDestination>[] {
    const mappedArray: Partial<TDestination>[] = [];

    for (let i = 0; i < sourceArrayLength; i++) {
      const sourceObject = new sourceArray();
      const destinationObject = new destination();
      const sourceObjectKeys = Object.keys(sourceObject);
      const destinationObjectKeys = Object.keys(destinationObject);
      const commonKeys = sourceObjectKeys.filter((key) =>
        destinationObjectKeys.includes(key),
      );
      const mappedObject: Partial<TDestination> = {};

      commonKeys.forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mappedObject[key] = sourceObject[key];
      });

      mappedArray.push(mappedObject);
    }

    return mappedArray;
  }
}

export { AutoMapper };
