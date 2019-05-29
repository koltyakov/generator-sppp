export const wrapPromiseTest = <T>(testPromise: Promise<T>, done: Mocha.Done, callback?: (result: T) => void): void => {
  testPromise
    .then((result) => {
      if (callback) {
        callback(result);
      } else {
        done();
      }
    })
    .catch(done);
};
