import * as path from "path";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function config () {
    return {
        entry: './src/server.js',
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'main.cjs'
        },
        target: 'node',
        plugins: [
            new CleanWebpackPlugin(),
        ]
    }
}
