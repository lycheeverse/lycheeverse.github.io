## Installation

> There are many ways to install lychee and [you can contribute][contribute] to add it to more platforms ❤️.

Please find the installation method for your favorite operating system below.

### Arch Linux

```sh
pacman -S lychee-link-checker
```

### macOS

```sh
brew install lychee
```

### NixOS

```sh
nix-env -iA nixos.lychee
```

### FreeBSD

```sh
pkg install lychee
```

### Termux

```sh
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

```sh
curl -sSf 'https://sh.rustup.rs' | sh
apt install gcc pkg-config libc6-dev libssl-dev
```

#### Compile and install lychee <!-- {docsify-ignore} -->

```sh
cargo install lychee
```

[contribute]: https://github.com/lycheeverse/lychee/issues/59
