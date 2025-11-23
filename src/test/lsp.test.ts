import * as assert from 'assert';
import {
    getFunctionContentFromLineAndCharacter,
    getFileLineAndCharacterFromFunctionName
} from "../core/lsp";
import resolution_content from "./stub/lsp/resolution_content.json";
import path from "path";

// please edit pathToYourDirectory when you want to test it.
const pathToYourDirectory = "/Users/kazuyakurihara/Documents/work/llm/OJT/ruby-reader-ja"

suite('Extension LSP', () => {
    // getFunctionContentFromLineAndCharacter
    // 行数・何文字目・ファイルパスから、関数の内容を取得
    // resolution.rb
    test("getFunctionContentFromLineAndCharacter resolution.rb", async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "resolution.rb");
        for(let i = 0; i < resolution_content.length; i++) {
            const currentFileContent = resolution_content[i];
            const functionContent = await getFunctionContentFromLineAndCharacter(
                stubFilePath,
                currentFileContent.line,
                currentFileContent.character
            );
            assert.strictEqual(functionContent, currentFileContent.functionContent);
        }
    });
    // dependency_graph.rb vertex_named

    // getFileLineAndCharacterFromFunctionName
    // 関数の先頭１行目とファイルパスから、行数・何文字目かを取得
    // resolution.rb isFirst
    test('getFileLineAndCharacterFromFunctionName resolution.rb', async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "resolution.rb");
        for(let i = 0; i < resolution_content.length; i++) {
            const currentFileContent = resolution_content[i];
            if (currentFileContent.queryCharacter) continue;
            const [line, character] = await getFileLineAndCharacterFromFunctionName(
                stubFilePath,
                currentFileContent.functionName,
                currentFileContent.functionName,
                true
            );
            console.log("current : ", currentFileContent.line, currentFileContent.character);
            assert.strictEqual(currentFileContent.line, line);
            assert.strictEqual(currentFileContent.character, character);
        }
    });

    // resolution.rb not isFirst
    test('getFileLineAndCharacterFromFunctionName resolution.rb', async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "resolution.rb");
        for(let i = 0; i < resolution_content.length; i++) {
            const currentFileContent = resolution_content[i];
            if (!currentFileContent.queryCharacter) continue;
            const [line, character] = await getFileLineAndCharacterFromFunctionName(
                stubFilePath,
                currentFileContent.firstLine,
                currentFileContent.functionName,
                false
            );
            assert.strictEqual(currentFileContent.queryLine ?? 0, line);
            assert.strictEqual(currentFileContent.queryCharacter ?? 0, character);
        }
    });
})