"use strict";

console.log("Starting fs-extra...");

const path = require('path');
const fse = require('fs-extra'); // now npm team uses fs-extra module to instead fs module

const newFolderPath = path.join(__dirname, "fseCreateFolder");
const newFilePath = path.join(newFolderPath, "fseCreateFile.txt");

// an async IIFE(immediately invoked function expression)
(async function () {
    // 1. exists: check if a file is exist
    const isFolderExist = await fse.exists(newFolderPath);
    if (isFolderExist) {
        console.log("Folder is already exist!")
        const isFileExist = await fse.exists(newFilePath);
        if (isFileExist) {
            console.log("File is already exist!")
        } else {
            // 2. createFile: create a new file
            const c = await fse.createFile(newFilePath);
            console.log(c);
            console.log("createFile: successful!")
        }
    } else {
        // 3. mkdir: create a new folder
        await fse.mkdir(newFolderPath);
        console.log("mkdir: successful!");
        await fse.createFile(newFilePath);
        console.log("createFile: successful!")
    }

    // 4. appendFile: if the file exists, write data to the file, if not exist, create file then write data
    await fse.appendFile(newFilePath, "Hello, NodeJS!");
    console.log("appendFile: append 'Hello, NodeJS!' to the file");

    // 5. stat: check a path is folder or file
    const stats = await fse.stat(newFilePath);
    console.log(stats);

    // 6. readdir: read all belongings of a folder
    const files = await fse.readdir(newFolderPath);
    console.log(`readdir: ${files}`);

    // 7. readFile: read the data of a file
    const data = await fse.readFile(newFilePath);
    console.log(`readFile: ${data}`);

    // 8. remove: remove a folder(contains the belonging subfolder and files) or a file
    await fse.remove(newFilePath);
    console.log(`remove: remove a file`);

    // 9. rmdir: can only remove an empty folder, if the folder is not empty, will cause an error
    await fse.rmdir(newFolderPath);
    console.log(`rmdir: remove an empty folder`);
})();




// callback functions
/* fse.exists(newFolderPath, function (isExist) {
    if (isExist) {
        fse.exists(newFilePath, function (isExist) {
            if (isExist) {
                console.log("file is already exist!")
            } else {
                fse.createFile(newFilePath, function (err) {
                    if (err) {
                        console.log(`createFile err: ${err}`);
                    }
                    console.log("createFile: successful!");
                });
            }
        })
    } else {
        fse.mkdir(newFolderPath, function (err) {
            if (err) {
                console.log(`mkdir err: ${err}`);
            }
            console.log(`mkdir: successful!`);
            fse.createFile(newFilePath, function (err) {
                if (err) {
                    console.log(`createFile err: ${err}`);
                }
                console.log("createFile: successful!");
            });
        })

    }
}); */

