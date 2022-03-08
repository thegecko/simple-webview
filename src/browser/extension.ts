import * as vscode from 'vscode';
import { SimpleWebview } from '../views/simple-webview-main';

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    vscode.window.showInformationMessage('Activating web extension');

    if (vscode.env.uiKind !== vscode.UIKind.Web) {
        vscode.window.showWarningMessage('Running web extension in desktop');
    }

    const simpleView = new SimpleWebview(context.extensionUri);
    await simpleView.activate(context);
};
