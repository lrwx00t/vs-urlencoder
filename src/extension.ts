import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let editor = vscode.window.activeTextEditor;
	let disposableEncode = vscode.commands.registerCommand('url-encoder.encode', () => {
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
}

export function deactivate() { }
