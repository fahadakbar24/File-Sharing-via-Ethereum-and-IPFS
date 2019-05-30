$(function () {

    // define a new console
    window.console = (function (oldCons) {
        const writeLog = (msg, argument) => {
            const fileLog = $('#fileLog');
            fileLog.append(`<p>${msg} ${argument}</p>`);
            fileLog.scrollTop = fileLog.scrollHeight;
        };

        return {
            log: function (msg, argument) {
                oldCons.log(msg, argument);
                writeLog(msg, argument);
            },
            info: function (msg, argument) {
                oldCons.info(msg, argument);
                writeLog(msg, argument);
            },
            warn: function (msg, argument) {
                oldCons.warn(msg, argument);
                writeLog(msg, argument);
            },
            error: function (msg, argument) {
                oldCons.error(msg, argument);
                writeLog(msg, argument);
            }
        };
    }(window.console));

    function onError(err) {
        console.log(err);
    }

    function urlSaver() {
        const url = $('#url-picker').val();
        storeContent(url);
    }

    function fileSaver() {
        const files = $('#file-picker')[0].files;

        function readFileContents(file) {
            return new Promise((resolve) => {
                const reader = new window.FileReader();
                reader.onload = (event) => resolve(event.target.result);
                reader.readAsArrayBuffer(file);
            })
        }

        Array.forEach(files, (file) => {
            readFileContents(file)
                .then((buffer) => {
                    fileSize = file.size;

                    storeContent({
                        path: file.name,
                        content: window.ipfs.Buffer.from(buffer)
                    });

                })
                .catch(onError)
        })
    }


    deployStorage('0xa30a6b9616fd994ae3c6df0407aaaab67751d341aaf747af2f74b069290057fc');

    $('#url-saver').click(urlSaver);
    $('#file-saver').click(fileSaver);
});