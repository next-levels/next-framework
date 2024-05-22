export const uuidTransformer = {
  to: (uuid: string | undefined | number) => {
    console.log('Transforming UUID to binary:', uuid);
    if (typeof uuid !== 'string') {
      console.log('Invalid UUID format. Expected a string.');
      return null;
    }
    const result = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    console.log('Resulting binary:', result);
    return result;
  },
  from: (bin: Buffer | null | string) => {
    console.log('Transforming binary to UUID:', bin);
    if (!bin) {
      return null;
    }
    if (typeof bin === 'string') {
      console.log('Buffer is allready string.');
      return bin;
    }
    const result = `${bin.toString('hex', 0, 4)}${bin.toString(
      'hex',
      4,
      6
    )}${bin.toString('hex', 6, 8)}${bin.toString('hex', 8, 10)}${bin.toString(
      'hex',
      10,
      16
    )}`;
    console.log('Resulting UUID:', result);
    return result;
  },
};
