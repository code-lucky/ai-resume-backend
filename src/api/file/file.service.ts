import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { In } from 'typeorm';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class FileService {
  async readLocalImage(filePath: string): Promise<Buffer> {
    try {
      const data = await readFileAsync(filePath);
      return data;
    } catch (error) {
      throw new Error(`Error reading local image: ${error.message}`);
    }
  }
}
