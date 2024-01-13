# ObsidianToBookstack

Obsidian plugin wrapper over my project [`obsidian_to_bookstack`]([https://github.com/jaypyles/obsidian-to-bookstack). Allows for easy use of the CLI tool whilst in Obsidian.

## Setup

Configure `obsidian_to_bookstack` using the guide in the repo. This will use all of the config from that.
Until I get this officially published, follow this to install into your Obsidian Vault.

```bash
cd ~/obsidian_vault/.obsidian/plugins
git clone https://github.com/jaypyles/ObsidianToBookstackPlugin
npm install
```

## Functionality

The ribbon will now include a book icon with two different options, pushing and pulling. Pull will download any missing pages, books, chapters, or shelves into the Obsidian Vault.
Then it will update any notes which need updating. Push will do the same, but in the Bookstack instance.
