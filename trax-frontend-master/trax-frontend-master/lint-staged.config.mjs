export default {
  '*.{ts,js,html,scss,json,md}': filenames => {
    const chunkSize = 10;
    const chunks = [];

    for (let i = 0; i < filenames.length; i += chunkSize) {
      chunks.push(filenames.slice(i, i + chunkSize));
    }

    return chunks.map(chunk => `prettier --write ${chunk.join(' ')}`);
  },
};
