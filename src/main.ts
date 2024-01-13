import { Plugin, Notice, Menu } from "obsidian";
import { exec } from "child_process";

enum BookstackCommands {
	push = "remote",
	pull = "local",
	updateRemote = "update --remote",
	updateLocal = "update --local",
}

// Update the type definition for LogMessages
interface LogMessages {
	[BookstackCommands.push]: string;
	[BookstackCommands.pull]: string;
	[BookstackCommands.updateRemote]: string;
	[BookstackCommands.updateLocal]: string;
}

// Define log messages
const logMessages: LogMessages = {
	[BookstackCommands.push]: "Pushing missing files to Bookstack",
	[BookstackCommands.pull]: "Pulling files from Bookstack",
	[BookstackCommands.updateRemote]: "Updating remote files",
	[BookstackCommands.updateLocal]: "Updating local files",
};

export default class ObsidianToBookstackPlugin extends Plugin {
	private doppler: boolean;

	onload() {
		const pluginPath = this.app.vault.adapter.basePath; //type: ignore
		process.chdir(pluginPath);

		this.checkIfDoppler();
		this.addRibbonIcon("book", "Bookstack", (event) => {
			const menu = new Menu();
			menu.addItem((item) =>
				item
					.setTitle("Push to Bookstack")
					.setIcon("book-up")
					.onClick(() =>
						this.runBookstackCommands([
							BookstackCommands.push,
							BookstackCommands.updateRemote,
						])
					)
			);

			menu.addItem((item) =>
				item
					.setTitle("Pull from Bookstack")
					.setIcon("book-down")
					.onClick(() =>
						this.runBookstackCommands([
							BookstackCommands.pull,
							BookstackCommands.updateLocal,
						])
					)
			);
			menu.showAtMouseEvent(event);
		});
	}

	checkIfDoppler() {
		const command = "doppler --version";

		exec(command, (error, stdout, stderr) => {
			if (error || stderr) {
				new Notice(`Doppler not installed or not properly set.`);
				this.doppler = false;
				return;
			} else {
				this.doppler = true;
			}
		});
	}

	buildBaseCommand(): string {
		let command = "obsidian_to_bookstack";

		if (this.doppler) {
			command = "doppler run -- " + command;
		}

		return command;
	}

	runBookstackCommands(args: Array<BookstackCommands>) {
		args.forEach((arg) => {
			let command = this.buildBaseCommand();
			command = `${command} ${arg}`;

			exec(command, (error, stdout, stderr) => {
				if (error || stderr) {
					new Notice(`Error with command, check console for error.`);
					console.log(`${error}`);
					return;
				}
				new Notice(logMessages[arg]);
			});
		});
	}
}
