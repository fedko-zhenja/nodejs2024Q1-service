import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const filePath = join(__dirname, '../../', 'doc', 'api.yaml');

export const yamlFileLoad = yaml.load(readFileSync(filePath, 'utf-8'));
