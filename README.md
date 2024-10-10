# Compression-CLI

Compression-CLI is a simple command-line utility built using Node.js that compresses PNG images, similar to TinyPNG. It allows you to reduce the size of PNG files while maintaining acceptable image quality. This utility uses the `sharp` library to perform image compression, and `yargs` to handle command-line arguments.

## Features
- Compress PNG images to reduce file size.
- Specify output quality and compression level.
- Resize images while retaining aspect ratio.
- Automatic output file naming.
- Easy-to-use command-line interface.

## Requirements
- Node.js (version 14 or higher recommended)
- npm (Node Package Manager)

## Installation
1. Clone the repository or create your project directory:
   ```bash
   git clone <repository-url>
   cd compression-cli
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage
To compress an image, use the following command:

```bash
node compress.js --input-file <path-to-input-file> [options]
```

### Command-Line Arguments
- `--input-file` or `-i` (required): The path to the PNG file you want to compress.
- `--output-file` or `-o` (optional): The path where the compressed file should be saved. If not specified, the output file will have the same name as the input file, with `-compressed` appended before the extension.
- `--quality` or `-q` (optional): The quality of the compressed image (0-100). Default is `70`.
- `--compressionLevel` or `-c` (optional): The compression level for the PNG file (0-9). Default is `9`.
- `--reduce-size` or `-r` (optional): Percentage to reduce the image dimensions (1-99). The aspect ratio is retained. For example, if the original image is 100px by 50px and `--reduce-size 50` is provided, the output will be 50px by 25px. The output file name will also include the new dimensions (e.g., `filename-compressed-50x25.png`).

### Examples

1. **Basic Compression with Default Settings**
   ```bash
   node compress.js --input-file ./images/sample.png
   ```
   This command compresses `sample.png` and saves it as `sample-compressed.png` in the same directory, using the default quality of `70` and compression level of `9`.

2. **Specify Output File Path**
   ```bash
   node compress.js --input-file ./images/sample.png --output-file ./compressed/output.png
   ```
   This command compresses `sample.png` and saves it to `./compressed/output.png`.

3. **Set Custom Quality and Compression Level**
   ```bash
   node compress.js --input-file ./images/sample.png --quality 50 --compressionLevel 5
   ```
   This command compresses the image with a quality of `50` and a compression level of `5`, saving it as `sample-compressed.png`.

4. **Reduce Image Dimensions**
   ```bash
   node compress.js --input-file ./images/sample.png --reduce-size 50
   ```
   This command reduces the dimensions of `sample.png` by `50%`, retains the aspect ratio, and saves the compressed image as `sample-compressed-<newWidth>x<newHeight>.png`.

## Output
- The script logs the following information:
  - **Input file size** in KB.
  - **Output file size** in KB.
  - **Size saved** in KB and percentage reduction.

## Example Output
```
Input file size: 1024.56 KB
Output file size: 512.78 KB
Size saved: 511.78 KB (49.97%)
Compressed image saved to: ./images/sample-compressed.png
```

## License
This project is licensed under the MIT License.

## Contributing
Feel free to submit pull requests or issues if you'd like to contribute to the project.

## Author
- [Your Name]

## Acknowledgments
- Thanks to the creators of the `sharp` library for making image processing easy in Node.js.
- Inspired by the TinyPNG service.