---
title: "How I Synced My Entire Dev Environment Across Machines with GNU Stow"
description: "Using GNU stow, a Brewfile, and a simple two-package architecture to sync dotfiles across macOS and Linux machines — no custom scripts, no paid tools."
date: 2026-06-27
tags: ["DevOps", "Tooling"]
readTime: "4 min"
---

My main coding machine is a MacBook Pro 14-inch — it has all my Neovim config, tmux keybindings, lazygit, and opencode setup. The Mac Mini at home currently only runs an opencode agent for my knowledge base. I want to code on it too without pulling out my laptop every time.

I needed a setup where one edit is instantly live everywhere. No custom sync scripts. No paid tools. Just git, symlinks, and a single install command.

GNU stow turned out to be the answer.

## How it works

You organise configs in a directory tree under `~/dotfiles/packages/`, and stow creates symlinks to their target locations. Your actual configs live in the repo — the symlinks are just pointers. Run `stow common` and it wires everything in `packages/common/` to `~/`. No config file, no templates, no wrapper.

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

Except they don't, really. My Mac Mini currently only runs an opencode agent for my knowledge base, so it has agent-specific configs but not the full dev environment. The "common" label is aspirational — these configs are common across machines doing similar work, not universally identical.

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

It doesn't matter which machine I edit from. I mostly push from the MBP, but the system is agnostic — commit anywhere, pull everywhere. One edit, instantly live on all machines.

The one time it broke: I made a change directly to `~/.tmux.conf` — muscle memory from before stow. Worked fine locally. Then I pulled on the other Mac Mini, ran `stow common`, and stow silently overwrote my edit with the old version from the repo. The change I'd spent 20 minutes on was gone.

The fix was a mental model shift: stow owns those paths now. If I want to edit a config file and have it stick, I edit it in `~/dotfiles/packages/`. Took losing one change to build the reflex.

An unexpected benefit: if my MacBook is stolen or dies, I don't lose my environment. Clone the repo on a replacement machine, run `install.sh`, and I'm back to where I was. No remembering what I had installed. No reconstructing keybindings from memory.

## What's next

Three open items:

1. A `packages/linux/` directory for Raspberry Pi-specific configs (input remapping, systemd services).
2. A `--adopt` flag — stow can adopt existing config files into the repo if they already exist at the target path. I haven't needed it yet, but it would simplify the initial migration for a new machine with existing dotfiles.
3. **Chezmoi** — stow's simplicity starts to creak when each machine needs custom overrides beyond the two-package split. Chezmoi's template system handles per-machine divergence explicitly. Worth evaluating when the common/macos split stops scaling.

Stow does almost nothing. No daemon, no DSL, no sync protocol — just symlinks and git. The laziest tool is usually the one that survives the longest.

If you manage multiple machines, start with one config. Put your `.tmux.conf` in `packages/common/`, run `stow common`, and let the simplicity convince you.
