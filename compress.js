// Import required modules
const yargs = require('yargs');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configure yargs to handle command line arguments
const argv = yargs
  .option('input-file', {
    alias: 'i',
    describe: 'Path to the PNG file to compress',
    type: 'string',
    demandOption: true,
  })
  .option('output-file', {
    alias: 'o',
    describe: 'Path to save the compressed output file',
    type: 'string',
  })
  .option('quality', {
    alias: 'q',
    describe: 'Quality of the compressed PNG (0-100)',
    type: 'number',
    default: 70,
  })
  .option('compressionLevel', {
    alias: 'c',
    describe: 'Compression level of the PNG (0-9)',
    type: 'number',
    default: 9,
  })
  .option('resize-width', {
    alias: 'r',
    describe: 'Width to resize the image to (integer value)',
    type: 'number',
  })
  .help()
  .alias('help', 'h')
  .argv;

// Extract arguments from argv
const inputFilePath = argv['input-file'];
const resizeWidth = argv['resize-width'];

let outputFilePath = argv['output-file'] ||
  path.join(
    path.dirname(inputFilePath),
    `${path.basename(inputFilePath, path.extname(inputFilePath))}-compressed${path.extname(inputFilePath)}`
  );

const quality = argv.quality;
const compressionLevel = argv.compressionLevel;

// Compress the image using sharp
async function compressImage() {
  try {
    // Get input file size
    const inputFileStats = fs.statSync(inputFilePath);
    const inputFileSizeKB = inputFileStats.size / 1024;
    console.log(`Input file size: ${inputFileSizeKB.toFixed(2)} KB`);

    // Load input image
    let image = sharp(inputFilePath);
    const metadata = await image.metadata();

    // Resize image if resize-width option is provided
    if (resizeWidth) {
      const newHeight = Math.round((metadata.height / metadata.width) * resizeWidth);
      console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);
      console.log(`New dimensions after resizing: ${resizeWidth}x${newHeight}`);
      image = image.resize(resizeWidth, newHeight);

      if (!argv['output-file']) {
        outputFilePath = path.join(
          path.dirname(inputFilePath),
          `${path.basename(inputFilePath, path.extname(inputFilePath))}-compressed-${resizeWidth}x${newHeight}${path.extname(inputFilePath)}`
        );
      }
    }

    // Compress the image
    await image
      .png({ quality: quality, compressionLevel: compressionLevel })
      .toFile(outputFilePath);

    // Get output file size
    const outputFileStats = fs.statSync(outputFilePath);
    const outputFileSizeKB = outputFileStats.size / 1024;
    console.log(`Output file size: ${outputFileSizeKB.toFixed(2)} KB`);

    // Calculate size reduction
    const savedKB = inputFileSizeKB - outputFileSizeKB;
    const savedPercentage = (savedKB / inputFileSizeKB) * 100;
    console.log(`Size saved: ${savedKB.toFixed(2)} KB (${savedPercentage.toFixed(2)}%)`);

    console.log(`Compressed image saved to: ${outputFilePath}`);
  } catch (error) {
    console.error(`Error compressing image: ${error.message}`);
  }
}

// Execute the compression
compressImage();
