import { App, Setting, Plugin, Notice, Menu, PluginSettingTab } from "obsidian";
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

interface ObsidianToBookstackSettings {
	configPath: string;
	envPath: string;
}

const DEFAULT_SETTINGS: ObsidianToBookstackSettings = {
	configPath: "~/.config/obsidian_to_bookstack/conf.toml",
	envPath: "",
};

export default class ObsidianToBookstackPlugin extends Plugin {
	private doppler: boolean;
	settings: ObsidianToBookstackSettings;

	async onload() {
		await this.loadSettings();
		// @ts-ignore
		const pluginPath = this.app.vault.adapter.basePath;
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

		this.addSettingTab(
			new ObsidianToBookstackPluginSettingTab(this.app, this)
		);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
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

		if (this.settings.configPath) {
			command = `${command} --config ${this.settings.configPath}`;
		}

		if (this.settings.envPath) {
			command = `${command} --env ${this.settings.envPath}`;
		}

		if (this.doppler) {
			command = "doppler run -- " + command;
		}

		return command;
	}

	runBookstackCommands(args: Array<BookstackCommands>) {
		args.forEach((arg) => {
			let command = this.buildBaseCommand();
			command = `${command} ${arg}`;
			console.log(command);

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

class ObsidianToBookstackPluginSettingTab extends PluginSettingTab {
	plugin: ObsidianToBookstackPlugin;
	constructor(app: App, plugin: ObsidianToBookstackPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Configuration File Path")
			.setDesc(
				"Configuration file to load for use with `obsidian-to-bookstack`"
			)
			.addText((text) =>
				text
					.setPlaceholder("Enter the path to your config.")
					.setValue(this.plugin.settings.configPath)
					.onChange(async (value) => {
						this.plugin.settings.configPath = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Env File Path")
			.setDesc("Env file to load for use with `obsidian-to-bookstack`")
			.addText((text) =>
				text
					.setPlaceholder("Enter the path to your env file.")
					.setValue(this.plugin.settings.envPath)
					.onChange(async (value) => {
						this.plugin.settings.envPath = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
