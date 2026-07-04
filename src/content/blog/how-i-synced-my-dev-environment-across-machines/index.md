---
title: "How I Synced My Entire Dev Environment Across Machines with GNU Stow"
description: "Using GNU stow, a Brewfile, and a simple two-package architecture to sync dotfiles across macOS and Linux machines — no custom scripts, no paid tools."
date: 2026-06-27
tags: ["DevOps", "Tooling"]
readTime: "4 min"
---

I run two Mac Minis and a Raspberry Pi cluster. For months, my configs drifted across them. I'd tweak Neovim on the living room Mac Mini, then wonder why the same keybinding didn't work on the server rack machine. I'd install Lazygit on one but forget to install it on the other.

I needed a setup where one edit is instantly live everywhere. No custom sync scripts. No paid tools. Just git, symlinks, and a single install command.

GNU stow turned out to be the answer.

## Why stow over alternatives

Stow is ruthlessly simple. You organise configs in a directory tree under `~/dotfiles/packages/`, and stow creates symlinks to their target locations. Your actual configs live in the repo — the symlinks are just pointers.

I evaluated two alternatives:

- **Chezmoi** — powerful, but introduces its own template language and file format. I don't want to learn a DSL to manage my Neovim config.
- **Yadm** — wraps git with alternative branch support. Neat trick, but adds an extra git wrapper to remember.

Stow does one thing: `stow common` creates a symlink farm from `packages/common/` to `~/`. No config file. No templates. No wrapper. The dotfiles themselves are the source of truth.

## Architecture

The dotfiles root at `~/dotfiles/` has two package directories:

```
~/dotfiles/
├── Brewfile
├── install.sh
└── packages/
    ├── common/        # both macOS & Linux
    └── macos/         # macOS only (Karabiner-Elements)
```

**`packages/common/`** holds cross-platform configs: Neovim (LazyVim), Tmux with plugins (tpm, catppuccin, battery, cpu, navigator), Ghostty terminal, Vim, and shell configs. These run identically on macOS and Linux.

**`packages/macos/`** holds macOS-specific configs — currently Karabiner-Elements. On Linux, the install script skips this directory entirely. A future `packages/linux/` might hold input remapping for the Raspberry Pi.

The beauty of this split: cloning on a new Linux machine and running the install script sets up everything that matters, silently ignoring the macOS bits.

## The Brewfile

I maintain a single `Brewfile` with exactly 11 packages:

```
brew "stow"
brew "neovim"
brew "lazygit"
brew "glow"
brew "fzf"
brew "tmux"
brew "gnupg"
brew "ripgrep"
brew "fd"
brew "anyzig"
cask "opencode"
```

Each earns its place:

- **stow** — the backbone. Must be installed before bootstrap can run.
- **neovim** + **tmux** — the daily driver. Everything else is support.
- **lazygit** — TUI git client. Replaced my entire git CLI workflow.
- **glow** — renders markdown in terminal. I read docs and my own notes without leaving the terminal.
- **fzf** — fuzzy search, wired into my shell and editor.
- **ripgrep** + **fd** — faster grep and find. Replace `grep` and the built-in `find`.
- **gnupg** — signing commits and decrypting secrets.
- **anyzig** — Zig version manager. My current learning focus.
- **opencode** — daily AI coding assistant.

Everything else (zsh plugins, Tmux plugins, LazyVim) is managed inside the dotfiles themselves — no Brewfile needed.

## Bootstrap flow

The `install.sh` script is the single entry point for a new machine:

```bash
# Install Homebrew (if missing)
/bin/bash -c "$(curl -fsSL ...)"

# Install all packages from Brewfile
brew bundle

# Stow common packages
stow -d ~/dotfiles -t ~ common

# Stow macOS packages (Darwin only)
if [[ "$(uname)" == "Darwin" ]]; then
  stow -d ~/dotfiles -t ~ macos
fi
```

On a fresh Linux machine, it clones the repo and runs `install.sh`. Homebrew installs, brew bundle pulls down the 11 packages, stow common wires everything to `~/`. The macOS block never fires.

The result: from bare OS to working dev environment in under ten minutes.

## How it works day-to-day

I edit configs directly in `~/dotfiles/packages/`. Stow symlinks mean those edits are immediately reflected at the target path. I commit and push whenever I make a meaningful change. Pulling on another machine updates it instantly.

There's no sync daemon, no cron job, no cloud service. Git handles history and distribution. Stow handles placement.

## What's next

Two open items:

1. A `packages/linux/` directory for Raspberry Pi-specific configs (input remapping, systemd services).
2. A `--adopt` flag — stow can adopt existing config files into the repo if they already exist at the target path. I haven't needed it yet, but it would simplify the initial migration for a new machine with existing dotfiles.

If you're managing multiple machines and haven't tried GNU stow, start with one config — say, your `.tmux.conf`. Put it in `packages/common/`, run `stow common`, and see how it feels. You might find yourself migrating the rest within the hour.
