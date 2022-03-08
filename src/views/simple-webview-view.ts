window.addEventListener('load', () => {
    const vscodeApi = acquireVsCodeApi();
    const helloButton = document.getElementById('hello-button')!;
    helloButton.addEventListener('click', () => vscodeApi.postMessage('Hello World'));
});
