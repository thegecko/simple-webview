import * as vscode from 'vscode';

export class SimpleWebview implements vscode.WebviewViewProvider {

    private static viewType = 'simple-webview.webview';

    public constructor(protected extensionUri: vscode.Uri) {
    }

    public async activate(context: vscode.ExtensionContext): Promise<void> {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(SimpleWebview.viewType, this, {
                webviewOptions: {
                    retainContextWhenHidden: true
                }
            })
        );
    }

    public resolveWebviewView(webviewView: vscode.WebviewView, _context: vscode.WebviewViewResolveContext<unknown>, _token: vscode.CancellationToken): void | Thenable<void> {
        webviewView.webview.options = {
            enableScripts: true
        };

        webviewView.webview.html = this._getWebviewContent(webviewView.webview, this.extensionUri);
        webviewView.webview.onDidReceiveMessage(message => vscode.window.showInformationMessage(message));
        webviewView.title = 'Webview';
        webviewView.show();
    }

    private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
        const toolkitUri = webview.asWebviewUri(vscode.Uri.joinPath(
            extensionUri,
            'node_modules',
            '@vscode',
            'webview-ui-toolkit',
            'dist',
            'toolkit.js'
        ));

        const mainUri = webview.asWebviewUri(vscode.Uri.joinPath(
            extensionUri,
            'views',
            'webview.js'
        ));

        return `
            <!DOCTYPE html>
            <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <script type='module' src='${toolkitUri}'></script>
                    <script type='module' src='${mainUri}'></script>
                </head>
                <body>
                    <vscode-button id='hello-button' title='Say Hello' aria-label='Say Hello'>
                        Say Hello
                    </vscode-button>
                </body>
            </html>
        `;
    }
}
