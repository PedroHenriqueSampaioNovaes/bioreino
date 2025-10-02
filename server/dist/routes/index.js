"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Automates route export
exports.default = node_fs_1.default
    .readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && !/index.[ts|js]/.test(file))
    .map((file) => require(node_path_1.default.resolve(__dirname, file)).default);
