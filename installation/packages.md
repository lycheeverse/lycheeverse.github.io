# Installation via Package Manager

## Packaging Status

<a href="https://repology.org/project/lychee-link-checker/versions">
    <img src="https://repology.org/badge/vertical-allrepos/lychee-link-checker.svg?header=&columns=5" alt="Packaging status">
</a>

## Package Managers

### Arch Linux

```bash
pacman -S lychee-link-checker
```

### macOS

```bash
brew install lychee
```

### NixOS

```bash
nix-env -iA nixos.lychee
```

### FreeBSD

```bash
pkg install lychee
```

### Termux

```bash
pkg install lychee
```

### Pre-built binaries

We provide binaries for Linux, macOS, and Windows for every release. \
You can download them from the [releases page](https://github.com/lycheeverse/lychee/releases).

### Cargo

#### Build dependencies <!-- {docsify-ignore} -->

On APT/dpkg-based Linux distros (e.g. Debian, Ubuntu, Linux Mint and Kali Linux)
the following commands will install all required build dependencies, including
the Rust toolchain and `cargo`:

```bash
curl -sSf 'https://sh.rustup.rs' | sh
apt install gcc pkg-config libc6-dev libssl-dev
```

#### Compile and install lychee <!-- {docsify-ignore} -->

```bash
cargo install lychee
```

[contribute]: https://github.com/lycheeverse/lychee/issues/59
