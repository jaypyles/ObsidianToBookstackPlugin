# ObsidianToBookstack

Obsidian plugin wrapper over my project [`obsidian_to_bookstack`]([https://github.com/jaypyles/obsidian-to-bookstack). Allows for easy use of the CLI tool whilst in Obsidian.

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

## Functionality

The ribbon will now include a book icon with two different options, pushing and pulling. Pull will download any missing pages, books, chapters, or shelves into the Obsidian Vault.
Then it will update any notes which need updating. Push will do the same, but in the Bookstack instance.
