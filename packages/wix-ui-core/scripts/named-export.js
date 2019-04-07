const path = require('path');
const fs = require('fs');
const glob = require('glob');


const throwOnError = (err) => {
  if (err) throw err;
};

const nextLine = '\n';
const topComment = `/* This file is autogenerated with ${__filename.split('/').slice(-2).join('/')} */\n`

const generateResult = (moduleExports) => {
  return topComment +
  nextLine +
  moduleExports +
  nextLine;
};

const createExports = (targetDirs, location, { ignore } = {}) => {
  const moduleExports = targetDirs.reduce((total, dirName) => {
    const globPattern = dirName != '*'
    ? `${location}/${dirName}/**/*index.ts{,x}`
    : `${location}/*/**index.ts{,x}`;
    const dirFiles = glob.sync(globPattern, { ignore });
    const resolvedPaths = dirFiles.reduce((totalInDir, currentDirName) => {
      const currentDirPath = path.parse(currentDirName).dir;
      const relativePath = path.relative(location, currentDirPath);
      const str = `export * from './${relativePath}';`;
      return totalInDir.concat(str);
    }, []);
    return total.concat(resolvedPaths);
  }, []).join(nextLine);
  const indexLocation = path.join(location, 'index.ts');
  fs.writeFileSync(indexLocation, generateResult(moduleExports), throwOnError)
};

module.exports = createExports;
