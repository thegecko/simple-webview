import * as vscode from 'vscode';
import { SimpleWebview } from '../views/simple-webview-main';

export const activate = async (context: vscode.ExtensionContext): Promise<void> => {
    vscode.window.showInformationMessage('Activating desktop extension');

    if (vscode.env.uiKind !== vscode.UIKind.Desktop) {
        vscode.window.showWarningMessage('Running desktop extension in web');
    }

    const simpleView = new SimpleWebview(context.extensionUri);
    await simpleView.activate(context);
};
