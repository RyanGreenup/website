#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["typer"]
# ///
"""Publish the personal website as a standalone public git repository.

Clones origin into a temp dir, rewrites history with git-filter-repo so only
the website plus its workspace-package dependencies remain, then prints the
push command. Nothing is pushed unless you pass --push.
"""

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path

import typer

# Transitive workspace-dependency closure of apps/personal/website (the site
# plus the @rs/* packages it imports). Everything else is dropped from history.
KEEP_PATHS = [
    "apps/personal/website/",
    "packages/layout/",
    "packages/oxlint_config/",
    "packages/typescript-config/",
    "packages/storybook/",
    "packages/storybook-solid-code-transform/",
]
# Internal k8s manifests that live under a kept prefix but aren't public.
DROP_PATHS = [
    "apps/personal/website/primitives-storybook/deploy/",
    "apps/personal/website/website-storybook/deploy/",
]
TARGET_URL = "https://github.com/ryangreenup/website.git"

app = typer.Typer(add_completion=False, help=__doc__)


def run(cmd: list[str], *, cwd: Path | None = None) -> subprocess.CompletedProcess[str]:
    """Run a command (echoing it first), raising on non-zero exit."""
    typer.secho("  $ " + " ".join(cmd), fg=typer.colors.BRIGHT_BLACK)
    return subprocess.run(cmd, cwd=cwd, check=True, text=True, capture_output=True)


@app.command()
def publish(
    push: bool = typer.Option(False, "--push", help="Push to the public repo (after confirmation)."),
    force: bool = typer.Option(False, "--force", help="Force-push (overwrites public history). Implies --push."),
) -> None:
    """Prepare (and optionally push) the standalone website repository."""
    if shutil.which("git-filter-repo") is None:
        typer.secho("error: git-filter-repo not found (pipx install git-filter-repo)", err=True, fg=typer.colors.RED)
        raise typer.Exit(1)

    repo_root = Path(__file__).resolve().parent
    origin = run(["git", "remote", "get-url", "origin"], cwd=repo_root).stdout.strip()
    clone_dir = Path(tempfile.mkdtemp(prefix="website-publish-"))
    push = push or force

    typer.echo(f"==> cloning {origin} -> {clone_dir}")
    run(["git", "clone", "--no-local", origin, str(clone_dir)])

    typer.echo("==> filtering history")
    run(["git-filter-repo", *sum((["--path", p] for p in KEEP_PATHS), [])], cwd=clone_dir)
    run(["git-filter-repo", "--force", "--invert-paths", *sum((["--path", p] for p in DROP_PATHS), [])], cwd=clone_dir)

    files = run(["git", "ls-files"], cwd=clone_dir).stdout.split()
    if not files:
        typer.secho("error: filtered repo is empty - check KEEP_PATHS", err=True, fg=typer.colors.RED)
        raise typer.Exit(1)
    typer.echo(f"==> {len(files)} tracked files; top-level: {', '.join(sorted({f.split('/', 1)[0] for f in files}))}")

    if not push:
        flag = "--force " if force else ""
        typer.echo(f"\n==> prepared (nothing pushed). To publish:\n"
                   f"      cd {clone_dir}\n"
                   f"      git remote add public {TARGET_URL}\n"
                   f"      git push {flag}public HEAD:main")
        return

    if force:
        typer.secho("==> THIS WILL FORCE-OVERWRITE the public repo history.", err=True, fg=typer.colors.RED)
    if not typer.confirm(f"Push to PUBLIC repo {TARGET_URL} (branch main)?", default=False):
        typer.echo("aborted; nothing pushed")
        return

    run(["git", "remote", "add", "public", TARGET_URL], cwd=clone_dir)
    run(["git", "push", *(["--force"] if force else []), "public", "HEAD:main"], cwd=clone_dir)
    typer.echo("==> published.")


if __name__ == "__main__":
    app()
