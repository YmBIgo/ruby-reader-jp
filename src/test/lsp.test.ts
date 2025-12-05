import * as assert from 'assert';
import {
    getFunctionContentFromLineAndCharacter,
    getFileLineAndCharacterFromFunctionName
} from "../core/lsp";
import resolution_content from "./stub/lsp/resolution_content.json";
import rubygems_application_content from "./stub/lsp/rubygems_application_content.json"
import home_controller_content from "./stub/lsp/home_controller_content.json";
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

    // application.rb
    test("getFunctionContentFromLineAndCharacter application.rb", async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "application.rb");
        for(let i = 0; i < rubygems_application_content.length; i++) {
            const currentFileContent = rubygems_application_content[i];
            const functionContent = await getFunctionContentFromLineAndCharacter(
                stubFilePath,
                currentFileContent.line,
                currentFileContent.character
            );
            assert.strictEqual(functionContent, currentFileContent.functionContent);
        }
    });  
    // home_controller.rb
    test("getFunctionContentFromLineAndCharacter home_controller.rb", async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "home_controller.rb");
        for(let i = 0; i < home_controller_content.length; i++) {
            const currentFileContent = home_controller_content[i];
            const functionContent = await getFunctionContentFromLineAndCharacter(
                stubFilePath,
                currentFileContent.line,
                currentFileContent.character
            );
            assert.strictEqual(functionContent, currentFileContent.functionContent);
        }
    });  

    // getFileLineAndCharacterFromFunctionName
    // 関数の先頭１行目とファイルパスから、行数・何文字目かを取得
    // resolution.rb isFirst
    test('getFileLineAndCharacterFromFunctionName isFirst resolution.rb', async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "resolution.rb");
        for(let i = 0; i < resolution_content.length; i++) {
            const currentFileContent = resolution_content[i];
            if (currentFileContent.queryCharacter) continue;
            const [line, character] = await getFileLineAndCharacterFromFunctionName(
                stubFilePath,
                currentFileContent.firstLine,
                currentFileContent.firstLine,
                true
            );
            console.log("current resolution : ", currentFileContent.line, currentFileContent.character);
            assert.strictEqual(currentFileContent.line, line);
            assert.strictEqual(currentFileContent.character, character);
        }
    });

    // resolution.rb not isFirst
    test('getFileLineAndCharacterFromFunctionName !isFirst resolution.rb', async() => {
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

    // application.rb isFirst
    test('getFileLineAndCharacterFromFunctionName isFirst application.rb', async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "application.rb");
        for(let i = 0; i < rubygems_application_content.length; i++) {
            const currentFileContent = rubygems_application_content[i];
            const [line, character] = await getFileLineAndCharacterFromFunctionName(
                stubFilePath,
                currentFileContent.firstLine,
                currentFileContent.firstLine,
                true
            );
            console.log("current application isFirst : ", currentFileContent.line, currentFileContent.character);
            assert.strictEqual(currentFileContent.line, line);
            assert.strictEqual(currentFileContent.character, character);
        }
    });

    // application.rb not isFirst
    test('getFileLineAndCharacterFromFunctionName !isFirst application.rb', async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "application.rb");
        for(let i = 0; i < rubygems_application_content.length; i++) {
            const currentFileContent = rubygems_application_content[i];
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

    // home_controller.rb not isFirst
    test('getFileLineAndCharacterFromFunctionName !isFirst home_controller.rb', async() => {
        const stubFilePath = path.resolve(pathToYourDirectory, "src", "test", "stub", "lsp", "home_controller.rb");
        for(let i = 0; i < home_controller_content.length; i++) {
            const currentFileContent = home_controller_content[i];
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