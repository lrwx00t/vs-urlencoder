import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposableEncode = vscode.commands.registerCommand('url-encoder.encode', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			let selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			if (!selection.isEmpty) {
				const encodedText = encodeURIComponent(selectedText);
				editor.edit((editBuilder) => {
					editBuilder.replace(selection, encodedText);
				});
			}
		}
	});

	let disposableDecode = vscode.commands.registerCommand('url-encoder.decode', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			let selection = editor.selection;
			let selectedText = editor.document.getText(selection);
			if (!selection.isEmpty) {
				const decodedText = decodeURIComponent(selectedText);
				editor.edit((editBuilder) => {
					editBuilder.replace(selection, decodedText);
				});
			}
		}
	});

	context.subscriptions.push(disposableEncode);
	context.subscriptions.push(disposableDecode);

	vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (editor) {
			console.log(`Active editor changed: ${editor.document.fileName}`);
		}
	});
}

export function deactivate() { }
