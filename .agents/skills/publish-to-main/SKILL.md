---
name: publish-to-main
description: Promote specific content from the `staging` branch to `main` for production deploy. Uses file-level checkout for selective publishing. Validates with astro check + build before pushing. Triggers Cloudflare Pages deployment. Use when user wants to publish, ship, promote, or release content.
---

# Publish to Main

## Workflow

### 1. Switch to main and sync

```
git checkout main
git pull origin main
```

### 2. Show publish candidates

List all content files on staging that differ from main:

```
git diff main staging --name-only -- src/content/
```

Present the list to the user and ask which item(s) to publish.

### 3. File-level checkout

For each selected item:

```
git checkout staging -- src/content/<type>/<slug>
```

This stages exactly the chosen file(s) — no commit history from staging.

### 4. Validate

```
npx astro check && npm run build
```

If build fails, fix before pushing.

### 5. Commit

```
git commit -m "publish: <slug>"
```

### 6. Push to main (triggers deploy)

```
git push origin main
```

**Confirm with the user before pushing.** This triggers a Cloudflare Pages production deployment.

### 7. Sync staging

Merge main back into staging to prevent drift:

```
git checkout staging
git merge main
git push origin staging
```

### 8. Report

The push to `main` triggers a Cloudflare Pages build. The live site at https://yinchuangsum.xyz will update within ~1-2 minutes.

## Safety

- Only content files go through this flow — never commit code/config changes via this mechanism
- `git checkout staging -- <path>` is safe: only the specified paths are affected
- If the build fails (`npm run build`), do not push — fix the issue first
- If unsure which items to publish, ask the user
