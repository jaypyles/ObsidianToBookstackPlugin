# ObsidianToBookstack

Obsidian plugin wrapper over my project [`obsidian_to_bookstack`]([https://github.com/jaypyles/obsidian-to-bookstack). Allows for easy use of the CLI tool whilst in Obsidian.

![Screenshot_20240113_182012](https://github.com/jaypyles/ObsidianToBookstackPlugin/assets/111098627/e76b33e1-50af-4eb1-af07-b80402257dba)

## Setup

Configure `obsidian_to_bookstack` using the guide in the repo (https://github.com/jaypyles/obsidian-to-bookstack). This will use all of the config from that.
Until I get this officially published, follow this to install into your Obsidian Vault.

Download the latest release from the releases tab.

```bash
cd ~/obsidian_vault/.obsidian/plugins
mkdir ObsidianToBookstackPlugin
mv ~/Downloads/main.js ~/obsidian/.obsidian/plugins/ObsidianToBookstackPlugin
mv ~/Downloads/manifest.json ~/obsidian/.obsidian/plugins/ObsidianToBookstackPlugin
```

All you need for the plugin to work is the `main.js` and `manifest.json`

Turn off restricted mode and enable "Obsidian to Bookstack"

You may choose to set the config file and env file through the settings menu.

![image](https://github.com/jaypyles/ObsidianToBookstackPlugin/assets/111098627/8742e3c6-187f-42bf-b2d5-9fc35d0da569)

## Functionality

The ribbon will now include a book icon with two different options, pushing and pulling. Pull will download any missing pages, books, chapters, or shelves into the Obsidian Vault.
Then it will update any notes which need updating. Push will do the same, but in the Bookstack instance.
